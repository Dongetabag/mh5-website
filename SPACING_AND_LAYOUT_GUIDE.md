# Spacing & Layout Optimization Guide
## Complete Site Improvements Summary

---

## ✅ Improvements Implemented

### 1. **Moving/Transparent Header**
- ✅ Enhanced Navigation component with smooth scroll transitions
- ✅ Transparent on hero, solid with backdrop blur on scroll
- ✅ Better mobile menu handling
- ✅ Location: `src/components/Navigation.tsx`

### 2. **Title Borders & Subtitle Overlays**
- ✅ Created `SectionTitle` component with border decorations
- ✅ Created `SubtitleOverlay` component for custom overlays
- ✅ Corner accents and gradient borders
- ✅ Location: `src/components/sections/SectionTitle.tsx` & `SubtitleOverlay.tsx`

### 3. **Consistent Spacing System**
- ✅ Updated global CSS spacing variables
- ✅ Mobile-first responsive spacing
- ✅ Created `PageSection` wrapper component
- ✅ Location: `src/components/common/PageSection.tsx`

### 4. **Improved Text Readability**
- ✅ Better line heights and letter spacing
- ✅ Improved font sizes with clamp() for responsiveness
- ✅ `.text-readable` utility class
- ✅ Mobile-optimized text sizing

### 5. **Mobile & Vertical Video Optimization**
- ✅ `.video-vertical` class for 9:16 aspect ratio
- ✅ `.vertical-photo` class for mobile photos
- ✅ Touch-friendly button sizes (44px minimum)
- ✅ Responsive container padding

### 6. **Scroll Autoplay Features**
- ✅ Intersection Observer-based autoplay utility
- ✅ Automatic video play/pause on scroll
- ✅ Mobile-optimized with `playsinline`
- ✅ Location: `src/utils/scrollAutoplay.ts`

---

## 📦 New Components

### SectionTitle
```tsx
import SectionTitle from '@/components/sections/SectionTitle'

<SectionTitle 
  subtitle="Optional subtitle text"
  align="center" // left | center | right
>
  Main Title Text
</SectionTitle>
```

### SubtitleOverlay
```tsx
import SubtitleOverlay from '@/components/sections/SubtitleOverlay'

<SubtitleOverlay variant="glass"> // default | gradient | glass
  Subtitle text here
</SubtitleOverlay>
```

### PageSection
```tsx
import PageSection from '@/components/common/PageSection'

<PageSection 
  padding="lg" // none | sm | md | lg | xl | 2xl
  background="midnight" // midnight | smoke | transparent
  container={true}
>
  Your content
</PageSection>
```

---

## 🎨 CSS Utilities

### Spacing Classes
- `.section-spacing` - Standard section padding
- `.section-spacing-lg` - Large section padding
- `.container-padding` - Responsive container padding
- `.container-padding-mobile` - Mobile-only padding

### Text Readability
- `.text-readable` - Enhanced readability with proper line-height and spacing

### Video/Photo
- `.video-vertical` - 9:16 aspect ratio container
- `.vertical-photo` - Mobile-optimized vertical images
- `video[data-autoplay]` - Auto-plays when in viewport

---

## 📱 Mobile Optimizations

### Vertical Video Support
```html
<div class="video-vertical">
  <video data-autoplay muted loop playsinline>
    <source src="/video.mp4" type="video/mp4" />
  </video>
</div>
```

### Vertical Photos
```html
<img src="/photo.jpg" alt="Description" class="vertical-photo" />
```

---

## 🎬 Scroll Autoplay Usage

Videos automatically play when scrolled into view. Add the `data-autoplay` attribute:

```html
<video 
  data-autoplay 
  muted 
  loop 
  playsinline
  className="video-vertical"
>
  <source src="/video.mp4" type="video/mp4" />
</video>
```

The autoplay system is initialized automatically in `layout.tsx`.

---

## 📐 Spacing Guidelines

### Section Padding
- Small: `py-8 md:py-12` (PageSection padding="sm")
- Medium: `py-12 md:py-16` (PageSection padding="md")
- Large: `py-16 md:py-24 lg:py-32` (PageSection padding="lg") **Default**
- Extra Large: `py-20 md:py-28 lg:py-40` (PageSection padding="xl")

### Container Padding
- Mobile: `px-4` (1rem)
- Tablet: `px-6` (1.5rem)
- Desktop: `px-8 lg:px-12` (2-3rem)

---

## 🚀 Next Steps

To update all pages with consistent spacing:

1. **Import the components:**
```tsx
import SectionTitle from '@/components/sections/SectionTitle'
import PageSection from '@/components/common/PageSection'
```

2. **Wrap sections:**
```tsx
<PageSection padding="lg" background="midnight">
  <SectionTitle subtitle="Optional subtitle">
    Page Title
  </SectionTitle>
  {/* Your content */}
</PageSection>
```

3. **Add nav spacer:**
```tsx
<section className="section-spacing-lg">
  <div className="h-16 md:h-20" /> {/* Spacer for fixed nav */}
  {/* Content */}
</section>
```

---

## ✅ Checklist for Each Page

- [ ] Add nav spacer at top of first section
- [ ] Use `PageSection` wrapper for consistent spacing
- [ ] Use `SectionTitle` for main headings with borders
- [ ] Use `SubtitleOverlay` or subtitle prop for subtitles
- [ ] Apply `.text-readable` to body text blocks
- [ ] Use `.video-vertical` for vertical videos
- [ ] Add `data-autoplay` to videos that should autoplay
- [ ] Test on mobile (vertical scrolling)
- [ ] Verify text is clear and easy to read
- [ ] Check spacing between sections is consistent

---

*Guide created: December 4, 2024*



