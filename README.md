# Next.js Modern Web Application

A modern, full-stack web application built with Next.js 15, React 19, and TypeScript, featuring a beautiful UI powered by Tailwind CSS and Radix UI components.

## Features

- ⚡️ Next.js 15 with App Router
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📱 Fully responsive design
- 🔒 Built-in contact form with email integration
- 🌙 Dark mode support
- 🔥 TypeScript for type safety
- 📦 Modern development workflow with Bun

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20.x or later
- Bun (package manager)
- Docker (for containerized deployment)

## Local Development

### Initial Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your local development settings:
```env
# Email Server Configuration (for local testing)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-specific-password
DEFAULT_FROM="Your App Name <noreply@yourapp.com>"

# Test Endpoint Security (for local testing only)
TEST_EMAIL_API_KEY=your-secure-api-key
```

### Running Locally

1. Start the development server:
```bash
bun dev
```

2. Open your browser to `http://localhost:3000`

3. The app will automatically reload when you make changes to the code

### Local Testing

Test the production build locally:
```bash
# Build the application
bun run build

# Start the production server
bun start
```

### Development Workflow

- **Hot Reload**: Changes to files are automatically reflected in the browser
- **Type Checking**: Run `bun run lint` to check for TypeScript errors
- **Clean Install**: Run `bun run reinstall` to clean and reinstall dependencies

## Production Development

### Environment Variables

Production environment variables must be configured in your deployment platform. Required variables:

```env
# Email Server Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-production-email@example.com
EMAIL_PASS=your-app-specific-password
DEFAULT_FROM="Think Bigg Development <noreply@thinkbigg.com>"

# Node Environment
NODE_ENV=production
```

**Important**: Never include `TEST_EMAIL_API_KEY` in production environments. The test endpoint is automatically disabled in production.

### Building for Production

Create an optimized production build:

```bash
bun run build
```

This will:
- Create optimized bundles
- Generate static pages
- Prepare the application for deployment

### Testing Production Build Locally

```bash
# Build the application
bun run build

# Start the production server
bun start
```

Access at `http://localhost:3000` to verify the production build works correctly.

## Deployment

### Digital Ocean App Platform

The application is deployed on Digital Ocean App Platform, which provides automatic builds, scaling, and SSL certificates.

#### Initial Setup

