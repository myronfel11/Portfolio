# Renders resume/index.html to public/Myron-Feliciano-Resume.pdf using headless Chrome.
$root = Split-Path $PSScriptRoot -Parent
$src = "file:///" + ((Join-Path $PSScriptRoot 'index.html') -replace '\\', '/')
$out = Join-Path $root 'public\Myron-Feliciano-Resume.pdf'
$chrome = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

& $chrome --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 "--print-to-pdf=$out" $src 2>$null | Out-Null
"$out  $((Get-Item $out).Length) bytes"
