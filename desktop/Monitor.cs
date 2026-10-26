using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;

class MonitorApp {
  [StructLayout(LayoutKind.Sequential)]struct Rect{public int Left,Top,Right,Bottom;}
  [DllImport("user32.dll")]static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")]static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")]static extern bool GetWindowRect(IntPtr h,out Rect r);
  [DllImport("user32.dll")]static extern uint GetWindowThreadProcessId(IntPtr h,out uint p);
  [DllImport("user32.dll",EntryPoint="GetWindowLongPtrW")]static extern IntPtr GetWindowLongPtr(IntPtr h,int i);
  [DllImport("shell32.dll")]static extern int SHQueryUserNotificationState(out int state);
  [DllImport("pdh.dll",CharSet=CharSet.Unicode)]static extern uint PdhOpenQuery(string s,IntPtr u,out IntPtr q);
  [DllImport("pdh.dll",CharSet=CharSet.Unicode)]static extern uint PdhAddEnglishCounter(IntPtr q,string path,IntPtr u,out IntPtr c);
  [DllImport("pdh.dll")]static extern uint PdhCollectQueryData(IntPtr q);
  [DllImport("pdh.dll",CharSet=CharSet.Unicode)]static extern uint PdhGetFormattedCounterArray(IntPtr c,uint fmt,ref uint size,out uint count,IntPtr data);
  [StructLayout(LayoutKind.Explicit,Size=16)]struct Value{[FieldOffset(0)]public uint status;[FieldOffset(8)]public double value;}
  [StructLayout(LayoutKind.Sequential)]struct Item{public IntPtr name;public Value value;}
  static HashSet<int> own=new HashSet<int>();static object gate=new object();
  static HashSet<string> games=new HashSet<string>(StringComparer.OrdinalIgnoreCase){"cs2","dota2","valorant-win64-shipping","fortniteclient-win64-shipping","gta5","gta5_enhanced","rdr2","rustclient","overwatch","eldenring","bg3","bg3_dx11","cyberpunk2077","minecraft.windows","javaw","robloxplayerbeta","terraria","warframe.x64","tarkov","escapefromtarkov","witcher3","helldivers2","pathofexile","diablo iv","bf6","bf2042","cod","destiny2","aces","worldoftanks","hoi4","eu4","starcraft ii","starcraft","r5apex","rocketleague","deadbydaylight-win64-shipping"};
  static bool Game(){foreach(var p in Process.GetProcesses()){try{if(games.Contains(p.ProcessName))return true;}catch{}finally{p.Dispose();}}return false;}
  static bool Fullscreen(){int n;SHQueryUserNotificationState(out n);if(n==2||n==3||n==4)return true;var h=GetForegroundWindow();if(h==IntPtr.Zero)return false;uint pid;GetWindowThreadProcessId(h,out pid);try{using(var p=Process.GetProcessById((int)pid)){var file=p.MainModule.FileName;if(file.IndexOf("\\steamapps\\common\\",StringComparison.OrdinalIgnoreCase)>=0||file.IndexOf("\\Epic Games\\",StringComparison.OrdinalIgnoreCase)>=0)return true;}}catch{}Rect r;if(!GetWindowRect(h,out r))return false;long style=GetWindowLongPtr(h,-16).ToInt64();if((style&0x00C00000)!=0)return false;var b=Screen.FromHandle(h).Bounds;return Math.Abs(r.Left-b.Left)<=2&&Math.Abs(r.Top-b.Top)<=2&&Math.Abs(r.Right-b.Right)<=2&&Math.Abs(r.Bottom-b.Bottom)<=2;}
  static double? Gpu(IntPtr q,IntPtr c){if(q==IntPtr.Zero||c==IntPtr.Zero)return null;uint size=0,count;PdhGetFormattedCounterArray(c,0x200,ref size,out count,IntPtr.Zero);if(size==0||size>16*1024*1024)return null;var mem=Marshal.AllocHGlobal((int)size);try{if(PdhGetFormattedCounterArray(c,0x200,ref size,out count,mem)!=0)return null;var engines=new Dictionary<string,double>();int stride=Marshal.SizeOf(typeof(Item));for(int i=0;i<count;i++){var v=(Item)Marshal.PtrToStructure(IntPtr.Add(mem,i*stride),typeof(Item));if(v.value.status>1)continue;var name=Marshal.PtrToStringUni(v.name);if(name==null||!name.StartsWith("pid_"))continue;var end=name.IndexOf('_',4);int pid;if(end<0||!int.TryParse(name.Substring(4,end-4),out pid))continue;lock(gate){if(own.Contains(pid))continue;}var luid=name.IndexOf("luid_");if(luid<0)continue;var key=name.Substring(luid);double current;engines.TryGetValue(key,out current);engines[key]=current+Math.Max(0,v.value.value);}double max=0;foreach(var n in engines.Values)max=Math.Max(max,n);return Math.Min(1,max/100.0);}finally{Marshal.FreeHGlobal(mem);}}
  static double? Disk(IntPtr counter,bool idle){if(counter==IntPtr.Zero)return null;uint size=0,count;PdhGetFormattedCounterArray(counter,0x200,ref size,out count,IntPtr.Zero);if(size==0||size>1024*1024)return null;var mem=Marshal.AllocHGlobal((int)size);try{if(PdhGetFormattedCounterArray(counter,0x200,ref size,out count,mem)!=0)return null;double max=0;bool valid=false;int stride=Marshal.SizeOf(typeof(Item));for(int i=0;i<count;i++){var item=(Item)Marshal.PtrToStructure(IntPtr.Add(mem,i*stride),typeof(Item));if(item.value.status>1||Marshal.PtrToStringUni(item.name)=="_Total")continue;valid=true;max=Math.Max(max,idle?Math.Max(0,1-item.value.value/100):Math.Max(0,item.value.value*1000));}return valid?(double?)(idle?Math.Min(1,max):max):null;}finally{Marshal.FreeHGlobal(mem);}}
  static string Json(double? value){return value.HasValue?value.Value.ToString("0.000",CultureInfo.InvariantCulture):"null";}
  static void Main(){SetProcessDPIAware();Console.OutputEncoding=new System.Text.UTF8Encoding(false);var input=new Thread(()=>{string line;while((line=Console.ReadLine())!=null){var ids=new HashSet<int>();foreach(var s in line.Split(',')){int p;if(int.TryParse(s,out p))ids.Add(p);}lock(gate){own=ids;}}Environment.Exit(0);});input.IsBackground=true;input.Start();IntPtr q=IntPtr.Zero,c=IntPtr.Zero,disk=IntPtr.Zero,latency=IntPtr.Zero;try{if(PdhOpenQuery(null,IntPtr.Zero,out q)==0){PdhAddEnglishCounter(q,"\\GPU Engine(*)\\Utilization Percentage",IntPtr.Zero,out c);PdhAddEnglishCounter(q,"\\PhysicalDisk(*)\\% Idle Time",IntPtr.Zero,out disk);PdhAddEnglishCounter(q,"\\PhysicalDisk(*)\\Avg. Disk sec/Transfer",IntPtr.Zero,out latency);}PdhCollectQueryData(q);}catch{}for(;;){try{PdhCollectQueryData(q);Console.WriteLine("{\"game\":"+(Game()?"true":"false")+",\"fullscreen\":"+(Fullscreen()?"true":"false")+",\"externalGpu\":"+Json(Gpu(q,c))+",\"diskBusy\":"+Json(Disk(disk,true))+",\"diskLatencyMs\":"+Json(Disk(latency,false))+"}");}catch{Console.WriteLine("{\"error\":true}");}Thread.Sleep(1000);}}
}
