# Project Overview

## Architecture Overview

### Core Technologies
- **Frontend**: Next.js 15 (React Framework)
- **Backend**: Next.js API Routes + Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Email**: Plunk
- **Analytics**: Umami
- **Deployment**: Vercel

## Key Components

### 1. Authentication Flow
- Clerk handles user authentication
- Webhook integration saves user data to Supabase
- Protected routes in dashboard
- Role-based access control

### 2. Database Structure
- Supabase PostgreSQL database
- Prisma for type-safe database operations
- Automated migrations system
- Row Level Security (RLS) policies

### 3. Payment System
- Stripe integration for subscriptions/payments
- Webhook handling for payment events
- Subscription management dashboard
- Usage tracking and billing

### 4. Email System
- Plunk integration for transactional emails
- Email templates for notifications
- Subscription updates
- Welcome emails

### 5. Dashboard
- Real-time analytics
- User management
- Subscription tracking
- Settings management

## Development Workflow

### Local Development
1. Local Supabase instance via Docker
2. Type-safe database operations with Prisma
3. Hot-reloading development server
4. Local environment configuration

### Database Operations
1. Schema changes via Prisma
2. Automated migration generation
3. Type generation for Supabase
4. Safe production deployments

### Deployment Pipeline
1. GitHub repository
2. Vercel integration
3. Environment variable management
4. Production database management

## Security Features

- Row Level Security (RLS)
- Environment variable protection
- API rate limiting
- Secure webhook handling
- Type-safe operations

## Monitoring & Analytics

- Umami analytics integration
- Error tracking
- Performance monitoring
- User behavior tracking

## Configuration

### Environment Variables
- Authentication keys
- Database credentials
- API keys
- Service configurations

### Feature Flags
- Module enabling/disabling
- Feature toggles
- Environment-specific settings

## Documentation Structure

- `README.md`: Getting started guide
- `DATABASE.md`: Database operations
- `CHANGELOG.md`: Version history
- API documentation
- Component documentation 