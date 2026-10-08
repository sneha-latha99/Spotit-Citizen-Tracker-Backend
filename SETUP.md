# SpotIt Setup Guide

## Complete Setup Instructions

### Step 1: Prerequisites

Ensure you have the following installed:
- Node.js 18 or higher
- npm or yarn
- MongoDB (local or cloud)

### Step 2: Clone and Install

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd spotit

# Install dependencies
npm install
\`\`\`

### Step 3: Database Setup

#### Option A: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com/try/download/community](https://mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: `mongod`
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

#### Option B: MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env.local`

### Step 4: Environment Configuration

Create `.env.local` in the root directory:

\`\`\`env
# Database
MONGODB_URI=mongodb://localhost:27017/spotit

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

### Step 5: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

### Step 6: Access the Application

- **Home**: http://localhost:3000
- **Report Issue**: http://localhost:3000/report
- **Track Complaint**: http://localhost:3000/track
- **Dashboard**: http://localhost:3000/dashboard
- **Leaderboard**: http://localhost:3000/leaderboard
- **Chatbot**: http://localhost:3000/chatbot
- **Admin**: http://localhost:3000/admin

## Testing the Application

### Test User Signup

1. Go to `/report` page
2. Fill in the form with:
   - Title: "Pothole on Main Street"
   - Category: "Road"
   - Description: "Large pothole causing traffic issues"
   - Location: "Main Street, Downtown"
   - Email: "test@example.com"
3. Click "Submit Report"
4. Save the complaint ID

### Test Tracking

1. Go to `/track` page
2. Enter the complaint ID from above
3. View the issue status

### Test Leaderboard

1. Go to `/leaderboard` page
2. View top contributors

### Test Admin Dashboard

1. Go to `/admin` page
2. View all issues
3. Update issue status

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
1. Ensure MongoDB is running
2. Check `MONGODB_URI` in `.env.local`
3. For MongoDB Atlas, ensure IP whitelist includes your IP

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
\`\`\`bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

### API Not Found

**Error**: `404 Not Found` when calling API

**Solution**:
1. Ensure `NEXT_PUBLIC_API_URL` is correct
2. Check that API routes are in `app/api/` directory
3. Restart development server

## Production Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong random string
5. Deploy

### Deploy to Other Platforms

For Heroku, Railway, or other platforms:

1. Build the app: `npm run build`
2. Start the app: `npm start`
3. Set environment variables in platform dashboard
4. Deploy

## Performance Optimization

### Enable Caching

Add to `next.config.js`:
\`\`\`javascript
module.exports = {
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=120'
          }
        ]
      }
    ]
  }
}
\`\`\`

### Database Indexing

MongoDB indexes are automatically created by Mongoose schemas.

## Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use HTTPS in production
- [ ] Enable MongoDB authentication
- [ ] Set up rate limiting
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Regular security updates

## Next Steps

1. Customize branding and colors
2. Add email notifications
3. Integrate with government APIs
4. Set up analytics
5. Create mobile app
