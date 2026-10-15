# Shahab Sherafat's personal site

This is a personal GitHub Pages site built from al-folio v1.

## Content

- Edit personal facts in [_data/cv.yml](../_data/cv.yml). Both the homepage and online CV read this data.
- Update the introductory prose in [_pages/about.html](../_pages/about.html).
- The original CV is at [assets/pdf/CV-Shahab-Sherafat.pdf](../assets/pdf/CV-Shahab-Sherafat.pdf).
- Social links are also recorded in [_data/socials.yml](../_data/socials.yml).
- The bibliography contains the accepted ICCE paper, with its title and authors verified against [arXiv](https://arxiv.org/abs/2606.01375). Submitted manuscripts are labeled separately; their author lists and venue years have not been guessed.
- The CV describes the TEIAS study as randomized, while the linked paper's latest abstract describes a quasi-experimental study. The website uses “study” without assigning a design. The downloadable CV is unchanged.
- Degree completion in 2028 is displayed as expected. “Present” appointments and submission statuses reflect the supplied October 2026 CV.
- The phone number appears on the full CV and in the original PDF; the homepage uses email for contact.
- The machine-readable JSON resume is retained for compatibility but excluded from publication. If using the template's JSONResume renderer later, synchronize it with the YAML first.

## Presentation

The homepage and CV are self-contained Jekyll pages with `layout: null`. They use the existing data pipeline and GitHub Pages deployment without shadowing gem-owned layouts, includes, Sass, or JavaScript. There are **no gem overrides** to track.

Site-specific presentation lives in `assets/css/personal.css` and `assets/js/personal.js`. There is no additional CSS build process. The SVG illustration is conceptual, not a visualization of experimental results.

The document header/footer are deliberately present in both pages to avoid introducing theme overrides; synchronize them when changing shared navigation. The CV supports browser printing. Menus, theme selection, filters, and clipboard copying progressively enhance a usable HTML page. Reduced-motion preferences are respected.

Template examples remain in the checkout for reference and are excluded in `_config.yml`. They are not personal achievements and should not be re-enabled unintentionally.

## Preview and publish

This is a user site at `https://shahabsherafat.github.io`, so `baseurl: ""` is correct. Do not pass the upstream demo's `/al-folio` base URL when building this site.

With Ruby/Bundler and Node/npm installed:

```sh
bundle install
npm ci
npm run lint:prettier
npm run lint:style-contract
bundle exec al-folio upgrade audit --no-fail
bundle exec al-folio upgrade overrides audit
bundle exec jekyll serve
```

Open `http://localhost:4000/`. To build production output, run `JEKYLL_ENV=production bundle exec jekyll build` (or set the environment variable using your shell's syntax).

The retained `.github/workflows/deploy.yml` builds after a push to `main` or `master` and publishes `_site` to `gh-pages`. In the repository's GitHub Pages settings, select **Deploy from a branch**, branch **gh-pages**, directory **/(root)**. The first workflow run creates that branch. Enable GitHub Actions for the fork if GitHub prompts you.

Local changes are not automatically committed, pushed, or published.
