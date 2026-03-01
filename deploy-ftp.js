#!/usr/bin/env node
/**
 * Local FTP Deployment Script for cPanel
 * Deploys dist/ folder to cPanel via FTP
 */

const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

// Load from environment or prompt
const config = {
  user: process.env.CPANEL_FTP_USERNAME || "YOUR_FTP_USERNAME",
  password: process.env.CPANEL_FTP_PASSWORD || "YOUR_FTP_PASSWORD",
  host: process.env.CPANEL_FTP_SERVER || "YOUR_FTP_SERVER",
  port: 21,
  localRoot: "./dist",
  remoteRoot: "/dadchefai/",
  include: ["*", "**/*"],
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**"
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false
};

// Check for missing credentials
if (config.user.includes("YOUR_FTP") || config.password.includes("YOUR_FTP") || config.host.includes("YOUR_FTP")) {
  console.error("\n❌ FTP credentials not configured!");
  console.error("\nOption 1: Set environment variables:");
  console.error("  $env:CPANEL_FTP_SERVER='ftp.yourdomain.com'");
  console.error("  $env:CPANEL_FTP_USERNAME='your-username'");
  console.error("  $env:CPANEL_FTP_PASSWORD='your-password'");
  console.error("  node deploy-ftp.js");
  console.error("\nOption 2: Edit deploy-ftp.js and replace YOUR_FTP_* values");
  process.exit(1);
}

console.log("🚀 Starting FTP deployment to cPanel...\n");
console.log(`📡 Server: ${config.host}`);
console.log(`👤 User: ${config.user}`);
console.log(`📁 Local: ${config.localRoot}`);
console.log(`📁 Remote: ${config.remoteRoot}\n`);

ftpDeploy.on("uploading", (data) => {
  console.log(`⬆️  ${data.transferredFileCount}/${data.totalFilesCount} - ${data.filename}`);
});

ftpDeploy.on("uploaded", (data) => {
  console.log(`✅ Uploaded: ${data.filename}`);
});

ftpDeploy.on("log", (data) => {
  console.log(`📋 ${data}`);
});

ftpDeploy
  .deploy(config)
  .then(() => {
    console.log("\n✨ Deployment complete!");
    console.log("🌐 Check your site at: https://yourdomain.com/dadchefai/");
  })
  .catch((err) => {
    console.error("\n❌ Deployment failed:", err.message);
    
    if (err.message.includes("421")) {
      console.error("\n💡 FTP Error 421 troubleshooting:");
      console.error("  - Your IP may be blocked/rate-limited");
      console.error("  - Try again in a few minutes");
      console.error("  - Contact hosting provider to whitelist your IP");
      console.error("  - Use FileZilla GUI as alternative (see below)");
    }
    
    console.error("\n📝 Manual FileZilla Instructions:");
    console.error("  1. Open FileZilla");
    console.error(`  2. Connect: ${config.host} | ${config.user} | [password] | Port 21`);
    console.error(`  3. Navigate to: ${config.remoteRoot}`);
    console.error(`  4. Upload contents of: ${config.localRoot}/*`);
    
    process.exit(1);
  });
