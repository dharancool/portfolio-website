# Netlify Deployment Guide

This guide will walk you through deploying your portfolio website to Netlify for free. Netlify is perfect for Next.js static sites and offers automatic deployments from Git.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- Your portfolio code pushed to a repository
- A Netlify account (free) - [Sign up at Netlify](https://www.netlify.com/)

## Deployment Methods

You can deploy to Netlify in two ways:

1. **Method A**: Direct Git Integration (Recommended)
2. **Method B**: Manual Drag & Drop

---

## Method A: Git Integration (Recommended)

This method enables automatic deployments whenever you push changes to your repository.

### Step 1: Push Code to Git Repository

If you haven't already, push your code to GitHub, GitLab, or Bitbucket:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio commit"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/portfolio.git

# Push to main branch
git push -u origin main
```

### Step 2: Connect Netlify to Your Repository

1. Go to [Netlify](https://www.netlify.com/) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories
5. Select your portfolio repository from the list

### Step 3: Configure Build Settings

Netlify should auto-detect Next.js settings, but verify these:

**Build Settings:**
- **Base directory**: Leave empty
- **Build command**: `npm run build`
- **Publish directory**: `.next`

**Advanced Build Settings** (Optional):
- **Node version**: 18 or higher (usually auto-detected)

### Step 4: Deploy

1. Click **"Deploy site"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Once deployed, you'll get a random URL like `https://random-name-123456.netlify.app`

### Step 5: Customize Your Domain (Optional)

**Change Site Name:**
1. Go to **Site settings** → **Site details**
2. Click **"Change site name"**
3. Enter your desired name (e.g., `yourname-portfolio`)
4. Your site will now be at `https://yourname-portfolio.netlify.app`

**Add Custom Domain:**
1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow instructions to connect your own domain

---

## Method B: Manual Drag & Drop

If you prefer not to use Git integration, you can manually upload your build.

### Step 1: Build the Project Locally

```bash
# Install dependencies
npm install

# Create production build
npm run build
```

### Step 2: Export Static Files

Next.js requires a static export for drag & drop deployment.

1. Open `next.config.mjs`
2. Update it to:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

3. Run build again:

```bash
npm run build
```

This creates an `out` folder with static files.

### Step 3: Deploy to Netlify

1. Go to [Netlify](https://www.netlify.com/) and log in
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the entire `out` folder into the upload area
4. Wait for deployment to complete

**Note**: With manual deployment, you'll need to rebuild and re-upload for every change.

---

## Configuration Files

### netlify.toml (Optional but Recommended)

Create a `netlify.toml` file in your project root for better configuration:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

This ensures consistent builds and proper routing.

---

## Environment Variables (If Needed)

If your portfolio uses environment variables:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add each variable with its key and value
4. Click **"Save"**
5. Trigger a new deploy for changes to take effect

---

## Automatic Deployments

With Git integration, Netlify automatically:

- **Deploys** when you push to the main branch
- **Creates preview deployments** for pull requests
- **Rebuilds** the site with each commit

To manually trigger a deployment:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

---

## Custom Domain Setup

### Using Netlify DNS (Easiest)

1. Go to **Domain settings** → **Add custom domain**
2. Enter your domain (e.g., `yourdomain.com`)
3. Click **"Verify"**
4. Choose **"Use Netlify DNS"**
5. Update your domain registrar's nameservers to Netlify's nameservers
6. Wait for DNS propagation (can take up to 48 hours)

Netlify will automatically provision an SSL certificate.

### Using External DNS

1. In your domain registrar, create an **A record**:
   - **Host**: `@` (or leave blank)
   - **Points to**: `75.2.60.5` (Netlify's load balancer)
2. Create a **CNAME record**:
   - **Host**: `www`
   - **Points to**: `your-site-name.netlify.app`
3. In Netlify, add your custom domain
4. Wait for DNS propagation

---

## Post-Deployment Checklist

- [ ] Site loads correctly at Netlify URL
- [ ] All sections are visible (Hero, About, Experience, etc.)
- [ ] Navigation works smoothly
- [ ] Resume PDF downloads correctly
- [ ] Contact form submits properly (if connected to a service)
- [ ] Social media links work
- [ ] Responsive design works on mobile
- [ ] Check browser console for errors

---

## Troubleshooting

### Build Fails

**Error: "Command failed with exit code 1"**
- Check the build logs in Netlify dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are in `package.json`

**Node version issues:**
- Add `NODE_VERSION = "18"` to environment variables
- Or specify in `netlify.toml`

### Site Shows 404 Errors

- Ensure publish directory is set to `.next`
- Check that build command is `npm run build`
- For static export, publish directory should be `out`

### Images Not Loading

- Check image paths (should be relative to `public` folder)
- For static export, set `images.unoptimized: true` in config

### Resume PDF Not Downloading

- Ensure `resume.pdf` is in the `public` folder
- Verify the path in hero.tsx is `/resume.pdf`
- Try clearing Netlify cache and redeploying

---

## Updating Your Site

### With Git Integration:

```bash
# Make your changes
git add .
git commit -m "Update portfolio content"
git push
```

Netlify automatically rebuilds and deploys!

### With Manual Deployment:

1. Make changes locally
2. Run `npm run build`
3. Drag and drop the new `out` folder to Netlify

---

## Performance Optimization

Netlify automatically provides:
- **CDN**: Global content delivery
- **HTTPS**: Free SSL certificates
- **Compression**: Automatic Gzip and Brotli
- **Caching**: Smart caching strategies

---

## Free Tier Limits

Netlify's free tier includes:
- **Bandwidth**: 100 GB/month
- **Build minutes**: 300 minutes/month
- **Sites**: Unlimited
- **Team members**: 1

This is more than enough for a personal portfolio!

---

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Netlify Support](https://www.netlify.com/support/)

---

## Need Help?

If you encounter issues:
1. Check the Netlify deploy logs
2. Verify the build works locally with `npm run build`
3. Search [Netlify Community Forums](https://answers.netlify.com/)
4. Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

Congratulations! Your portfolio is now live on the internet! 🎉
