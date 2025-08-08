# Bharat Bhambhaney Photography

A stunning, modern photography showcase website inspired by the Rockstar Games design aesthetic. Built with React, TypeScript, and Framer Motion for beautiful animations and interactions.

## 🎨 Features

### ✨ Beautiful Design
- **Modern UI/UX**: Inspired by Rockstar Games design with glass effects and smooth animations
- **Responsive Design**: Perfect on all devices - desktop, tablet, and mobile
- **Dark Theme**: Elegant dark theme with golden accents
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **GSAP Enhancements**: Parallax scrolling, ScrollTrigger effects and SVG mask logo reveal

### 📸 Photography Showcase
- **Different Frame Sizes**: Small, medium, large, and wide frame layouts
- **Moving Photos**: Dynamic photo galleries with hover effects
- **Peacock Quotes**: Beautiful quotes about photography and life
- **Watermarking**: Automatic "BBPhotography" watermark on uploaded images
- **Lazy Loading**: Images load only as they approach the viewport

### 🎯 Gallery Features
- **Masonry Layout**: Beautiful masonry grid for photo display
- **Search & Filter**: Find photos by category and search terms
- **Modal View**: Full-screen photo viewing with details
- **Category Filtering**: Filter by landscape, portrait, nature, urban, abstract

### 👨‍💼 Admin Panel
- **Photo Upload**: Drag & drop photo upload with progress tracking
- **Watermarking**: Add "BBPhotography" watermark to images
- **Photo Management**: Edit titles, categories, and frame sizes
- **Real-time Preview**: See changes instantly
- **Secure Login**: Firebase Authentication protects the admin tools

### 📱 About Section
- **Photographer Details**: Complete profile and contact information
- **Achievements**: Awards, certifications, and milestones
- **Skills Display**: Visual skill bars with percentages
- **Services Offered**: Portrait, wedding, and landscape photography

## 🚀 Technologies Used

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Framer Motion**: Smooth animations and transitions
- **GSAP + ScrollTrigger**: Advanced scroll and parallax animations
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icons
- **React Dropzone**: File upload functionality
- **Canvas API**: Image watermarking
- **Tailwind CSS**: Utility-first CSS framework

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bbphotography.git
   cd bbphotography
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx     # Navigation bar
│   └── Footer.tsx     # Footer component
├── pages/             # Page components
│   ├── Home.tsx       # Home page with hero and quotes
│   ├── Gallery.tsx    # Photo gallery with filters
│   ├── About.tsx      # About page with achievements
│   └── Admin.tsx      # Admin panel for uploads
├── App.tsx            # Main app component
├── index.tsx          # React entry point
└── index.css          # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: `#1a1a1a` (Dark background)
- **Secondary**: `#f5f5f5` (Light text)
- **Accent**: `#d4af37` (Golden accent)
- **Text Primary**: `#ffffff` (White text)
- **Text Secondary**: `#a0a0a0` (Gray text)

### Typography
- **Primary Font**: Inter (Modern, clean)
- **Display Font**: Playfair Display (Elegant headings)

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Hover Effects**: Scale and lift animations
- **Loading States**: Progress bars and spinners
- **Scroll Animations**: Reveal on scroll effects

## 📸 Photo Management

### Frame Sizes
- **Small**: 1x1 grid space
- **Medium**: 1x2 grid space (tall)
- **Large**: 2x2 grid space (square)
- **Wide**: 2x1 grid space (wide)

### Categories
- Landscape
- Portrait
- Nature
- Urban
- Abstract
- Wedding
- Event

## 🔧 Customization

### Adding New Categories
Edit the `categories` array in `Gallery.tsx` and `Admin.tsx`:

```typescript
const categories = ['landscape', 'portrait', 'nature', 'urban', 'abstract', 'new-category'];
```

### Changing Watermark
Modify the watermark text in `Admin.tsx`:

```typescript
ctx.fillText('Your Watermark Text', canvas.width / 2, canvas.height - 50);
```

### Updating Colors
Modify CSS variables in `index.css`:

```css
:root {
  --accent-color: #your-color;
  --primary-color: #your-color;
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. The included `vercel.json` ensures correct single-page app routing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Rockstar Games**: Design inspiration
- **Framer Motion**: Animation library
- **Lucide**: Icon library
- **Tailwind CSS**: Utility-first CSS framework

---

**Made with ❤️ for photography lovers**

*Bharat Bhambhaney Photography - Capturing life's most precious moments*
