# gangatharan.netlify.app

Personal site of Gangatharan Idayachandiran. A single page built with Next.js and exported as static HTML, hosted on Netlify.

## Editing content

All text, links, projects and jobs live in **[`content/site.ts`](content/site.ts)**. You shouldn't need to touch anything in `components/` to change what the site says.

| To change… | Edit in `content/site.ts` |
| --- | --- |
| Headline, intro, availability | `profile` |
| The "At a glance" list in the hero | `glance` |
| Projects and case studies | `projects` (order = display order) |
| Jobs | `experience` (newest first) |
| Degrees | `education` |
| Skills and certifications | `skills`, `certifications` |
| The paper | `publication` |
| About paragraphs | `about` |
| Social links | `links` |

**Add a project:** copy an object in `projects` and fill it in.
- `categories` controls which filter tabs show it.
- `caseStudy` makes it a full card with a write-up sheet. Leave it out and the project shows as a compact row under "Also built".
- Set a link to `null` to hide its button.
- Projects with a case study appear in the ⌘K menu automatically.

**Replace the resume:** overwrite `public/Gangatharan_Idayachandiran_Resume.pdf` and keep the same filename.

**Images:** put WebP files in `public/images/` and set `width`/`height` to the real pixel size. To convert an image: `cwebp -q 80 -resize 1600 0 in.png -o public/images/out.webp`.

## Design

- Tokens (colors, type scale, spacing, motion) are in `styles/tokens.css`. Light and dark values sit side by side.
- The other files in `styles/` each cover one area: `base`, `nav`, `hero`, `work`, `sections`, `overlay`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy

Netlify reads `netlify.toml`:
- Build with `npm run build`, publish `out/`, on Node 22.
- The old resume URL redirects to the new file.

The contact form uses EmailJS and needs three environment variables set in Netlify (Site settings → Environment variables):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

The EmailJS template receives `from_name`, `from_email` and `message`.
