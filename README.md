# Portfolio Website

A modern, responsive portfolio website built with Next.js 16, React 19, and Tailwind CSS v4. This project showcases a professional portfolio with sections for about, experience, projects, skills, research publications, and contact information.

## Technologies Used

### Core Framework
- **Next.js 16** - React framework with App Router for server-side rendering and static site generation
- **React 19.2** - Latest version with new features like useEffectEvent and Activity components
- **TypeScript** - Type-safe JavaScript for better developer experience

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework with new inline theme configuration
- **shadcn/ui** - High-quality, accessible UI components built on Radix UI
- **Lucide React** - Beautiful icon library

### Features
- **Responsive Design** - Mobile-first approach with seamless tablet and desktop experiences
- **Dark Theme** - Professional dark color scheme with teal/cyan accents
- **Smooth Scrolling** - Navigation with smooth scroll behavior
- **SEO Optimized** - Proper meta tags and semantic HTML structure
- **Accessible** - WCAG compliant with proper ARIA labels and keyboard navigation

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and Tailwind configuration
├── components/
│   ├── navigation.tsx      # Fixed navigation bar with smooth scroll
│   ├── hero.tsx            # Hero section with CTA buttons
│   ├── about.tsx           # About section with bio
│   ├── experience.tsx      # Work experience timeline
│   ├── projects.tsx        # Featured projects showcase
│   ├── skills.tsx          # Skills organized by category
│   ├── research.tsx        # Research & Publications section
│   ├── contact.tsx         # Contact form with social links
│   └── ui/                 # shadcn/ui components
├── public/
│   └── resume.pdf          # Resume file for download
├── LOCAL_SETUP.md          # Local development setup guide
└── NETLIFY_DEPLOYMENT.md   # Netlify deployment guide
```

## Key Sections

1. **Hero** - Eye-catching introduction with name, title, and call-to-action buttons including Download Resume
2. **About** - Professional biography and personal introduction
3. **Experience** - Timeline of work experience with company details
4. **Projects** - Showcase of featured projects with images and descriptions
5. **Skills** - Organized display of technical skills by category
6. **Research** - Academic publications with abstracts, keywords, and metrics
7. **Contact** - Contact form and social media links


## License

This project is open source and available for personal use.
