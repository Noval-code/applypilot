---
version: alpha
name: shadcn-ui-design-system
description: |
  shadcn/ui is a beautifully designed, accessible component library that follows
  a utility-first aesthetic with minimal, clean components, a neutral color
  palette, and a strong focus on developer experience. The system reads as
  "modern SaaS meets editorial minimalism": white and near-white surfaces,
  dark ink type, subtle borders, and sparing use of color on primary actions.
  Every component ships with full light/dark mode parity via CSS custom
  properties in HSL.

colors:
  background: "hsl(0 0% 100%)"
  foreground: "hsl(222.2 84% 4.9%)"
  muted: "hsl(210 40% 96.1%)"
  muted-foreground: "hsl(215.4 16.3% 46.9%)"
  popover: "hsl(0 0% 100%)"
  popover-foreground: "hsl(222.2 84% 4.9%)"
  card: "hsl(0 0% 100%)"
  card-foreground: "hsl(222.2 84% 4.9%)"
  border: "hsl(214.3 31.8% 91.4%)"
  input: "hsl(214.3 31.8% 91.4%)"
  primary: "hsl(221.2 83.2% 53.3%)"
  primary-foreground: "hsl(210 40% 98%)"
  secondary: "hsl(210 40% 96.1%)"
  secondary-foreground: "hsl(222.2 47.4% 11.2%)"
  accent: "hsl(210 40% 96.1%)"
  accent-foreground: "hsl(222.2 47.4% 11.2%)"
  destructive: "hsl(0 84.2% 60.2%)"
  destructive-foreground: "hsl(210 40% 98%)"
  ring: "hsl(221.2 83.2% 53.3%)"
  success: "hsl(142.1 76.2% 36.3%)"
  warning: "hsl(47.9 95.8% 53.1%)"
  info: "hsl(221.2 83.2% 53.3%)"

typography:
  display-xxl:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -2px
  display-xl:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1.5px
  display-lg:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -1px
  display-md:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.5px
  heading-lg:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.25px
  heading-md:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  heading-sm:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  body-xl:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-lg:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button-md:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  button-sm:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  caption:
    fontFamily: Geist, Inter, SF Pro, system-ui, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0
  code-md:
    fontFamily: Geist Mono, JetBrains Mono, Fira Code, monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  code-sm:
    fontFamily: Geist Mono, JetBrains Mono, Fira Code, monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  xxl: 24px
  xxxl: 32px
  xxxxl: 40px
  section: 64px
  band: 96px

