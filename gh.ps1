param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

$ghPath = 'C:\Program Files\GitHub CLI\gh.exe'

if (!(Test-Path $ghPath)) {
  Write-Error "GitHub CLI not found at '$ghPath'. Install it with: winget install --id GitHub.cli -e --source winget"
  exit 1
}

if ($Args.Count -eq 0) {
  Write-Output "Usage examples:"
  Write-Output "  .\\gh.ps1 auth login"
  Write-Output "  .\\gh.ps1 workflow run deploy-cpanel.yml"
  Write-Output "  .\\gh.ps1 run list --workflow deploy-cpanel.yml --limit 1"
  exit 0
}

& $ghPath @Args
exit $LASTEXITCODE
