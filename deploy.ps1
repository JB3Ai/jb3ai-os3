#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Legacy FTP fallback for jb3ai-os3
.DESCRIPTION
    Builds the project and uploads to cPanel using FTP.
    This is not the primary production deployment path.
#>

param()

# Colors
$ESC = [char]27
$Green = "$ESC[32m"
$Red = "$ESC[31m"
$Yellow = "$ESC[33m"
$Reset = "$ESC[0m"

Write-Host "${Green}jb3ai-os3 Legacy FTP Deployment${Reset}`n"
Write-Host "${Yellow}Primary deployment is cPanel git pull from GitHub main.${Reset}`n"

# Step 1: Check FTP credentials
Write-Host "${Yellow}Checking legacy FTP credentials...${Reset}"

if (-not $env:CPANEL_FTP_SERVER -or -not $env:CPANEL_FTP_USERNAME -or -not $env:CPANEL_FTP_PASSWORD) {
    Write-Host "${Red}Legacy FTP credentials not configured.${Reset}`n"
    Write-Host "Set environment variables in PowerShell:"
    Write-Host '  $env:CPANEL_FTP_SERVER="ftp.yourdomain.com"'
    Write-Host '  $env:CPANEL_FTP_USERNAME="your-username"'
    Write-Host '  $env:CPANEL_FTP_PASSWORD="your-password"'
    Write-Host ""
    Write-Host "Or edit deploy-ftp.js and replace YOUR_FTP_* values"
    exit 1
}

Write-Host "${Green}✓ Credentials configured${Reset}`n"

# Step 2: Build
Write-Host "${Yellow}Building project...${Reset}"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}❌ Build failed!${Reset}"
    exit 1
}
Write-Host "${Green}✓ Build complete${Reset}`n"

# Step 3: Deploy via FTP
Write-Host "${Yellow}Deploying to cPanel via legacy FTP fallback...${Reset}"
node deploy-ftp.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}❌ Deployment failed!${Reset}"
    Write-Host ""
    Write-Host "${Yellow}Alternative: Use FileZilla GUI${Reset}"
    Write-Host "  1. Open FileZilla"
    Write-Host "  2. Connect: $env:CPANEL_FTP_SERVER | $env:CPANEL_FTP_USERNAME | [password] | Port 21"
    Write-Host "  3. Navigate to: /dadchefai/"
    Write-Host "  4. Upload all files from: ./dist/*"
    exit 1
}

Write-Host ""
Write-Host "${Green}Legacy FTP deployment completed.${Reset}"
Write-Host "${Green}Verify the target cPanel path before treating this as production live.${Reset}"