shadows:
  sm: "0 1px 2px 0 rgba(0,0,0,0.05)"
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)"
  lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)"
  xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 10px 16px
    height: 40px
  button-primary-hover:
    backgroundColor: "hsl(221.2 83.2% 45%)"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
  button-primary-disabled:
    backgroundColor: "hsl(214.3 31.8% 80%)"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 10px 16px
    height: 40px
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 9px 15px
    height: 40px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 36px
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 0
    height: "auto"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    size: 40px
  button-icon-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    size: 40px
  text-input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 40px
    borderColor: "{colors.input}"
  text-input-focused:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 40px
    borderColor: "{colors.ring}"
    ringWidth: 2px
    ringColor: "{colors.ring}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
    shadow: "{shadows.sm}"
    borderColor: "{colors.border}"
  card-elevated:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
    shadow: "{shadows.lg}"
  card-interactive:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
    shadow: "{shadows.sm}"
    borderColor: "{colors.border}"
    hoverShadow: "{shadows.md}"
  dialog:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
    shadow: "{shadows.xl}"
  popover:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
    shadow: "{shadows.lg}"
    borderColor: "{colors.border}"
  badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  badge-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  badge-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 2px 10px
    borderColor: "{colors.border}"
  badge-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.background}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  nav-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    borderBottom: "1px solid {colors.border}"
    height: 56px
  nav-link:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body-sm}"
    hoverTextColor: "{colors.foreground}"
  nav-link-active:
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
  tabs:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    activeBorderColor: "{colors.foreground}"
    inactiveTextColor: "{colors.muted-foreground}"
  table-header:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.caption}"
    padding: 8px 12px
  table-cell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    padding: 10px 12px
    borderBottom: "1px solid {colors.border}"
  alert-default:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    borderColor: "{colors.border}"
    iconColor: "{colors.foreground}"
  alert-destructive:
    backgroundColor: "hsl(0 100% 97.3%)"
    textColor: "{colors.destructive}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    borderColor: "{colors.destructive}"
    iconColor: "{colors.destructive}"
  alert-success:
    backgroundColor: "hsl(142.1 76.2% 95%)"
    textColor: "{colors.success}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    iconColor: "{colors.success}"
  toast:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    shadow: "{shadows.lg}"
  select:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 36px 8px 12px
    height: 40px
    borderColor: "{colors.input}"
  textarea:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    borderColor: "{colors.input}"
  checkbox:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
    size: 16px
    checkedBackgroundColor: "{colors.primary}"
    checkedTextColor: "{colors.primary-foreground}"
  radio:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.border}"
    size: 16px
    checkedBackgroundColor: "{colors.primary}"
    checkedTextColor: "{colors.primary-foreground}"
  switch:
    backgroundColor: "{colors.input}"
    rounded: "{rounded.full}"
    width: 36px
    height: 20px
    thumbSize: 16px
    thumbBackgroundColor: "{colors.background}"
    checkedBackgroundColor: "{colors.primary}"
  progress:
    backgroundColor: "{colors.secondary}"
    foregroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: 8px
  slider:
    trackColor: "{colors.secondary}"
    rangeColor: "{colors.primary}"
    thumbColor: "{colors.background}"
    thumbBorderColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: 4px
    thumbSize: 16px
  separator:
    backgroundColor: "{colors.border}"
    height: 1px
  skeleton:
    backgroundColor: "{colors.muted}"
    rounded: "{rounded.md}"
  accordion:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    borderColor: "{colors.border}"
    padding: 12px 0
  tooltip:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 4px 8px
    shadow: "{shadows.md}"
  dropdown-menu:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 4px
    shadow: "{shadows.lg}"
    borderColor: "{colors.border}"
    itemPadding: 6px 12px
    itemRounded: "{rounded.sm}"
    itemHoverBackgroundColor: "{colors.accent}"
    itemHoverTextColor: "{colors.accent-foreground}"
  breadcrumb:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body-sm}"
    activeTextColor: "{colors.foreground}"
    separatorColor: "{colors.muted-foreground}"
  pagination:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    size: 36px
    activeBackgroundColor: "{colors.primary}"
    activeTextColor: "{colors.primary-foreground}"
  toggle:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 36px
    pressedBackgroundColor: "{colors.accent}"
    pressedTextColor: "{colors.accent-foreground}"
  footer:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body-sm}"
    padding: 48px 24px
    borderTop: "1px solid {colors.border}"
---

## Overview

shadcn/ui is not a component library in the traditional sense — it is a
design system built on the copy-paste distribution model. Rather than
installing an npm package with pre-built components, you add components
directly into your codebase, giving you full ownership and control over
every style decision.

The surface is a clean white canvas (`{colors.background}` —
`hsl(0 0% 100%)`) with navy-slate ink (`{colors.foreground}` —
`hsl(222.2 84% 4.9%)`), subtle blue-grey borders (`{colors.border}` —
`hsl(214.3 31.8% 91.4%)`), and a single blue primary accent
(`{colors.primary}` — `hsl(221.2 83.2% 53.3%)`) reserved for CTAs,
links, and focus rings. The slate undertone keeps the interface
professional and developer-focused while the blue accent adds a
trustworthy, actionable signal.

