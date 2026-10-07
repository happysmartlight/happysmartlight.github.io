# AI Instructions for Project Maintenance (AI_CLAUDE.md)

This file provides critical context, structure, styling guides, and rules for Claude or any AI agent modifying the source code of the Happy Smart Light website.

## 1. Context & Business Domain
- **Company:** Happy Smart Light (HSL)
- **Sector:** Custom smart LED control systems, high-speed ARGB/Pixel node rendering, stage lighting, and ambient light synchronization.
- **Core Protocol:** **ARGB HSL** (Proprietary protocol offering 45% less overhead than legacy WLED systems, ensuring smooth 60fps). 
- **Important Rule:** Do NOT use the term "WLED" unless referring to a legacy context. The primary protocol/brand keyword is "ARGB HSL" or "ARGB HSL Stream".

## 2. Directory Structure
```
/
├── package.json          - Dependencies and scripts.
├── index.html            - Vite HTML entry.
├── /src
│   ├── main.tsx          - React root mount point.
│   ├── App.tsx           - Main layout, smooth scrolling logic, screen switching (Main View vs. Product Details).
│   ├── index.css         - Tailwind v4 setup + Custom Cyberpunk/Neon styles, keyframe anims, utilities.
│   └── /components       - All modular React components.
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Products.tsx
│       ├── ProductDetailsPage.tsx
│       ├── InteractiveAppShowcase.tsx
│       ├── Ecosystem.tsx
│       ├── DistributionService.tsx
│       ├── Footer.tsx
│       └── ...
```

## 3. Technology Stack & Rules
- **React:** Functional components, Hooks. `framer-motion` (`motion/react`) for layout and enter/exit animations. Use `AnimatePresence` for unmounting effects.
- **Tailwind v4:** Uses CSS `@theme` variables inside `index.css`. DO NOT try to configure `tailwind.config.js` manually, as v4 uses CSS-first configuration.
- **Icons:** **MUST** use `lucide-react`. Never use FontAwesome or external SVGs for simple UI icons.
- **State & Routing:** Currently, "routing" between the main page and the `ProductDetailsPage` is handled via `App.tsx` state (`activeDetailedProductId`). When switching, use `window.scrollTo({ top: 0, behavior: "instant" })` to reset view, and save original position to restore upon "Back". 

## 4. Design Theme & Aesthetics
- **Theme:** Cyberpunk / Tech / High-Contrast Dark Mode.
- **Background:** `--color-cyber-dark` (`#020204`)
- **Typography:**
  - **Sans (Body):** `Inter`
  - **Display (Headings):** `Space Grotesk`
  - **Mono (Data/Tech specs):** `JetBrains Mono`
- **Brand Colors:**
  - `neon-pink` / `neon-pink-bright` (`#ff2d95`)
  - `neon-blue` / `neon-blue-bright` (`#00e5ff`)
  - `emerald-400` / `emerald-500`
  - `purple-400` / `purple-500`
  - `amber-400` / `amber-500`

### 4.1. Custom Utility Classes (Defined in index.css)
When you need to style elements, heavily rely on these pre-built classes to maintain brand identity:
- **Glow Texts:** `text-glow-pink`, `text-glow-blue`
- **Glow Shadows:** `shadow-glow-pink`, `shadow-glow-blue`, `shadow-glow-dual`
- **Glassmorphism:** `bg-glass`, `bg-glass-pink`, `bg-glass-blue`
- **Animation Helpers:** `anim-pulse-slow-1`, `anim-float`, `anim-rotate-slow`

### 4.2. UI Design Principles
1. **Architectural Honesty:** Do not clutter UI with mock server statuses (e.g., "PORT 3000 ONLINE"). Keep tech specs real and related strictly to ARGB lighting (e.g., "Render 60fps", "UDP packet loss recovery").
2. **Neon Accents:** Use intense, focused gradient text (`bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent`) for major CTA text or important numbers.
3. **Ghost Panels:** Use `bg-slate-900/60 border border-white/5` for subdued cards, saving the intense glowing borders (`border-neon-pink/40`) for active/selected states.

### 4.3. Image Album / Gallery Pattern
- For product/app image albums, follow the `/san-pham/hsl4x/` layout pattern: top tab/label control, one large primary image area inside a rounded dark framed panel, then a horizontal row of small thumbnails below.
- Do not use a four-equal-card grid for narrow portrait screenshots; it makes mobile app screenshots too cramped.
- The primary image should be the main clickable target for zoom/lightbox. Thumbnails should switch the active image and use a clear active border/glow.
- Reuse the smart viewer behavior when available: click to open, zoom in/out, wheel zoom, pan while zoomed, keyboard left/right navigation, ESC close.
- Keep gallery UI compact and product-like: no explanatory side lists, no oversized prose, no marketing layout inside the album block.

## 5. Contact Information Source of Truth
If updating templates or footers, ALWAYS use these exact details:
- **Phone / Zalo:** (+84) 0784 140 494
- **Email:** happysmartlight@outlook.com
- **MST:** 3502535621
- **Tech Address:** Tech Hub, Sảnh S6.03, Vinhomes Grand Park, P. Long Bình, TP. Hồ Chí Minh
- **HQ Address:** Số 42 Hà Đức Trọng, P. Bà Rịa, TP. Hồ Chí Minh
