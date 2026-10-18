# GitHub Pages Deployment — BCAS110/bean-and-brew

Target: https://bcas110.github.io/bean-and-brew/

The existing website design and architecture are retained. The release workflow is .github/workflows/pages.yml. It builds from main and uploads **only dist/**. dist remains ignored in Git because Actions generates the artifact from reviewed source. Do not copy dist to a publishing branch when using this workflow.

## Current readiness

Local build and verification are documented in deployment-readiness.md. No non-interactive GitHub credential was available, gh was not installed/on PATH, and no remote changes were made. The local repository is on main, has no commits, and has no origin. Unauthenticated GitHub repository lookup and the target HTTPS URL returned 404; the repository may be absent or private/inaccessible. A 404 is not proof that it does not exist.

## 1. Authenticate locally

Run these commands yourself in PowerShell. Never paste credentials into chat or files.

```powershell
winget install --id GitHub.cli --exact --source winget
```

Open a new PowerShell terminal so gh is on PATH, then:

```powershell
gh auth login --hostname github.com --git-protocol https --web --scopes repo,workflow
gh auth setup-git
gh auth status --hostname github.com
gh api user --jq .login
```

Use the BCAS110 account, or an account authorized to manage this repository and Pages. The workflow scope allows pushing the workflow file; it is not a permission granted to Actions jobs. Review the browser authorization screen. Never use `gh auth token` in shared output.

Official instructions: https://cli.github.com/manual/gh_auth_login

## 2. Resolve the repository

```powershell
Set-Location 'C:\Users\ALi\Documents\Codex\2026-10-18\new-chat\bean-and-brew'
gh repo view BCAS110/bean-and-brew --json nameWithOwner,defaultBranchRef,viewerPermission,isPrivate
```

If it exists, confirm the owner/name and that you have the necessary write and Pages administration permissions. If it is confirmed absent and you want the source to be public, create the empty repository:

```powershell
gh repo create BCAS110/bean-and-brew --public --description 'Bean & Brew coffee house portfolio demonstration'
```

`--public` exposes the committed source and documentation. Choose this only if that visibility is approved; private GitHub Pages availability depends on the account plan. Do not create an alternate repository on an ambiguous authorization error. No repository has been created by this task.

Official repository creation instructions: https://cli.github.com/manual/gh_repo_create

## 3. Review, commit and push the existing project

Use Node.js 24, then:

```powershell
npm ci
npm run check
node scripts/verify-production.mjs
npm audit --audit-level=low
git status --short
git remote -v
```

The current checkout has no remote. Add only this exact repository:

```powershell
git remote add origin https://github.com/BCAS110/bean-and-brew.git
git ls-remote origin
```

If ls-remote shows existing branch commits, inspect and reconcile that history before pushing. Do not overwrite an existing main or use force push. If origin already exists, verify it rather than adding or changing it blindly.

For the verified empty repository and this uncommitted local project:

```powershell
git add .gitattributes .gitignore .npmrc .github README.md package.json package-lock.json scripts src tests docs
git diff --cached --check
git diff --cached --stat
git commit -m "Prepare verified Bean and Brew GitHub Pages release"
git push -u origin main
```

Review the staged files before committing. node_modules, dist, .git, credentials and sibling work/ are excluded. This task did not stage, commit, push or modify any remote.

## 4. Select Actions as the Pages publishing source

In https://github.com/BCAS110/bean-and-brew/settings/pages select **Build and deployment → Source → GitHub Actions**. Review the github-pages environment and restrict deployment to main if adding environment protection rules. Enable Enforce HTTPS if the setting is offered. Keep the default bcas110.github.io domain; no custom-domain setup is required.

The first push can start a workflow before Pages is enabled. If that run fails during configuration, enable the publishing source and rerun it. After the setting is saved:

```powershell
gh workflow run pages.yml --repo BCAS110/bean-and-brew --ref main
gh run list --repo BCAS110/bean-and-brew --workflow pages.yml --limit 5
gh run watch --repo BCAS110/bean-and-brew --exit-status
```

Select the newly dispatched run when prompted. Confirm BOTH build and deploy jobs succeed and inspect the github-pages environment URL. A successful artifact upload alone is not a successful deployment.

Official Pages workflow requirements: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 5. Verify the actual live release

```powershell
$response = Invoke-WebRequest -Uri 'https://bcas110.github.io/bean-and-brew/'
$response.StatusCode
gh api repos/BCAS110/bean-and-brew/pages --jq '{url: .html_url, status: .status, https: .https_enforced, build: .build_type}'
$env:SITE_URL = 'https://bcas110.github.io/bean-and-brew/'
npm run test:browser
Remove-Item Env:SITE_URL
```

The optional browser checks need the QA dependencies and Chrome described in README.md; they are not required npm production dependencies. Tests fail on bad responses and report navigation, images, JavaScript errors, GSAP initialization, mobile overflow, search and gallery behavior. Metadata is also checked against the declared target. The test output identifies its actual URL; local tests must not be reported as live tests.

Manually confirm all five navigation links, the menu toggle at mobile width, drink search/reset/details, gallery previous/next/Escape, scroll-controlled cup motion on desktop, reduced-motion behavior and studio attribution. Inspect the Network panel for failed assets or CSP errors. Confirm canonical and og:url are exactly the target and og:image returns an image over HTTPS. Rerun Lighthouse on the real host. Previously measured local LCP was 3.1 seconds and remains a known warning; field INP is unmeasured.

Do not claim publication complete until the real target responds successfully and these live checks pass.

## Workflow security

All five GitHub-owned actions are pinned to full 40-character commits, verified against their official repositories on 2026-10-18. Global permissions are empty. The build job has only contents:read and checkout does not persist credentials. Node 24 runs npm ci and the existing npm run check, followed by dependency audit and production artifact verification. The separate deploy job has only pages:write and id-token:write, depends on the successful build, and targets the github-pages environment. It does not check out source or execute npm scripts. There are no custom deployment secrets, pull-request triggers or write access to repository contents. Workflow dispatch is also restricted to main in the named repository. Pin updates require review.

## Hosting limitations and rollback

The meta CSP restricts scripts, styles, images and fonts to the same origin and disables network connections, objects, base changes and form submission. GitHub Pages does not provide arbitrary project response-header configuration; do not claim header-only frame-ancestors enforcement or custom caching controls. Demo contact information stays explicit and no real orders, hours, prices, address, reviews or sourcing certifications are asserted.

For rollback, revert the release commit on main and let the same workflow rebuild/deploy the previous reviewed source. Verify the resulting live URL again. Do not mix production files from different builds.
