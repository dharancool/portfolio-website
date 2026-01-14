# Local Setup Guide

This guide will help you set up and run the portfolio website on your local machine for development and testing.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v18.17 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** (comes with Node.js)
- **Git** - [Download Git](https://git-scm.com/)

To check if you have Node.js installed, run:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Download the Project

If you have a ZIP file, extract it to your desired location.

If using Git:
```bash
git clone <your-repository-url>
cd portfolio-website
```

### 2. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

Or if you prefer pnpm:
```bash
pnpm install
```

This will install all the dependencies listed in `package.json`, including:
- Next.js 16
- React 19
- Tailwind CSS v4
- shadcn/ui components
- Lucide icons
- And more...

### 3. Run the Development Server

Start the local development server:

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

Or with pnpm:
```bash
pnpm dev
```

### 4. Open in Browser

Once the server starts, you'll see a message like:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

Open your browser and navigate to:
```
http://localhost:3000
```

You should now see your portfolio website running locally!

## Development Workflow

### Making Changes

1. **Edit Components**: All components are in the `components/` directory
2. **Update Content**: Modify the data in each component file
3. **Hot Reload**: Changes will automatically reflect in the browser (no need to refresh)

### Common Files to Edit

- `components/hero.tsx` - Update your name, title, and intro
- `components/about.tsx` - Update your bio
- `components/experience.tsx` - Add your work experience
- `components/projects.tsx` - Showcase your projects
- `components/skills.tsx` - List your skills
- `components/research.tsx` - Add your publications
- `public/resume.pdf` - Replace with your actual resume

### Styling Changes

- `app/globals.css` - Update colors, fonts, and global styles
- Individual components use Tailwind classes for styling

## Build for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `.next` folder with optimized files.

To test the production build locally:

```bash
npm run start
```

This runs the production server at `http://localhost:3000`

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- -p 3001
```

### Dependencies Issues

If you encounter dependency issues, try:

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Clear Next.js Cache

If you see unexpected behavior:

```bash
# Delete .next folder
rm -rf .next

# Restart dev server
npm run dev
```

## Project Commands

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint for code quality

## Environment Variables

This project doesn't require any environment variables for basic functionality. If you add integrations (database, email service, etc.), you can create a `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other variables as needed
```

## Next Steps

1. Customize the content with your information
2. Replace placeholder images with your photos
3. Update the resume PDF file
4. Test on different screen sizes (mobile, tablet, desktop)
5. Deploy to Netlify (see NETLIFY_DEPLOYMENT.md)

## Getting Help

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

Happy coding!
