# Clearly Audacious

Production source for **Clearly Audacious**, Roberto Chavarria's strategic-clarity consulting practice for founders and executives.

Live site: <https://clearlyaudacious.robertochavarria.com>

## Positioning

The leader is the primary client. The business and team are the consequential context for the work.

The primary offer is an ongoing strategic-clarity relationship with a founder, owner, or executive. When the issue belongs to the wider organization, the work can expand into:

- **Strategic Diagnostic** — focused inquiry through interviews, observation, and synthesis
- **Strategy and Leadership Workshop** — a designed working process for the relevant leadership group

Public pricing is intentionally omitted until the offer and numbers are explicitly approved.

## Site structure

```text
index.html              Home
approach/index.html     How I Work
about/index.html        About Roberto
work/index.html         Work Together
contact/index.html      Start a Conversation
styles.css              Shared design system and responsive styles
site.js                 Navigation, reveal behavior, and climbing-line animation
images/                 Production images
CNAME                   GitHub Pages custom domain
.nojekyll               Serve files without Jekyll processing
```

Legacy root files (`about.html`, `approach.html`, `work.html`, and `contact.html`) are lightweight compatibility redirects to the canonical directory routes.

## Local preview

No build step is required.

```bash
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173>.

## Deployment

GitHub Pages publishes the `main` branch of `robertochavarria/clearlyaudacious` to the custom domain in `CNAME`.

To release:

```bash
git add .
git commit -m "Update Clearly Audacious positioning"
git push origin main
```

Then verify the GitHub Pages workflow and all five canonical routes on the live domain.

## Design system

- Warm sand background with a subtle paper-grain overlay
- Newsreader for display type
- Hanken Grotesk for body copy and buttons
- IBM Plex Mono for navigation, labels, and captions
- Deep navy as the primary accent
- Pill-shaped labels and calls to action
- Responsive breakpoints at 980px, 900px, 860px, 600px, and 560px
- Motion respects `prefers-reduced-motion`

## Release checks

Before publishing:

1. Validate one `h1` and one canonical link per canonical route.
2. Check every local `href`, `src`, and fragment target.
3. Confirm all routes and assets return HTTP 200.
4. Check desktop and 390px mobile widths for horizontal overflow.
5. Verify every image loads.
6. Scroll the full page and confirm reveal content becomes visible.
7. Run a serious/critical accessibility scan.
8. Exercise the mobile menu, including Escape-to-close.
9. Visually inspect Home, Work Together, and Contact at desktop and mobile widths.

## Contact

The primary conversion action opens a pre-addressed email to `hello@robertochavarria.com`. The site does not submit or send email itself.
