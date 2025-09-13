# 🔗 LinkForge - URL Shortener

A modern, clean URL shortener built with React and Express. No authentication required - just pure URL shortening functionality with analytics.

## ✨ Features

- **⚡ Instant URL Shortening** - Convert long URLs to short, shareable links
- **🎨 Custom Short Codes** - Create personalized short URLs (optional)
- **📊 Real-time Analytics** - Track clicks and view statistics
- **📱 Responsive Design** - Works perfectly on all devices
- **🌙 Modern Dark Theme** - Beautiful, clean interface
- **💾 In-Memory Storage** - Fast, lightweight data storage
- **📋 One-Click Copy** - Easy clipboard integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the backend server:**
   ```bash
   npm run server
   ```

3. **Start the frontend (in a new terminal):**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📖 Usage

1. **Shorten a URL:**
   - Paste your long URL in the input field
   - Optionally add a custom short code
   - Click "Shorten URL"

2. **Share your short URL:**
   - Copy the generated short link
   - Share it anywhere you want

3. **Track Analytics:**
   - View click counts and statistics
   - Monitor your most popular links
   - Export data as JSON

## 🛠️ API Endpoints

- `POST /api/shorten` - Create a short URL
- `GET /api/urls` - Get all URLs
- `GET /api/analytics/:shortCode` - Get URL analytics
- `DELETE /api/urls/:shortCode` - Delete a URL
- `GET /:shortCode` - Redirect to original URL
- `GET /api/health` - Health check

## 🎨 Tech Stack

- **Frontend:** React 19, Vite, Modern CSS
- **Backend:** Express.js, Node.js
- **Storage:** In-memory (Map-based)
- **ID Generation:** nanoid
- **Styling:** CSS Variables, Responsive Design

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── URLShortener.jsx
│   │   ├── URLList.jsx
│   │   └── Stats.jsx
│   ├── App.jsx
│   └── App.css
├── server/
│   └── index.js
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run build` - Build for production
- `npm run start` - Build and start production server
- `npm run lint` - Run ESLint

## 🌟 Features in Detail

### URL Shortening
- Automatic short code generation using nanoid
- Custom short code support with validation
- URL format validation
- Duplicate code prevention

### Analytics & Tracking
- Click counting with timestamps
- User agent and IP tracking
- Export functionality for data analysis
- Real-time statistics dashboard

### User Experience
- One-click copy to clipboard
- Responsive design for all devices
- Loading states and error handling
- Clean, intuitive interface

## 🚀 Deployment

For production deployment:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Configure your web server to serve the built files
3. Set up the backend server with proper environment variables
4. Consider using a persistent database for production use

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Made with ❤️ and React** - A clean, simple URL shortener without the complexity.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
