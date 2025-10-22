# Smart Car Auction Platform - Design Guidelines

## Design Approach: Reference-Based (E-commerce + Trust Platform Hybrid)

**Primary References**: Bring a Trailer (car auctions), eBay (bidding mechanics), Airbnb (verification trust), StockX (real-time updates)

**Core Principle**: Build trust through transparency while creating excitement around live auctions. Balance professional automotive marketplace aesthetics with the energy of competitive bidding.

---

## Color Palette

### Light Mode
- **Primary Brand**: 14 88% 35% (Deep automotive blue - trust and professionalism)
- **Accent Live**: 142 76% 36% (Vibrant green for active auctions and live indicators)
- **Accent Danger**: 0 84% 60% (Urgent red for ending soon, bids outbid)
- **Neutral Base**: 220 13% 96% (Clean background)
- **Neutral Dark**: 220 9% 20% (Text and high contrast elements)
- **Success**: 142 71% 45% (Verification approved, winning bid)
- **Warning**: 38 92% 50% (Verification pending, auction ending)

### Dark Mode
- **Primary Brand**: 214 84% 56% (Lighter blue for visibility)
- **Accent Live**: 142 76% 46% (Brighter green for dark backgrounds)
- **Background**: 222 47% 11% (Rich dark surface)
- **Surface**: 217 33% 17% (Elevated cards)

---

## Typography

**Font Stack**: 'Inter' for UI, 'DM Sans' for headings (via Google Fonts)

- **Hero Headlines**: text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight
- **Section Headers**: text-3xl md:text-4xl font-bold
- **Card Titles**: text-xl md:text-2xl font-semibold
- **Auction Prices**: text-2xl md:text-3xl font-bold tabular-nums
- **Body Text**: text-base leading-relaxed
- **Small Labels**: text-sm font-medium uppercase tracking-wide
- **Real-time Updates**: font-mono tabular-nums (for bid amounts, timers)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (p-4, gap-8, my-12, etc.)

**Container Strategy**:
- Maximum content width: max-w-7xl mx-auto
- Section padding: py-16 md:py-24 px-4 md:px-6
- Card padding: p-6 md:p-8
- Tight spacing for auction cards: gap-4 md:gap-6

**Grid Systems**:
- Auction listings: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Featured auctions: grid-cols-1 lg:grid-cols-2
- Dashboard stats: grid-cols-2 md:grid-cols-4

---

## Component Library

### Navigation
- **Header**: Fixed top navigation with transparent-to-solid transition on scroll
- Logo left, primary actions right (Browse, Sell, Profile)
- Verified badge indicator in user menu
- Mobile: Hamburger menu with slide-out drawer

### Hero Section (Landing Page)
- **Height**: min-h-[600px] md:min-h-[700px] - NOT full viewport
- Large hero image: Luxury car in dramatic lighting (wide angle, auction floor setting)
- Overlay gradient: from-black/70 via-black/50 to-transparent
- Centered headline + CTA with backdrop-blur-md bg-white/10 for outline buttons
- Live auction count ticker below hero

### Auction Cards
- **Image**: aspect-ratio-4/3 with overflow-hidden rounded-t-lg
- Multiple car photos in carousel (indicators at bottom)
- Overlay badges: "VERIFIED SELLER", "ENDING SOON" (top-right with backdrop-blur)
- Card content: Car title (text-xl font-semibold), year/make/model, current bid (text-2xl font-bold in accent color)
- Live bid indicator: Pulsing green dot with "3 bids" text
- Countdown timer: Bold, tabular-nums, color-coded (green > 1hr, orange < 1hr, red < 15min)
- CTA: "Place Bid" button (full width, prominent)

### Bidding Interface (Auction Detail)
- **Left Column (60%)**: Large image gallery with thumbnails, full-screen zoom capability
- **Right Column (40%)**: Sticky sidebar with:
  - Current bid (large, bold, text-3xl)
  - Bid increment controls (+$100, +$500, +$1000 chips)
  - Quick bid button (primary, large)
  - Bid history feed (scrollable, real-time updates with subtle slide-in animation)
  - Timer countdown (prominent, color-coded)
  - Seller verification badge with trust indicators