1. **Connect Your Repository**:
   - Log in to [Digital Ocean](https://cloud.digitalocean.com/)
   - Navigate to Apps → Create App
   - Connect your GitHub/GitLab repository
   - Select the branch to deploy (typically `main`)

2. **Configure Build Settings**:
   - **Build Command**: `bun run build`
   - **Run Command**: `bun start`
   - **HTTP Port**: `3000`
   - **Environment**: Select `Node.js`

3. **Set Environment Variables**:
   - In the App Platform dashboard, go to Settings → App-Level Environment Variables
   - Add all required production environment variables (see above)
   - Encrypt sensitive values like `EMAIL_PASS`

4. **Configure Resources**:
   - Choose your plan (Basic or Professional)
   - Select your datacenter region
   - Configure auto-scaling if needed

#### Deployment Workflow

Digital Ocean App Platform supports automatic deployments:

1. **Automatic Deployment**:
   - Push changes to your configured branch
   - Digital Ocean automatically detects changes
   - Build process starts automatically
   - Application deploys on successful build

2. **Manual Deployment**:
   - Navigate to your app in the Digital Ocean dashboard
   - Click "Actions" → "Force Rebuild and Deploy"
   - Monitor build logs in real-time

#### Monitoring and Logs

- **View Logs**: Apps → Your App → Runtime Logs
- **Build Logs**: Apps → Your App → Deployments → View Build Logs
- **Metrics**: Apps → Your App → Insights (CPU, Memory, Bandwidth)

#### Custom Domain

1. Add your custom domain in App Platform settings
2. Update DNS records as instructed by Digital Ocean
3. SSL certificate is automatically provisioned and renewed

### Docker Deployment (Alternative)

If deploying to a custom infrastructure:

1. **Build the Docker image**:
```bash
docker build -t thinkbigg-nextjs .
```

2. **Run the container**:
```bash
docker run -p 3000:3000 \
  -e EMAIL_HOST=smtp.gmail.com \
  -e EMAIL_PORT=465 \
  -e EMAIL_SECURE=true \
  -e EMAIL_USER=your-email@example.com \
  -e EMAIL_PASS=your-password \
  -e DEFAULT_FROM="Your App <noreply@yourapp.com>" \
  thinkbigg-nextjs
```

3. **Push to a registry** (if needed):
```bash
docker tag thinkbigg-nextjs:latest your-registry/thinkbigg-nextjs:latest
docker push your-registry/thinkbigg-nextjs:latest
```

## Contact Form Setup

To enable the contact form functionality:

1. Ensure you've copied `.env.local.example` to `.env.local`
2. Update the email configuration in `.env.local` with your email server details:
   ```env
   EMAIL_HOST=smtp.gmail.com  # or your SMTP server
   EMAIL_PORT=465            # 465 for secure, 587 for TLS
   EMAIL_SECURE=true        # true for 465, false for 587
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-app-specific-password
   DEFAULT_FROM="Your App Name <noreply@yourapp.com>"
   ```
3. If using Gmail, follow the Gmail Setup instructions in the Email Configuration section below
4. The contact form will be automatically enabled once the environment variables are set

## Development Notes

- The application uses Next.js App Router for routing
- Styling is handled through Tailwind CSS with custom configurations
- Components are built using Radix UI primitives for accessibility
- TypeScript is configured for type safety
- ESLint and Prettier are set up for code quality

## Project Structure

```
├── app/                # Next.js app directory
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── public/            # Static assets
├── styles/            # Global styles and Tailwind configurations
└── types/             # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Todo

- Implement blog functionality (currently blocked by redirect issues)
- Add more interactive components
- Enhance testing coverage

## Email Configuration

The application uses Nodemailer for sending emails, with a secure test endpoint for verification.

### Environment Variables

Required variables in `.env.local`:
```env
# Email Server Configuration
EMAIL_HOST=smtp.gmail.com  # or your SMTP server
EMAIL_PORT=465            # 465 for secure, 587 for TLS
EMAIL_SECURE=true        # true for 465, false for 587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-specific-password
DEFAULT_FROM="Your App Name <noreply@yourapp.com>"

# Test Endpoint Security
TEST_EMAIL_API_KEY=your-secure-api-key  # Required for test endpoint
```

### Gmail Setup
If using Gmail (recommended for development):
1. Enable 2-Step Verification in your Google Account
2. Generate an App Password:
   - Go to Google Account Settings → Security
   - Under "2-Step Verification", click on "App passwords"
   - Select "Mail" and your device
   - Use the generated 16-character password as `EMAIL_PASS`

### Test Endpoint

A secure endpoint is available for verifying email functionality:

- **URL**: `/api/test-email`
- **Method**: GET
- **Headers Required**: 
  ```
  x-api-key: your-test-email-api-key
  ```
- **Security Features**:
  - Development environment only
  - API key authentication
  - Rate limited (1 request/minute)
  - Sends only to configured `EMAIL_USER`
  - No sensitive data in test emails

Example test request:
```bash
curl http://localhost:3000/api/test-email \
  -H "x-api-key: your-test-email-api-key"
```

### Implementation Details

- Email service: `lib/email.ts`
  - Handles SMTP communication via Nodemailer
  - Includes error handling and response formatting
- Test endpoint: `app/api/test-email/route.ts`
  - Verifies email configuration
  - Provides detailed error messages
  - Includes rate limiting

### Security Best Practices

1. Never commit `.env.local` to version control
2. Generate a secure random API key:
   ```bash
   openssl rand -hex 32
   ```
3. Test endpoint automatically disabled in production
4. Use environment-specific email configurations
5. Store sensitive credentials in environment variables only

