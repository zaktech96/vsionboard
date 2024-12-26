# Titan

Easy-to-setup, fully-featured, and customizable NextJS Boilerplate.

## Tech Stack

- [NextJS 15](https://nextjs.org/) - Full-Stack React framework
- [Supabase](https://supabase.com/) - Database
- [Clerk](https://clerk.com/) - Authenticate your Users
- [Stripe](https://stripe.com/) - Collect Payments
- [Plunk](https://useplunk.com/) - Send Emails
- [Umami](https://umami.is/) - Analyze User Behavior

## Quick Local Setup

1. Clone the repository locally and open in Cursor:
   ```
   git clone <repository-url> <your-project-name>
   code -r <your-project-name>
   ```

2. In your terminal inside Cursor, run the following commands to set up your own git repository:
   ```
   git remote remove origin
   git remote add origin <your-new-repository-url>
   git branch -M main
   git push -u origin main
   ```

3. Set Node Version:
   ```
   nvm use
   ```

4. Install Dependencies:
   ```
   pnpm i
   ```

5. Start the development server:
   ```
   pnpm dev
   ```

6. Set up ngrok for local development:
   ```
   brew install ngrok  # on macOS
   ngrok http 3000
   ```
   Open your browser and navigate to your ngrok URL (e.g. `https://abc123.ngrok.io`) to see your application running :raised_hands:


## Setup Environment Variables
- Node.js and pnpm installed (See https://blueprint.codeandcreed.tech/pre-requisites)
- Accounts and API keys for:
  - [Supabase](https://supabase.com/)

```
Important: When creating your database password, avoid special characters like # and & as they cause URL encoding issues. Find your connection strings in Supabase Dashboard under Connect > App Frameworks/ORMs
```

  - [Stripe](https://stripe.com/) - if payments.enabled is true

``````
- Install Stripe CLI and run:
```
stripe listen --forward-to <your-ngrok-url>/api/payments/webhook
```
``````

  - [Clerk](https://clerk.com/) - if auth.enabled is true
  - [Plunk](https://useplunk.com/) - if email.enabled is true

1. Copy over the `.env.example` file to `.env` and fill in the values from your accounts above:
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

2. Enable features once you have your accounts and API keys:
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

3. Run your first database migration to create the initial tables in Supabase:
   ```
   pnpm prisma migrate dev --name add-initial-tables
   ```

You're now ready to start customizing the landing page, dashboard, and other components as needed - See [Landing Page Design](https://blueprint.codeandcreed.tech/product-development/landing-page)

See our [MVP Development Guide](https://blueprint.codeandcreed.tech/company-building/mvp-development)

## Future Database Migrations

1) Modify the Prisma schema in `prisma/schema.prisma` when you need to add or change database structure.

2) Run the following command to create a new database migration:
   ```
   pnpm prisma migrate dev --name <your-migration-name>
   ```

3) Push the migration to the remote database:
   ```
   pnpm prisma db push
   ```

## Important Security Notes

- Enable Row Level Security (RLS) in your Supabase project to ensure data protection at the database level.
- Always make Supabase calls on the server-side (in API routes or server components) to keep your service key secure.

## Learn More

Refer to the documentation of the individual technologies used in this project for more detailed information:
- [NextJS Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Plunk Documentation](https://docs.useplunk.com/)