### Verification Flow
- **Multi-step wizard**: Progress indicator at top (1. Upload CNIC → 2. Selfie → 3. Review → 4. Pending)
- Clean white cards with ample padding (p-8 md:p-12)
- Upload zones: Dashed borders, hover state, drag-and-drop support
- Preview images: Thumbnail with remove option
- OCR extraction display: Table layout showing extracted vs. entered data
- Submission confirmation: Success checkmark with estimated review time

### Admin Panel
- **Sidebar navigation**: Fixed left, icon + label
- Dashboard: 4-column stat cards (Total Users, Pending Verifications, Active Auctions, Revenue)
- Verification queue: Table with thumbnail previews, extracted data, approve/reject actions
- Auction management: Filterable table with status indicators, quick actions

### Status Indicators
- **Verification Status**:
  - Pending: Orange badge with clock icon
  - Approved: Green badge with checkmark icon  
  - Rejected: Red badge with X icon
- **Auction Status**:
  - Live: Green dot pulsing animation + "LIVE" text
  - Ending Soon: Red background badge
  - Ended: Gray badge

### Forms
- Input fields: border-2 focus:border-primary rounded-lg p-3
- Labels: text-sm font-medium mb-2 block
- File upload: Bordered dashed area with icon, "Click or drag" instructions
- Validation: Inline error messages in red below fields
- Submit buttons: Full width on mobile, auto width on desktop (px-8 py-3)

### Modals & Overlays
- **Verification Required Modal**: 
  - Centered, backdrop-blur-sm bg-black/50
  - White card with icon, headline, description, CTA to start verification
  - Never show "Access Denied" - instead friendly prompt
- **Bid Confirmation**: Quick modal with bid amount, confirmation button
- **Admin Review Modal**: Side panel (right-slide) with full verification details

### Trust Elements
- Verification badges: Shield icon with checkmark, small badge format
- Seller stats: "100% positive feedback" with star rating
- CPLC status: "Criminal Record: Clear" with green checkmark (for verified sellers)
- Escrow notice: "Funds held securely until delivery" info banner

---

## Images

**Hero Image**: 
- Professional automotive photography showing luxury car at auction
- Dramatic side-angle shot with bokeh background
- Warm lighting suggesting premium market
- Placement: Full-width hero section background

**Auction Listings**:
- High-quality car photos (exterior, interior, engine, details)
- Consistent aspect ratio (4:3)
- Multiple angles per listing (4-8 photos minimum)

**Verification Section**:
- Icon illustrations for upload steps (not photos)
- Sample CNIC mockups showing correct vs. incorrect uploads
- Trust badge illustrations

**Admin Dashboard**:
- No decorative images - focus on data visualization and tables

---

## Animations

**Minimal, purposeful only**:
- Live bid updates: Subtle slide-in from bottom (200ms)
- New auction appearing: Fade-in (300ms)
- Countdown timer: Color transition at thresholds (smooth 1s transition)
- Verification upload: Progress indicator during OCR processing
- Button hovers: Built-in Tailwind transitions only

---

## Key Page Structures

### Landing Page (8 sections):
1. Hero with live auction count
2. Featured Active Auctions (2-col grid)
3. How It Works (3-step visual guide)
4. Trust & Safety (verification benefits)
5. Browse by Category (car type cards)
6. Recent Sold Auctions (social proof)
7. Become a Seller CTA
8. Footer with quick links

### Browse Auctions:
- Filter sidebar (left, collapsible on mobile)
- Auction grid (responsive 1-2-3 columns)
- Infinite scroll with load more

### Auction Detail:
- 60/40 split (images left, bidding right)
- Full car specifications below
- Seller information section
- Similar auctions carousel

### Dashboard (Verified Users):
- My Bids tab
- My Listings tab
- Verification Status card (if pending)
- Quick actions: "Post Auction", "Browse"

---

**Visual Hierarchy Priority**: 
1. Live auction status and current bid (most prominent)
2. Countdown timers and ending notifications
3. Verification trust indicators
4. Car images and details
5. Supporting information