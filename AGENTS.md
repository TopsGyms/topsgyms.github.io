# TopsGyms project instructions

These instructions apply to all future work in this repository.

## Before every task

1. Verify repository and branch.
2. Read relevant existing files.
3. Preserve CNAME and deployment structure.
4. Check whether the task affects SEO, translations, forms or sitemap.
5. Make only necessary changes.
6. Validate before reporting completion.

## Project

- Brand: TopsGyms.
- Positioning: Gym Advancement Partner for Hotels & Resorts across Europe.
- Core slogan: "Advancing Gyms. Strengthening Business."
- TopsGyms is not merely an equipment seller or generic consultant.
- The model is: analyse opportunities -> advise -> implement/upgrade -> ongoing support.
- Primary audience: hotels, resorts and hospitality fitness spaces across Europe.
- Website language strategy: English first, then professional European translations.

## Brand

- Primary navy: #133354.
- Sand: #F5EBD8.
- Metallic/silver may only be used subtly.
- Premium/business feeling first, athletic second.
- Use generous spacing, restrained motion and a clean premium appearance.
- Avoid fake projects, fake testimonials, fake clients, fake statistics or unsupported claims.
- Founder: Sofie Tops.
- Founder presence should remain subtle: roughly 90% TopsGyms brand, 10% founder.
- Never invent qualifications, results, customers or partnerships.

## Website structure

Core public pages:

- /
- /services/
- /opportunity-scan/
- /approach/
- /about/
- /contact/

Legal:

- /privacy/
- /cookies/
- /404.html

Current Spanish equivalents:

- /es/
- /es/services/
- /es/opportunity-scan/
- /es/approach/
- /es/about/
- /es/contact/

## Technical

- Static HTML, CSS and lightweight vanilla JavaScript.
- No framework or CMS unless explicitly requested.
- GitHub Pages deployment.
- Production domain: topsgyms.com.
- NEVER modify or delete CNAME unless explicitly instructed.
- CNAME must remain exactly: topsgyms.com
- Keep .nojekyll.
- Reuse the existing shared CSS/JS architecture.
- Do not introduce unnecessary dependencies.
- Keep accessibility, responsive behavior and reduced-motion support intact.

## Git safety

- Development branch is redesign-v2.
- Never modify main directly unless explicitly instructed.
- Before starting work, verify the current branch.
- If not on redesign-v2, stop and report it.
- Do not merge redesign-v2 into main unless explicitly instructed.
- Do not force push.
- Never discard unrelated user changes.
- Before committing, inspect git status and the diff.
- Prefer clear, focused commits.
- Do not commit or push unless the user explicitly asks or the task explicitly authorizes it.

## SEO

- Europe-first SEO.
- Use descriptive, unique titles and meta descriptions.
- Preserve correct self-canonicals.
- Preserve robots directives.
- Sitemap is /sitemap.xml.
- robots.txt must reference https://topsgyms.com/sitemap.xml
- Use hreflang only for real completed translations.
- Current EN/ES reciprocal hreflang is represented through the sitemap.
- x-default should point to the English equivalent.
- Do not create doorway pages, thin location pages or keyword-spam pages.
- Do not index privacy, cookies or 404 pages.
- Do not claim SEO guarantees.

## Multilingual

- Translate for natural professional business language, not literal word-for-word translation.
- Preserve meaning, positioning and factual claims.
- Do not invent localized claims, customers or market presence.
- Keep internal links within the active language where a translated equivalent exists.
- English is the fallback for legal pages until translated legal pages exist.
- Do not send users from an untranslated legal page to an unrelated translated homepage.
- Keep language switcher routing context-aware.
- Current completed languages: English and Spanish.
- Planned first-wave languages after Spanish: German, French and Dutch.
- Other planned languages may remain marked unavailable until complete.

## Forms

- Opportunity Scan uses the existing Formspree endpoint and scan.js.
- Contact uses the existing Formspree endpoint and contact.js.
- Never replace Formspree endpoints unless explicitly instructed.
- Preserve backend field names and option values unless a deliberate migration is requested.
- Localize visible form text while keeping backend compatibility.
- Never claim successful form delivery without testing it.

## Core content principles

- "The gym should not feel like an extra room. It should feel like part of the stay."
- Opportunity Scan principle: discover first, decide second.
- "The goal of the scan is not to find something to sell. It is to find what is worth improving."
- Approach: Discover -> Analyse -> Prioritise -> Advance -> Support.
- Better does not automatically mean bigger; it means more appropriate.
- Recommendations should connect guest experience, fitness quality and business value.

## Founder quote

When the English founder quote is used, preserve it exactly:

"Trust matters to me. If I recommend something, it is because I genuinely believe it will make your gym stronger. I want clients to know that I will think with them, be honest with them and care about the result."
— Sofie Tops, Founder, TopsGyms.

## Working style

- Inspect existing files before editing.
- Reuse existing components and patterns rather than rebuilding unnecessarily.
- When translating a page, use the English page as the source of truth and the Spanish version as the structural multilingual reference.
- After changes, check internal links, canonicals, hreflang/sitemap implications, language routing and forms where relevant.
- Report what changed and any remaining risks.
- Never silently make business, legal or factual assumptions.
- If exact legal business details such as address, Chamber of Commerce number or VAT number are missing, do not invent them.
