# SpotIt - Download and Run Guide

## Quick Start (5 minutes)

### 1. Download the App

Click the **three dots (⋯)** in the top right corner of the Code Project and select **"Download ZIP"**

Or push to GitHub:
- Click the **GitHub icon** in the top right
- Connect your GitHub account
- Your code will be pushed automatically

### 2. Extract and Navigate

\`\`\`bash
# Extract the ZIP file
unzip spotit-citizen-tracker.zip
cd spotit-citizen-tracker
\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Setup MongoDB

**Option A: Local MongoDB (Easiest for Development)**

\`\`\`bash
# macOS (with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download from: https://www.mongodb.com/try/download/community
# Run the installer and follow prompts

# Linux (Ubuntu)
sudo apt-get install -y mongodb
sudo systemctl start mongodb
\`\`\`

**Option B: MongoDB Atlas (Cloud - No Installation)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env.local` with your connection string

### 5. Configure Environment

Create `.env.local` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/spotit
JWT_SECRET=your_secret_key_here_change_in_production
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

### 6. Run the App

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000 in your browser

## What's Included

### Pages
- **Home** (`/`) - Landing page with recent issues
- **Report Issue** (`/report`) - Submit new civic complaints
- **Track Complaint** (`/track`) - Search and track issues by ID
- **Dashboard** (`/dashboard`) - View all issues with statistics
- **Leaderboard** (`/leaderboard`) - Top contributors
- **Chatbot** (`/chatbot`) - AI assistant for queries
- **Notifications** (`/notifications`) - Issue updates
- **Admin** (`/admin`) - Manage issues and users

### Features
- Issue reporting with photos
- Real-time status tracking
- Gamification (points and leaderboard)
- Multi-language support (5 languages)
- Admin dashboard
- Complaint ID generation
- Issue categorization
- Authority routing

### API Endpoints

**Authentication**
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

**Issues**
- `GET /api/issues` - Get all issues
- `POST /api/issues` - Create issue
- `GET /api/issues/[id]` - Get issue details
- `PATCH /api/issues/[id]` - Update issue
- `POST /api/issues/[id]/comments` - Add comment

**Leaderboard**
- `GET /api/leaderboard` - Get top contributors

## Testing the App

### Test 1: Report an Issue

1. Go to http://localhost:3000/report
2. Fill in the form:
   - Title: "Broken Street Light"
   - Category: "Lighting"
   - Description: "Street light on Main St is broken"
   - Location: "Main Street, Downtown"
   - Email: "test@example.com"
3. Click "Submit Report"
4. Save the Complaint ID

### Test 2: Track the Issue

1. Go to http://localhost:3000/track
2. Enter the Complaint ID from Test 1
3. View the issue status

### Test 3: View Dashboard

1. Go to http://localhost:3000/dashboard
2. See all reported issues
3. Filter by status

### Test 4: Check Leaderboard

1. Go to http://localhost:3000/leaderboard
2. See top contributors

### Test 5: Admin Dashboard

1. Go to http://localhost:3000/admin
2. View all issues
3. Update issue status

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check MongoDB is running: `mongosh` (or `mongo` for older versions)
2. Verify `MONGODB_URI` in `.env.local`
3. For MongoDB Atlas, whitelist your IP address

### Issue: "Port 3000 already in use"

**Solution:**
\`\`\`bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

### Issue: "Module not found" errors

**Solution:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Issue: "API returns 404"

**Solution:**
1. Ensure development server is running
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify API routes exist in `app/api/` directory

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong random string
6. Click "Deploy"

### Deploy to Railway

1. Go to https://railway.app
2. Create new project
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Deploy to Heroku

\`\`\`bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main
\`\`\`

## Project Structure

\`\`\`
spotit-citizen-tracker/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── issues/            # Issue management endpoints
│   │   └── leaderboard/       # Leaderboard endpoint
│   ├── page.tsx               # Home page
│   ├── report/                # Report issue page
│   ├── track/                 # Track complaint page
│   ├── dashboard/             # Dashboard page
│   ├── leaderboard/           # Leaderboard page
│   ├── chatbot/               # Chatbot page
│   ├── admin/                 # Admin dashboard
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # UI components
│   ├── report-form.tsx        # Report form component
│   ├── track-form.tsx         # Track form component
│   ├── dashboard-content.tsx  # Dashboard component
│   ├── leaderboard-view.tsx   # Leaderboard component
│   └── ...
├── lib/
│   ├── db.ts                  # Database connection
│   ├── models/                # Mongoose models
│   ├── api-client.ts          # API client utility
│   └── i18n.ts                # Internationalization
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── package.json               # Dependencies
└── README.md                  # Documentation
\`\`\`

## Next Steps

1. **Customize Branding**: Update colors and logo in `app/globals.css`
2. **Add Email Notifications**: Integrate SendGrid or Mailgun
3. **Enable Image Uploads**: Connect Cloudinary
4. **Add Maps**: Integrate Google Maps API
5. **Mobile App**: Build React Native version
6. **Analytics**: Add Google Analytics or Mixpanel

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments
3. Check MongoDB documentation
4. Visit Next.js documentation at https://nextjs.org/docs

## License

MIT License - Feel free to use this project for personal or commercial purposes.
