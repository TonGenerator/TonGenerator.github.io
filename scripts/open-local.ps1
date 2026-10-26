$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskUrl = 'http://127.0.0.1:4173/'
$taskReady = $false
try {
    $taskResponse = Invoke-WebRequest -Uri $taskUrl -UseBasicParsing -TimeoutSec 2
    $taskReady = $taskResponse.StatusCode -eq 200 -and $taskResponse.Content.Contains('Vanity Local')
    if (-not $taskReady) { throw 'Port 4173 is already in use by another application.' }
} catch [System.Net.WebException] {
    $taskReady = $false
}
if (-not $taskReady) {
    $taskNode = (Get-Command node.exe).Source
    if (-not (Test-Path -LiteralPath (Join-Path $taskRoot 'dist/index.html'))) {
        throw 'Build is missing. Run npm run build in the project folder.'
    }
    Start-Process -FilePath $taskNode -ArgumentList @('server.mjs') -WorkingDirectory $taskRoot -WindowStyle Hidden
    for ($taskAttempt = 0; $taskAttempt -lt 20; $taskAttempt++) {
        Start-Sleep -Milliseconds 200
        try {
            $taskResponse = Invoke-WebRequest -Uri $taskUrl -UseBasicParsing -TimeoutSec 1
            if ($taskResponse.StatusCode -eq 200 -and $taskResponse.Content.Contains('Vanity Local')) { $taskReady = $true; break }
        } catch {}
    }
}
if (-not $taskReady) { throw 'Local server did not start. Run npm start to inspect the error.' }
Start-Process $taskUrl
