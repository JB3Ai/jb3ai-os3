param(
  [string]$Workflow = 'deploy-cpanel.yml',
  [string]$Ref = 'main'
)

$ErrorActionPreference = 'Stop'

$ghPath = 'C:\Program Files\GitHub CLI\gh.exe'
if (!(Test-Path $ghPath)) {
  Write-Error "GitHub CLI not found at '$ghPath'. Install with: winget install --id GitHub.cli -e --source winget"
  exit 1
}

function Invoke-Gh {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)
  & $ghPath @Args
  return $LASTEXITCODE
}

Invoke-Gh auth status | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Output "Not authenticated with GitHub CLI."
  Write-Output "Run: .\gh.ps1 auth login"
  exit 1
}

Write-Output "Dispatching workflow '$Workflow' on ref '$Ref'..."
Invoke-Gh workflow run $Workflow --ref $Ref
if ($LASTEXITCODE -ne 0) {
  Write-Error "Failed to dispatch workflow '$Workflow'."
  exit 1
}

Start-Sleep -Seconds 2
Write-Output "Latest run status:"
Invoke-Gh run list --workflow $Workflow --limit 1
exit $LASTEXITCODE
