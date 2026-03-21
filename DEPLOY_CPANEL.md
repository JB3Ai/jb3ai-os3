# Deploy `jb3ai-os3` to cPanel via Git

This project deploys to cPanel from Git, not by FTP as the primary release path.

## Canonical Release Flow

1. Commit changes locally.
2. Push `main` to GitHub:
   ```powershell
   git push origin main
   ```
3. In cPanel, use **Git Version Control** for the linked repository.
4. Pull or update the production checkout from GitHub `main`.
5. Run the server-side deployment step configured for that cPanel repo, if applicable.

## Source of Truth

- Primary remote: `origin`
- GitHub repo: `https://github.com/JB3Ai/jb3ai-os3.git`
- Release branch: `main`

## Important Notes

- Treat GitHub `main` as the release source for cPanel.
- Do not treat FTP upload as the default deployment method for this repo.
- The local FTP files in this repository are legacy fallback tooling only.
- The `.github/workflows/deploy-cpanel.yml` file may still exist, but it is not the source of truth for the live cPanel deployment workflow.

## If cPanel Does Not Auto-Update

Use cPanel to:

1. Open **Git Version Control**.
2. Select the `jb3ai-os3` repository.
3. Pull the latest `main`.
4. Run the repo’s configured deploy/update action inside cPanel if one is required.

## Legacy Fallback

If Git-based deployment is unavailable, see `DEPLOY_LOCAL_FTP.md` for the old manual FTP path. That path is retained for emergencies only.
