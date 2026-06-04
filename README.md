# 💌 Wedding Invitation - The Digital Atelier

A beautiful, modern wedding invitation platform built with Next.js 15 and Tailwind CSS.

## ✨ Features

- 🎨 Elegant and sophisticated design
- ⏱️ Live countdown timer
- 📱 Fully responsive (mobile & desktop)
- 🌙 Dark mode support
- 🎭 Interactive envelope animation
- 📍 Location & venue information
- 💝 RSVP functionality
- 🎯 Material Design 3 color system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Change Wedding Details

Edit `app/page.tsx`:

```typescript
// Change names
<h1>Your Name <span>&</span> Partner Name</h1>

// Change date
const targetDate = new Date('2024-10-12T18:00:00').getTime();

// Change venue
<p>Your Venue Name, Location</p>
```

### Change Colors

Edit `tailwind.config.ts` to customize the Material Design 3 color palette.

### Change Fonts

The project uses:
- **Noto Serif** - for headings
- **Manrope** - for body text

To change fonts, edit `app/globals.css`.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Project Structure

```
wedding-invite/
├── app/
│   ├── globals.css       # Global styles & fonts
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main invitation page
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
└── package.json          # Dependencies
```

## 🛠️ Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Material Symbols** - Icons
- **Google Fonts** - Typography

## 📱 Responsive Design

- Desktop: Full sidebar navigation with envelope animation
- Mobile: Bottom navigation bar with touch-optimized UI

## 🎨 Design System

Based on Material Design 3 with custom wedding theme:
- Primary: Deep green (#002215)
- Secondary: Warm gold (#775a19)
- Surface: Warm white (#faf9f8)

## 📝 License

MIT License - feel free to use for your wedding!

## 💝 Credits

Design inspired by modern luxury wedding invitations with a digital twist.

---

**Made with ❤️ for your special day**