The typography is utilitarian. **Geist** (or **Inter**) is the single
family used across display, body, and UI — weight 400 for body, weight
500–700 for headings and buttons, scale from 12px to 72px. **Geist Mono**
carries all code blocks, inline code, and technical content. One family,
one job — clean and unapologetically functional.

Modular rhythm is built on a consistent spacing scale (4px base) and
rounded corners are restrained: interactive elements and cards use
`{rounded.md}` (8px), badges and pills use `{rounded.full}` (9999px),
and dialogs step up to `{rounded.lg}` (12px). Shadows are subtle and
layered: cards sit at `{shadows.sm}`, popovers at `{shadows.lg}`, and
dialogs at `{shadows.xl}`.

**Key Characteristics:**
- A pure white canvas (`{colors.background}` — `hsl(0 0% 100%)`) with
  navy-slate ink (`{colors.foreground}` — `hsl(222.2 84% 4.9%)`).
- Blue primary accent (`{colors.primary}` — `hsl(221.2 83.2% 53.3%)`)
  for CTAs, links, and focus rings — professional and trustworthy.
- Single-family typography: **Geist**/**Inter** at weights 400–700 across
  all roles. **Geist Mono** for code.
- Restrained rounding: `{rounded.md}` (8px) on cards and inputs, `{rounded.full}`
  on badges and pills, `{rounded.lg}` (12px) on dialogs.
- CSS variable-driven theming with HSL values — full light/dark mode parity.
- Utility-first: components are styled via Tailwind CSS classes, not
  opinionated CSS-in-JS.
- Copy-paste distribution: every component is editable in your codebase.
- Subtle elevation system: flat → `{shadows.sm}` (card) → `{shadows.md}`
  (hover) → `{shadows.lg}` (popover) → `{shadows.xl}` (dialog).

## Colors

### Light Mode (Default)

- **Background** (`{colors.background}` — `hsl(0 0% 100%)`): The default
  page background. Pure white.
- **Foreground** (`{colors.foreground}` — `hsl(0 0% 3.9%)`): Primary text
  colour. Near-black with a neutral undertone.
- **Card** (`{colors.card}` — `hsl(0 0% 100%)`): Card and panel surfaces.
- **Card Foreground** (`{colors.card-foreground}` — `hsl(0 0% 3.9%)`):
  Text on card surfaces.
- **Popover** (`{colors.popover}` — `hsl(0 0% 100%)`): Dropdown menu,
  tooltip, popover surfaces.
- **Popover Foreground** (`{colors.popover-foreground}` — `hsl(0 0% 3.9%)`):
  Text on popover surfaces.
- **Primary** (`{colors.primary}` — `hsl(0 0% 9%)`): Primary action
  backgrounds (buttons, toggles, switches). Near-black by default.
- **Primary Foreground** (`{colors.primary-foreground}` — `hsl(0 0% 98%)`):
  Text on primary surfaces.
- **Secondary** (`{colors.secondary}` — `hsl(0 0% 96.1%)`): Secondary
  action backgrounds.
- **Secondary Foreground** (`{colors.secondary-foreground}` — `hsl(0 0% 9%)`):
  Text on secondary surfaces.
- **Muted** (`{colors.muted}` — `hsl(0 0% 96.1%)`): Muted/disabled
  backgrounds.
- **Muted Foreground** (`{colors.muted-foreground}` — `hsl(0 0% 45.1%)`):
  Muted, secondary, and placeholder text.
- **Accent** (`{colors.accent}` — `hsl(0 0% 96.1%)`): Hover state and
  accent backgrounds.
- **Accent Foreground** (`{colors.accent-foreground}` — `hsl(0 0% 9%)`):
  Text on accent surfaces.
- **Destructive** (`{colors.destructive}` — `hsl(0 84.2% 60.2%)`):
  Destructive action backgrounds (delete, remove).
- **Destructive Foreground** (`{colors.destructive-foreground}` — `hsl(0 0% 98%)`):
  Text on destructive surfaces.
- **Border** (`{colors.border}` — `hsl(0 0% 89.8%)`): Default border
  colour for cards, inputs, and structural dividers.
- **Input** (`{colors.input}` — `hsl(0 0% 89.8%)`): Input field borders
  (separate from general border token for form specificity).
- **Ring** (`{colors.ring}` — `hsl(0 0% 3.9%)`): Focus ring colour.
- **Success** (`{colors.success}` — `hsl(142.1 76.2% 36.3%)`):
  Positive/success indicators.
- **Warning** (`{colors.warning}` — `hsl(47.9 95.8% 53.1%)`):
  Warning/caution indicators.
- **Info** (`{colors.info}` — `hsl(221.2 83.2% 53.3%)`):
  Informational indicators.

### Dark Mode

When the `.dark` class is applied to the document, every HSL token swaps
to its dark counterpart:

- **Background** → `hsl(222.2 84% 4.9%)` (deep navy-slate canvas)
- **Foreground** → `hsl(210 40% 98%)` (near-white text)
- **Card/Popover** → `hsl(222.2 84% 4.9%)`
- **Muted/Secondary/Accent** → `hsl(217.2 32.6% 17.5%)`
- **Muted Foreground** → `hsl(215 20.2% 65.1%)`
- **Border/Input** → `hsl(217.2 32.6% 17.5%)`
- **Ring** → `hsl(212.7 26.8% 83.9%)`
- **Primary** → `hsl(217.2 91.2% 59.8%)` (bright blue on dark)
- **Primary Foreground** → `hsl(222.2 47.4% 11.2%)`
- **Destructive** → `hsl(0 62.8% 30.6%)`

### Brand & Accent

The system uses **Slate + Blue** as the active theme — slate-undertone
neutrals (222.2 hue) for backgrounds, borders, and text, with a blue
primary (`hsl(221.2 83.2% 53.3%)`) for actionable elements. To
customize further, override the following tokens:

- Replace `{colors.primary}` and `{colors.ring}` with your brand colour.
- Replace `{colors.destructive}` with your error/danger colour.
- Replace `{colors.success}` and `{colors.warning}` with your semantic
  palette.

Available theme presets (from `themes.css`):
- **Slate + Blue** (active): Blue-grey neutrals (222.2 hue) + blue
  primary. Most popular for SaaS/enterprise apps.
- **Neutral**: Pure greyscale — 0 hue across all tokens.
- **Zinc**: Slight warm-grey hue (240 hue).
- **Stone**: Warm brown-grey hue (20 hue).
- **Gray**: Neutral blue-grey hue (224 hue).
- **Blue**: Full blue theme.
- **Green**: Green primary variant (`hsl(142.1 76.2% 36.3%)`).
- **Red**: Red primary variant (`hsl(0 72.2% 50.6%)`).
- **Rose**: Rose primary variant (`hsl(346.8 77.2% 49.8%)`).
- **Orange**: Orange primary variant (`hsl(24.6 95% 53.1%)`).
- **Yellow**: Yellow primary variant (`hsl(47.9 95.8% 53.1%)`).
- **Violet**: Violet primary variant (`hsl(262.1 83.3% 57.8%)`).

## Typography

### Font Family

The system ships a deliberate two-family stack:

- **Geist** (or **Inter**) — system-adjacent humanist sans-serif used
  for all display, body, and UI text. Weights available: 400, 500, 600,
  700. Variable font supported.
- **Geist Mono** (or **JetBrains Mono**, **Fira Code**) — monospace used
  in code blocks, inline code, and technical content.

When Geist is not available, **Inter** (open-source via Google Fonts) is
the canonical substitute at the same weights.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xxl}` | 72px | 700 | 1.1 | -2px | Hero headlines. One per page. |
| `{typography.display-xl}` | 56px | 700 | 1.1 | -1.5px | Section openers. |
| `{typography.display-lg}` | 40px | 700 | 1.2 | -1px | Sub-section titles. |
| `{typography.display-md}` | 32px | 600 | 1.25 | -0.5px | Feature card titles. |
| `{typography.heading-lg}` | 24px | 600 | 1.3 | -0.25px | Card titles, section headers. |
| `{typography.heading-md}` | 20px | 600 | 1.4 | 0 | Card sub-headers. |
| `{typography.heading-sm}` | 16px | 600 | 1.5 | 0 | List section headers. |
| `{typography.body-xl}` | 18px | 400 | 1.6 | 0 | Lead body text. |
| `{typography.body-lg}` | 16px | 400 | 1.6 | 0 | Default body. |
| `{typography.body-md}` | 14px | 400 | 1.5 | 0 | Compact body, table cells. |
| `{typography.body-sm}` | 13px | 400 | 1.5 | 0 | UI labels, metadata. |
| `{typography.button-md}` | 14px | 500 | 1 | 0 | Default button label. |
| `{typography.button-sm}` | 13px | 500 | 1 | 0 | Compact button label. |
| `{typography.caption}` | 12px | 400 | 1.33 | 0 | Fine print, badges. |
| `{typography.code-md}` | 14px | 400 | 1.5 | 0 | Code blocks. |
| `{typography.code-sm}` | 12px | 400 | 1.5 | 0 | Compact code. |

### Principles
- **Single family, three roles.** Geist/Inter carries every role; weight
  and size differentiate hierarchy.
- **Display weight 700** for hero and section openers; **600** for
  smaller display and heading sizes. Body stays at **400**.
- **Weight 500 for buttons** — slightly heavier than body for visual
  emphasis without reaching full bold (700).
- **Letter-spacing remains at 0** for all sizes below 32px. Negative
  tracking is reserved for display sizes (32px+) to compress large type
  into tight blocks.
- **Code is always monospace.** Never set code in Geist/Inter, even at
  small sizes.

## Layout

### Spacing System
- **Base unit**: 4px, with the working scale on multiples of 4 / 8 / 12.
- **Tokens**: `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}`
  8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 20px
  · `{spacing.xxl}` 24px · `{spacing.xxxl}` 32px · `{spacing.xxxxl}`
  40px · `{spacing.section}` 64px · `{spacing.band}` 96px.
- Section padding: `{spacing.section}` (64px) vertical between full-width
  bands; `{spacing.band}` (96px) when a band needs extra breathing room.
- Card internal padding: `{spacing.xxl}` (24px) on most cards.

### Grid & Container
- **Max content width**: 1280px on body sections, centered with auto
  margins.
- **Content padding**: 16px–32px on mobile, scaling to 32px–64px on
  desktop.

### Whitespace Philosophy
- Whitespace is generous but functional — sections breathe at 64px and
  key bands open at 96px.
- Inside cards, the system tightens to 20–24px so content sits in a
  compact rhythm.
- Borders (`{colors.border}`) replace shadows on most surfaces; shadows
  are reserved for interactive or floating elements.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No shadow, no border | Default background surfaces. |
| 1 — Card | `{shadows.sm}` + 1px solid `{colors.border}` | Cards, panels. |
| 2 — Interactive | `{shadows.md}` | Hover state on interactive cards. |
| 3 — Popover | `{shadows.lg}` + `{colors.border}` | Dropdown menus, popovers. |
| 4 — Dialog | `{shadows.xl}` | Modals, dialogs. |

The system favours border-based elevation over heavy shadows. Shadows
accentuate hierarchy without muddying the clean aesthetic.

### Decorative Depth
- **Focus rings**: Interactive elements use a 2px `{colors.ring}` outline
  offset by 2px, mimicking the `outline` CSS property.
- **Skeleton states**: Loading skeletons use `{colors.muted}` at
  `{rounded.md}`.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed bands, separators. |
| `{rounded.sm}` | 4px | Compact checkboxes, small chips. |
| `{rounded.md}` | 8px | Cards, buttons, inputs, dialogs. |
| `{rounded.lg}` | 12px | Large dialogs, featured cards. |
| `{rounded.xl}` | 16px | Extra-spacious containers. |
| `{rounded.full}` | 9999px | Badges, pills, toggles, avatars. |

### Photography Geometry
- Cards with thumbnails / images: corners inherit the card's
  `{rounded.md}` — image crops should use `overflow: hidden`.
- Avatar components: circular (`{rounded.full}`), 32–40px standard.
- Thumbnails in card grids: 1:1 aspect ratio inside bordered cards.

## Components

### Buttons

**`button-primary`** — default CTA
- Background `{colors.primary}`, label `{colors.primary-foreground}`,
  type `{typography.button-md}`, padding `10px 16px`, `rounded: {rounded.md}`,
  height 40px.
- The primary action on any page. Customize `{colors.primary}` for brand
  colour.
- Hover state: background darkens to `hsl(0 0% 15%)`.
- Disabled state: background `hsl(0 0% 60%)`, cursor `not-allowed`.

**`button-secondary`** — secondary CTA
- Background `{colors.secondary}`, label `{colors.secondary-foreground}`,
  type `{typography.button-md}`, `rounded: {rounded.md}`.
- Equal-weight alternative to `{component.button-primary}`.

**`button-outline`** — bordered CTA
- Background `{colors.background}`, label `{colors.foreground}`,
  1px solid `{colors.border}`, type `{typography.button-md}`,
  `rounded: {rounded.md}`, padding `9px 15px` (1px less than primary to
  account for border).
- Tertiary action; appears alongside primary/secondary for "Cancel",
  "View details".

**`button-ghost`** — minimal inline button
- Background `transparent`, label `{colors.foreground}`, no border,
  `rounded: {rounded.md}`, padding `8px 12px`, height 36px.
- Sub-actions inside cards, toolbars, and form sections.

**`button-link`** — text-only button
- Background `transparent`, label `{colors.foreground}`, padding `0`,
  no border or rounding.
- Used inline with text.

**`button-icon`** — icon-only button
- Background `transparent`, label `{colors.foreground}`,
  `rounded: {rounded.md}`, 40×40px square.
- For toggleable or accessory icon actions.

**`button-icon-outline`** — icon with border
- Background `{colors.background}`, label `{colors.foreground}`,
  1px solid `{colors.border}`, `rounded: {rounded.md}`, 40×40px.

### Cards & Containers

**`card`** — default card
- Background `{colors.card}`, text `{colors.card-foreground}`,
  type `{typography.body-md}`, `rounded: {rounded.md}`, padding `{spacing.xxl}`
  (24px), `{shadows.sm}` shadow, 1px solid `{colors.border}` border.

**`card-elevated`** — elevated card
- Same as `card` but with `{shadows.lg}` shadow for featured content.

**`card-interactive`** — clickable card
- Same as `card` but with hover state that raises shadow to `{shadows.md}`.
- Cursor `pointer` on hover.

**`dialog`** — modal dialog
- Background `{colors.background}`, text `{colors.foreground}`,
  `{rounded.lg}` (12px), `{shadows.xl}` shadow, padding `{spacing.xxl}` (24px).
- Overlay: 50% opacity black backdrop.

**`popover`** — floating popover
- Background `{colors.popover}`, text `{colors.popover-foreground}`,
  `{rounded.md}`, `{shadows.lg}`, 1px solid `{colors.border}`,
  padding `{spacing.lg}` (16px).

### Inputs & Forms

**`text-input`** — default input
- Background `{colors.background}`, text `{colors.foreground}`,
  type `{typography.body-md}`, `rounded: {rounded.md}`, padding `8px 12px`,
  height 40px, 1px solid `{colors.input}`.
- Focus state: ring 2px `{colors.ring}` with 2px offset, border changes
  to `{colors.ring}`.
- Placeholder: `{colors.muted-foreground}`.

**`textarea`** — multi-line input
- Same styling as `text-input` but with no fixed height, min-height
  typically 80px.

**`select`** — dropdown select
- Same base styling as `text-input` with additional 24px right padding
  for the chevron icon.

**`checkbox`** — checkbox input
- Background `{colors.background}`, 1px solid `{colors.border}`,
  `{rounded.sm}` (4px), 16×16px.
- Checked: background `{colors.primary}`.

**`radio`** — radio input
- Background `{colors.background}`, 1px solid `{colors.border}`,
  16×16px circular.
- Checked: inner dot `{colors.primary}`.

**`switch`** — toggle switch
- Track: background `{colors.input}`, `{rounded.full}`, 36×20px.
- Thumb: 16×16px circle, `{colors.background}`.
- Checked: track backgrounds `{colors.primary}`.

### Data Display

**`table-header`** — table header cell
- Background `{colors.muted}`, text `{colors.muted-foreground}`,
  type `{typography.caption}`, padding `8px 12px`.
- Uppercase via CSS.

**`table-cell`** — table body cell
- Background `{colors.background}`, text `{colors.foreground}`,
  type `{typography.body-sm}`, padding `10px 12px`.
- 1px solid `{colors.border}` bottom border.

### Feedback

**`alert-default`** — default alert
- Background `{colors.background}`, text `{colors.foreground}`,
  `{rounded.md}`, padding `12px 16px`, 1px solid `{colors.border}`.
- Icon in `{colors.foreground}`.

**`alert-destructive`** — error alert
- Background `hsl(0 100% 97.3%)`, text `{colors.destructive}`,
  `{rounded.md}`, 1px solid `{colors.destructive}`.

**`alert-success`** — success alert
- Background `hsl(142.1 76.2% 95%)`, text `{colors.success}`,
  `{rounded.md}`.

**`toast`** — notification toast
- Background `{colors.foreground}`, text `{colors.background}`,
  `{rounded.md}`, `{shadows.lg}`, padding `12px 16px`.

### Overlay

**`tooltip`** — hover tooltip
- Background `{colors.foreground}`, text `{colors.background}`,
  type `{typography.caption}`, `{rounded.md}`, `{shadows.md}`,
  padding `4px 8px`.

**`dropdown-menu`** — context menu
- Background `{colors.popover}`, text `{colors.popover-foreground}`,
  type `{typography.body-sm}`, `{rounded.md}`, `{shadows.lg}`,
  1px solid `{colors.border}`, padding `4px`.
- Items: padding `6px 12px`, `{rounded.sm}`, hover background
  `{colors.accent}`.

### Navigation

**`nav-bar`** — top navigation
- Background `{colors.background}`, type `{typography.body-sm}`,
  height 56px, 1px solid `{colors.border}` bottom border.
- Logo left, nav links centre/right, primary CTA far right.

**`tabs`** — tab navigation
- Background `{colors.background}`, type `{typography.body-sm}`.
- Active tab: underline in `{colors.foreground}`.
- Inactive tab: `{colors.muted-foreground}`.

**`breadcrumb`** — breadcrumb trail
- Text `{colors.muted-foreground}`, type `{typography.body-sm}`.
- Active (last) item: `{colors.foreground}`.

### Feedback & Loading

**`progress`** — progress bar
- Track: `{colors.secondary}`, fill: `{colors.primary}`, `{rounded.full}`,
  height 8px.

**`slider`** — range slider
- Track: `{colors.secondary}`, range: `{colors.primary}`, thumb:
  `{colors.background}` with 1px solid `{colors.primary}`.

**`skeleton`** — loading placeholder
- Background `{colors.muted}`, `{rounded.md}`.
- Animated with `pulse` animation (opacity oscillation).

### Layout

**`separator`** — horizontal divider
- Background `{colors.border}`, height 1px.

**`accordion`** — collapsible section
- Background `{colors.background}`, 1px solid `{colors.border}` bottom
  border, padding 12px 0.

**`footer`** — page footer
- Background `{colors.background}`, text `{colors.muted-foreground}`,
  type `{typography.body-sm}`, padding `48px 24px`, 1px solid
  `{colors.border}` top border.

## Do's and Don'ts

### Do
- Use `{colors.background}` (white) as the default page background in
  light mode; let dark mode automatically invert via `.dark` class.
- Use `{colors.primary}` (blue) for primary CTAs, links, and focus rings —
  the blue accent is the system's actionable signal.
- Apply `{rounded.md}` (8px) to buttons, inputs, cards, and dialogs —
  it is the system's signature rounding.
- Use `{rounded.full}` for badges, pills, switches, and avatars.
- Set body text in `{typography.body-md}` (14px) — it optimises for
  information density and readability.
- Use `{typography.body-lg}` (16px) for marketing copy and
  `{typography.body-sm}` (13px) for UI labels.
- Apply `{shadows.sm}` to cards and `{shadows.lg}` to popovers — the
  three-tier shadow system keeps hierarchy clear.
- Always pair `{colors.border}` with card surfaces for structural
  definition on the white canvas.
- Use `{component.alert-destructive}` for error states and
  `{component.badge-success}` for success states.

### Don't
- Don't add strong branding colours as background fills — the system's
  identity is in its neutrality and whitespace.
- Don't replace `{rounded.md}` with `{rounded.full}` on cards or buttons —
  pill-shaped cards break the system's clean geometry.
- Don't use shadows heavier than `{shadows.xl}` — the system favours
  border-based elevation over extreme shadows.
- Don't use code typography (`{typography.code-md}`) for body text, or
  body typography for code. Keep the lanes strict.
- Don't introduce additional font families beyond the Geist/Inter +
  Geist Mono pairing.
- Don't hardcode colour values — always use the CSS variable tokens so
  dark mode and theme swapping work automatically.
- Don't bump body weight above 400 — emphasis comes from size or family,
  not weight.
- Don't use `!important` in component styles — the copy-paste model
  gives you full control without escalation.
- Don't remove the focus ring — `{colors.ring}` at 2px offset is
  required for accessibility.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop | ≥ 1024px | Full layout, multi-column grids. |
| Tablet | 768–1023px | 2-up grids, collapsed sidebars. |
| Mobile Large | 426–767px | 1-up grids, stacked layouts. |
| Mobile | ≤ 425px | Compact padding, stacked everything. |

### Touch Targets
- All buttons minimum 40px height (default `{component.button-primary}`
  is 40px).
- `{component.button-icon}` (40×40px) stays accessible at all viewports.
- Form inputs minimum 40px height.

### Collapsing Strategy
- Top-level nav collapses to hamburger at < 768px; logo and CTA stay
  anchored.
- Display typography clamps: 72px → 48px → 36px → 28px across the
  breakpoint ladder.
- Multi-column grids collapse: 4-up → 2-up → 1-up.
- Side drawers and dialogs: full-screen at mobile (< 768px).

### Image Behavior
- Images in cards: `object-fit: cover` with the card's `overflow: hidden`
  for consistent cropping.
- Hero images: full-bleed width, fixed aspect ratio (16:9 or 4:3).
- Avatar images: circular crop inside `{rounded.full}` containers.

## Iteration Guide

1. Override CSS variables in `globals.css` to set your brand colour:
   `--primary: hsl(...)` immediately changes every `{component.button-primary}`
   across the system.
2. Add new component variants as separate entries — do not bury them in
   prose.
3. Default body type to `{typography.body-md}` (14px); use
   `{typography.body-sm}` for compact displays.
4. Pair each component with a corresponding `*-hover`, `-disabled`, and
   `-focused` variant for interactive states.
5. Remember that every component file is copied into your codebase —
   edit CSS variables for sweeping changes, edit component files for
   targeted overrides.
