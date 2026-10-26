param([Parameter(Mandatory=$true)][string]$Config,[switch]$CheckOnly)
$ErrorActionPreference='Stop'
$taskConfigPath=[IO.Path]::GetFullPath($Config)
$taskData=Get-Content -LiteralPath $taskConfigPath -Raw -Encoding UTF8 | ConvertFrom-Json
$taskInstallRoot=[IO.Path]::GetFullPath([string]$taskData.root).TrimEnd('\')
if (!(Test-Path -LiteralPath $taskInstallRoot -PathType Container) -or $taskInstallRoot -eq [IO.Path]::GetPathRoot($taskInstallRoot).TrimEnd('\')) { throw 'Invalid installation root' }
if ((Get-Item -LiteralPath $taskInstallRoot).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Refusing a linked installation' }
$taskFiles=@()
foreach ($taskEntry in $taskData.files) {
  $taskRelative=[string]$taskEntry.path
  if (!$taskRelative -or $taskRelative.Contains('\') -or $taskRelative.Contains(':') -or $taskRelative.StartsWith('/') -or @($taskRelative.Split('/') | Where-Object { $_ -eq '..' -or $_ -eq '.' -or $_ -eq '' }).Count) { throw 'Invalid managed path' }
  $taskAbsolute=[IO.Path]::GetFullPath([IO.Path]::Combine($taskInstallRoot,$taskRelative.Replace('/','\')))
  if (!$taskAbsolute.StartsWith($taskInstallRoot+'\',[StringComparison]::OrdinalIgnoreCase)) { throw 'Path outside installation' }
  $taskWalk=$taskAbsolute
  while ($taskWalk -and $taskWalk -ne $taskInstallRoot) {
    if ((Test-Path -LiteralPath $taskWalk) -and ((Get-Item -LiteralPath $taskWalk -Force).Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'Refusing a linked managed file' }
    $taskWalk=[IO.Path]::GetDirectoryName($taskWalk)
  }
  $taskFiles+=@{path=$taskAbsolute;sha256=[string]$taskEntry.sha256}
}
if ($CheckOnly) { Write-Output ('Validated '+$taskFiles.Count+' managed files'); exit 0 }
$taskParent=Get-Process -Id ([int]$taskData.pid) -ErrorAction SilentlyContinue
if ($taskParent) { if (!$taskParent.WaitForExit(30000)) { throw 'Application is still running' } }
foreach ($taskFile in $taskFiles) {
  if (Test-Path -LiteralPath $taskFile.path -PathType Leaf) {
    if ((Get-FileHash -LiteralPath $taskFile.path -Algorithm SHA256).Hash.ToLowerInvariant() -eq $taskFile.sha256) { Remove-Item -LiteralPath $taskFile.path -Force }
  }
}
# Remove only empty installation directories; leave user-created or changed files intact.
$taskDirectories=@($taskFiles | ForEach-Object { [IO.Path]::GetDirectoryName($_.path) } | Sort-Object -Unique | Sort-Object Length -Descending)
foreach ($taskDir in $taskDirectories) {
  while ($taskDir -and $taskDir.StartsWith($taskInstallRoot+'\',[StringComparison]::OrdinalIgnoreCase)) {
    if (!(Test-Path -LiteralPath $taskDir -PathType Container) -or @(Get-ChildItem -LiteralPath $taskDir -Force).Count) { break }
    Remove-Item -LiteralPath $taskDir -Force
    $taskDir=[IO.Path]::GetDirectoryName($taskDir)
  }
}
$taskManifest=Join-Path $taskInstallRoot 'uninstall-manifest.json'
if (Test-Path -LiteralPath $taskManifest -PathType Leaf) { Remove-Item -LiteralPath $taskManifest -Force }
if (!(Get-ChildItem -LiteralPath $taskInstallRoot -Force | Select-Object -First 1)) { Remove-Item -LiteralPath $taskInstallRoot -Force }
Remove-Item -LiteralPath $taskConfigPath -Force
Remove-Item -LiteralPath (Join-Path ([IO.Path]::GetDirectoryName($taskConfigPath)) 'remove.ps1') -Force
Remove-Item -LiteralPath ([IO.Path]::GetDirectoryName($taskConfigPath)) -ErrorAction SilentlyContinue
