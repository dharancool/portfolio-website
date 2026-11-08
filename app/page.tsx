/* The whole site is this one page. Content lives in /content/site.ts. */

import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { SiteUIProvider } from "@/components/site-ui"

export default function Page() {
  return (
    <SiteUIProvider>
      <Nav />
      <main id="main" tabIndex={-1}>
        <div id="top" />
        <Hero />
      </main>
    </SiteUIProvider>
  )
}
