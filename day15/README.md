# Habesha Eatery – Responsive Menu

## Project Overview

This project is a responsive restaurant webpage for **Habesha Eatery** built with HTML5 and CSS3. The webpage includes a navigation bar, reservation form, menu section, visit section, and footer. The menu was redesigned using a **mobile-first** approach and enhanced with responsive layouts and accessible animations.

## Features

- Mobile-first responsive design
- Sticky navigation bar
- Reservation form
- Responsive menu cards
- Responsive restaurant image
- Hover animation on menu cards
- Accessibility support using `prefers-reduced-motion`
- Clean HTML5 semantic structure
- CSS Grid and Flexbox layouts

## Responsive Design

The menu layout changes based on screen size:

| Screen Width     | Layout    |
| ---------------- | --------- |
| Less than 768px  | 1 column  |
| 768px and above  | 2 columns |
| 1024px and above | 3 columns |

Media queries used:

```css
@media (min-width: 768px) { ... }

@media (min-width: 1024px) { ... }
```

## Animation

Menu cards include a subtle hover effect using CSS transitions.

```css
.card:hover {
  transform: translateY(-8px) scale(1.02);
}
```

To improve accessibility, animations are disabled for users who prefer reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Technologies Used

- HTML5
- CSS3
- CSS Grid
- Flexbox
- Media Queries
- Responsive Images
- CSS Transitions
- Accessibility (`prefers-reduced-motion`)

## Project Structure

```
project/
│
├── index.html
├── layout.css
├── habesha_eatery.webp
└── README.md
```

## Self-Check List

- [x] Viewport meta tag added
- [x] Mobile-first layout implemented
- [x] One-column menu on mobile
- [x] Two-column menu at 768px
- [x] Three-column menu at 1024px
- [x] Responsive navigation
- [x] Responsive image
- [x] Hover animation added
- [x] `prefers-reduced-motion` supported
- [x] Tested by resizing the browser from approximately **360px to 1280px**

## Author

**Habesha Eatery Responsive Menu Project**
