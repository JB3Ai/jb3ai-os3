# Local FTP Deployment for jb3ai-os3

Deploy directly to cPanel using FTP from your local machine.

## Quick Start

### 1. Set FTP Credentials

**Option A: Environment Variables (Recommended)**
```powershell
$env:CPANEL_FTP_SERVER="ftp.yourdomain.com"
$env:CPANEL_FTP_USERNAME="your-ftp-username"
$env:CPANEL_FTP_PASSWORD="your-password"
```

**Option B: Edit deploy-ftp.js**
Replace `YOUR_FTP_*` values in `deploy-ftp.js`:
```javascript
const config = {
  user: "your-ftp-username",
  password: "your-password",
  host: "ftp.yourdomain.com",
  // ...
}
```

### 2. Deploy

**One-Step Deployment:**
```powershell
npm run deploy
```
This builds and deploys in one command!

**Or Step-by-Step:**
```powershell
npm run build      # Build first
npm run deploy:ftp  # Then upload
```

**Or PowerShell Script:**
```powershell
.\deploy.ps1
```

## Troubleshooting

### FTP Error 421
- Your IP may be rate-limited
- Wait 5-10 minutes and try again
- Contact hosting provider to whitelist your IP

### Manual Upload with FileZilla

If automated FTP fails:

1. **Download FileZilla:** https://filezilla-project.org/download.php?type=client
2. **Build locally:**
   ```powershell
   npm run build
   ```
3. **Open FileZilla**
4. **Connect:**
   - Host: `ftp.yourdomain.com`
   - Username: `your-ftp-username`
   - Password: `your-password`
   - Port: `21`
5. **Navigate** on server to: `/dadchefai/`
6. **Upload** all files from local `./dist/*` folder

## Files

- `deploy-ftp.js` - Node.js FTP deployment script
- `deploy.ps1` - PowerShell wrapper (build + deploy)
- `package.json` - Added `deploy` and `deploy:ftp` commands

## Remote Path

Files will deploy to: `/dadchefai/` on your cPanel server

View at: `https://yourdomain.com/dadchefai/`
