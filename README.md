# 📝 Blog Application - Full Stack MERN Project

A modern, feature-rich blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides a complete blogging experience with user authentication, admin panel, AI-powered content generation, and rich text editing capabilities.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen)
![React](https://img.shields.io/badge/React-v19+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## 🌟 Features

### User Features
- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- ✍️ **Rich Text Editor** - Write blogs with TipTap editor and syntax highlighting
- 💖 **Like System** - Like/unlike blog posts
- 💬 **Comment System** - Comment on blog posts and engage with content
- 📱 **Responsive Design** - Fully responsive UI built with Tailwind CSS
- 🔍 **Blog Discovery** - Browse blogs by categories and search
- 👤 **User Profile** - Manage personal profile and view published blogs
- 📧 **Contact Form** - Get in touch with admin
- 📰 **Newsletter Subscription** - Stay updated with latest posts

### Admin Features
- 📊 **Admin Dashboard** - Overview of blogs, users, and comments
- ➕ **Create/Edit Blogs** - Add and manage blog posts with rich content
- 🖼️ **Image Management** - Upload images with ImageKit integration
- 🤖 **AI Content Generation** - Generate blog content using Google Gemini AI
- 📝 **Blog Management** - Publish/unpublish, edit, and delete blogs
- 💬 **Comment Moderation** - Review and manage user comments
- 👥 **User Management** - View and manage registered users
- 📈 **Analytics** - Track blog performance and engagement

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **TipTap** - Headless rich text editor
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Beautiful icons
- **Highlight.js** - Syntax highlighting for code blocks
- **Marked** - Markdown parser

### Backend
- **Node.js** - Runtime environment
- **Express.js v5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Google Gemini AI** - AI content generation
- **ImageKit** - Image upload and optimization
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Installation & Setup

Follow these steps to set up the project locally:

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd Blog_App
```

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Directory
```bash
cd backend
```

#### 2.2 Install Dependencies
```bash
npm install
```

#### 2.3 Create Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=8080

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Admin Credentials (for initial admin setup)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

#### 2.4 Configure MongoDB
- **Option 1 (Local):** Install MongoDB locally and use `mongodb://localhost:27017/blog_app`
- **Option 2 (Cloud):** Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and use the connection string

#### 2.5 Get API Keys

**Google Gemini AI:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

**ImageKit:**
1. Sign up at [ImageKit.io](https://imagekit.io/)
2. Get your Public Key, Private Key, and URL Endpoint from Dashboard
3. Add them to your `.env` file

#### 2.6 Start Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

The backend server will start on `http://localhost:8080`

### Step 3: Frontend Setup

#### 3.1 Navigate to Frontend Directory
Open a new terminal window and run:
```bash
cd frontend
```

#### 3.2 Install Dependencies
```bash
npm install
```

#### 3.3 Create Environment Variables
Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:8080
```

#### 3.4 Start Frontend Development Server
```bash
npm run dev
```

The frontend application will start on `http://localhost:5173`

### Step 4: Access the Application

1. **User Interface:** Open `http://localhost:5173` in your browser
2. **Backend API:** Backend runs on `http://localhost:8080`

## 👤 Default Admin Access

After setting up the backend, you'll need to create an admin user. You can either:

1. **Manual Creation:** Use MongoDB Compass or CLI to create an admin user document
2. **Registration:** Register a new user and manually update the database to set `isAdmin: true`
3. **Seed Script:** Create a seed script to initialize admin user (recommended)

## 📁 Project Structure

```
Blog_App/
├── backend/                    # Backend Node.js application
│   ├── config/                # Configuration files
│   │   ├── db.js             # MongoDB connection
│   │   ├── gemini.js         # Google Gemini AI configuration
│   │   └── imageKit.js       # ImageKit configuration
│   ├── controllers/           # Request handlers
│   │   ├── admin.controller.js
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middleware/            # Custom middleware
│   │   ├── adminAuth.js      # Admin authentication
│   │   ├── userAuth.js       # User authentication
│   │   ├── demoCheck.js      # Demo mode protection
│   │   └── multer.js         # File upload handling
│   ├── models/                # Database models
│   │   ├── Blog.js
│   │   ├── Comment.js
│   │   ├── Contact.js
│   │   └── User.js
│   ├── routes/                # API routes
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── package.json
│   └── server.js             # Entry point
│
└── frontend/                  # Frontend React application
    ├── public/               # Static assets
    ├── src/
    │   ├── assets/           # Images, styles
    │   ├── components/       # Reusable components
    │   │   ├── admin/       # Admin-specific components
    │   │   ├── BlogCard.jsx
    │   │   ├── BlogList.jsx
    │   │   ├── ContactForm.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── HomeBlogs.jsx
    │   │   ├── Loader.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── NewsLetter.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── context/          # React Context
    │   │   └── AppContext.jsx
    │   ├── layouts/          # Layout components
    │   │   ├── AdminLayout.jsx
    │   │   └── UserLayout.jsx
    │   ├── pages/            # Page components
    │   │   ├── admin/       # Admin pages
    │   │   │   ├── AddBlog.jsx
    │   │   │   ├── AllUserList.jsx
    │   │   │   ├── Comments.jsx
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── ListBlog.jsx
    │   │   │   └── Sidebar.jsx
    │   │   ├── About.jsx
    │   │   ├── Blog.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Page404.jsx
    │   │   ├── Registration.jsx
    │   │   └── UserProfile.jsx
    │   ├── types/            # TypeScript declarations
    │   ├── App.jsx           # Main App component
    │   ├── index.css         # Global styles
    │   └── main.jsx          # Entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User/Admin login

### User Routes (`/api/user`)
- `GET /blogs` - Get all published blogs
- `GET /blog/:id` - Get single blog
- `POST /blog/:id/like` - Like/unlike blog
- `POST /blog/:id/comment` - Add comment
- `GET /profile` - Get user profile
- `POST /contact` - Submit contact form

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Get dashboard statistics
- `POST /blog` - Create new blog
- `PUT /blog/:id` - Update blog
- `DELETE /blog/:id` - Delete blog
- `POST /blog/:id/publish` - Publish/unpublish blog
- `GET /comments` - Get all comments
- `DELETE /comment/:id` - Delete comment
- `GET /users` - Get all users
- `POST /generate-content` - Generate AI content

## 🎨 Key Features Explanation

### Rich Text Editor
The application uses TipTap editor with the following features:
- Bold, italic, underline, strikethrough
- Headings (H1-H6)
- Bullet and numbered lists
- Code blocks with syntax highlighting
- Links and images
- Markdown support

### AI Content Generation
Admin can use Google Gemini AI to:
- Generate blog content based on topics
- Create engaging titles and descriptions
- Suggest relevant tags and categories

### Image Management
Uses ImageKit for:
- Image upload and storage
- Automatic optimization
- Responsive image delivery
- CDN-based fast loading

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for secure password storage
- **Protected Routes** - Middleware for route protection
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Sanitized user inputs
- **Demo Mode Protection** - Prevent modifications in demo mode

## 🧪 Testing

To test the application:

1. **Register a new user** from the registration page
2. **Login** with your credentials
3. **Browse blogs** on the homepage
4. **Read and interact** with blog posts (like, comment)
5. **Access admin panel** (if you have admin privileges)
6. **Create new blogs** using the rich text editor
7. **Try AI content generation** for blog ideas

## 📦 Build for Production

### Backend
```bash
cd backend
# The backend runs directly with Node.js
node server.js
```

### Frontend
```bash
cd frontend
npm run build
```

The build files will be created in the `frontend/dist` directory.

## 🚀 Deployment

### Backend Deployment (Railway, Render, Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel, Netlify)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy

### Database Deployment
- Use MongoDB Atlas for production database
- Update `MONGODB_URI` in backend environment variables

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify `.env` variables are correct
- Ensure port 8080 is not in use

**Frontend won't connect to backend:**
- Verify `VITE_BACKEND_URL` in frontend `.env`
- Check if backend server is running
- Check CORS configuration

**Images not uploading:**
- Verify ImageKit credentials
- Check file size limits
- Ensure multer is configured correctly

**AI content not generating:**
- Verify Gemini API key is valid
- Check API quota limits
- Ensure internet connection is stable

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Nitai Dalal**

## 🙏 Acknowledgments

- Google Gemini AI for content generation
- ImageKit for image management
- TipTap for rich text editing
- The MERN stack community

## 📞 Support

For support, email dalalnitai7@gmail.com or create an issue in the repository.

---
