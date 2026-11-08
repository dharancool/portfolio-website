/* The whole site is this one page. Content lives in /content/site.ts. */

import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Experience } from "@/components/experience"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { Research } from "@/components/research"
import { SiteUIProvider } from "@/components/site-ui"
import { Skills } from "@/components/skills"
import { Work } from "@/components/work"

export default function Page() {
  return (
    <SiteUIProvider>
      <Nav />
      <main id="main" tabIndex={-1}>
        <div id="top" />
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Research />
        <About />
        <Contact />
      </main>
      <Footer />
    </SiteUIProvider>
  )
}
