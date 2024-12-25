# Titan

Easy-to-setup, fully-featured, and customizable NextJS Boilerplate.

## Tech Stack

- [NextJS 15](https://nextjs.org/) - Full-Stack React framework
- [Supabase](https://supabase.com/) - Database
- [Clerk](https://clerk.com/) - Authenticate your Users
- [Stripe](https://stripe.com/) - Collect Payments
- [Plunk](https://useplunk.com/) - Send Emails
- [Umami](https://umami.is/) - Analyze User Behavior

## Prerequisites
- Node.js and pnpm installed (See https://blueprint.codeandcreed.tech/pre-requisites)
- Accounts and API keys for:
  - [Supabase](https://supabase.com/)
  - [Stripe](https://stripe.com/) - if payments.enabled is true
  - [Clerk](https://clerk.com/) - if auth.enabled is true
  - [Plunk](https://useplunk.com/) - if email.enabled is true

## Setup

1. Clone the repository locally and open in Cursor:
   ```
   git clone <repository-url> <your-project-name>
   code -r <your-project-name>
   ```

2. Set Node Version:
   ```
   nvm use
   ```

3. Install Dependencies:
   ```
   pnpm i
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory with the following variables (add only the ones you need based on enabled features):
   ```
   # Required for Supabase
   SUPABASE_URL=<your-supabase-project-url>
   SUPABASE_SERVICE_KEY=<your-supabase-service-key>

   # Required if payments.enabled is true
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
   NEXT_PUBLIC_STRIPE_PRICE_ID=<your-stripe-price-id>

   # Required if auth.enabled is true
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Required if email.enabled is true
   PLUNK_API_KEY=<your-plunk-api-key>
   ```

5. Enable features once you have your accounts and API keys:
   In `config.ts`, set the desired features. The app will validate that you have the required environment variables for each enabled feature:
   ```typescript
   const config = {
     auth: {
       enabled: true, // Requires Clerk API keys
     },
     payments: {
       enabled: true, // Requires Stripe API keys
     },
     email: {
       enabled: true, // Requires Plunk API key
     }
   };
   ```

6. Set up the remote database by running your first database migration:
   ```
   pnpm prisma migrate dev --name add-initial-tables
   ```

7. Start the development server:
   ```
   pnpm dev
   ```

8. Open your browser and navigate to `http://localhost:3000` to see your application running :raised_hands:


## Additional Configuration

- Webhooks: Set up webhooks for Clerk (if using auth) at `/api/auth/webhook` and for Stripe (if using payments) at `/api/payments/webhook`.
- Customize the landing page, dashboard, and other components as needed.
- Modify the Prisma schema in `prisma/schema.prisma` if you need to change the database structure.

## Important Security Notes

- Enable Row Level Security (RLS) in your Supabase project to ensure data protection at the database level.
- Always make Supabase calls on the server-side (in API routes or server components) to keep your service key secure.
- Keep your Plunk API key secure by only using it in server-side code.
- The app validates that all required environment variables are set for enabled features on startup.

## Learn More

Refer to the documentation of the individual technologies used in this project for more detailed information:
- [NextJS Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Plunk Documentation](https://docs.useplunk.com/)
