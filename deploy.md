# Railway Deployment Guide

## 🚀 Deploy Your Snowball Game to Railway

### Prerequisites
- GitHub account
- Railway account (sign up at railway.app)

### Steps to Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Docker support for Railway deployment"
   git push origin main
   ```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your SnowballGame repository
   - Railway will automatically detect the Dockerfile and deploy

3. **Environment Variables**
   - Railway will automatically set `PORT` environment variable
   - No additional configuration needed

4. **Access Your Game**
   - Railway will provide a URL like `https://your-app-name.railway.app`
   - Your game will be accessible at this URL

### Features Included
- ✅ Docker containerization
- ✅ Health check endpoint
- ✅ Production optimizations
- ✅ Railway configuration
- ✅ Automatic port binding
- ✅ Security best practices

### Local Testing
```bash
# Build the Docker image
docker build -t snowball-game .

# Run locally
docker run -p 5000:5000 snowball-game

# Test health endpoint
curl http://localhost:5000/health
```

### Troubleshooting
- Check Railway logs if deployment fails
- Ensure all dependencies are in package.json
- Verify Dockerfile syntax
- Test locally before deploying
