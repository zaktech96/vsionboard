# Titan

Easy-to-setup, fully-featured, and customizable NextJS Boilerplate.

## Tech Stack

- [NextJS 15](https://nextjs.org/) - Full-Stack React framework
- [Supabase](https://supabase.com/) - Database
- [Clerk](https://clerk.com/) - Authenticate your Users
- [Stripe](https://stripe.com/) - Collect Payments
- [Plunk](https://useplunk.com/) - Send Emails
- [Umami](https://umami.is/) - Analyze User Behavior
- [Vercel](https://vercel.com/) - Deployments

## 1. Prerequisites

Some React + NextJS knowledge is assumed (just the basics is sufficient to get started).

1. Install [nvm](https://github.com/nvm-sh/nvm)
2. Install Node.js LTS version 22 using nvm:
   ```bash
   nvm install 22 --lts
   ```

3. Gather your API keys from the following services:

   - **Supabase** (Database)
     - Create account at [Supabase](https://supabase.com)
     - Create a new project
     - Note: When creating your database password, avoid special characters like '#' and '&' as they cause URL encoding issues
     - Copy your `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` from the 'Connect' modal on the main Project Dashboard page (click on the 'Connect' button) and under 'App Frameworks'
     - Copy your `DATABASE_URL` and `DIRECT_URL` from the same 'Connect' modal under the 'ORMs' tab

   - **Clerk** (Authentication)
     - Create account at [Clerk](https://clerk.com)
     - Create a new Application
     - Copy your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` from the 'API Keys' section

   - **Stripe** (Payments)
     - Create account at [Stripe](https://stripe.com)
     - Copy your `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` from the 'API Keys' section
     - Create a product and get your `NEXT_PUBLIC_STRIPE_PRICE_ID`

   - **Plunk** (Email)
     - Create account at [Plunk](https://useplunk.com)
     - Copy your `PLUNK_API_KEY` from Project Settings > API Keys

## 2. Setup via CLI

1. Once you have your keys ready, create your project locally by running:
   ```bash
   npx @codeandcreed/create-titan@latest my-app
   ```

2. Follow the prompts to configure your project with the API keys you've gathered (from the previous section).

Done. Your project is now ready to start developing locally.

3. Run the project:
   ```bash
   pnpm i
   pnpm dev
   ```

## 3. Developing your app locally

### Setup ngrok

1. Install ngrok
2. Run `ngrok http http://localhost:3000`
3. Copy the ngrok URL.
4. Update the FRONTEND_URL environment variable in your `.env` file to the ngrok URL.

### Setup Clerk Webhook to Save Users to your Database
1. Create a webhook in your Clerk Application
2. Set the webhook URL to `[your-ngrok-url]/api/webhooks/clerk`
3. Set the events to `user.created` and `user.updated`

### Setup Stripe Webhook to Test Payments

1. Install the Stripe CLI
2. Run `stripe login`
3. Run `stripe listen --forward-to [your-ngrok-url]/api/webhooks/stripe`
4. Done. Your site should now be able to receive webhooks from Stripe and you can test the payment flow locally.

## Database Migrations (Optional - can do this later)

If you need to update the Database Schema (to create new tables, columns, etc. specific to your app idea)

1. Modify the database schema in `prisma/schema.prisma`
2. Generate a new migration:
   ```bash
   pnpm prisma migrate dev --name <migration-name>
   ```
3. Deploy the changes to your database:
   ```bash
   pnpm prisma migrate deploy
   ```

## 4. Updating the UI

When you initally clone the project, the UI is a basic UI for Titan itself.

But it's upto you to rip everything out and replace with your own designs. Likewise for the Dashboard.

The following guides will help you customise the entire application UI to your liking:

- [Landing Page Design](https://blueprint.codeandcreed.tech/product-development/landing-page)
- [Rapid UI Prototyping](https://blueprint.codeandcreed.tech/product-development/rapid-ui-prototyping)

Use Cursor to guide you efficiently through the process, add new features, fix bugs etc. See [Efficency](https://blueprint.codeandcreed.tech/product-development/efficiency)

## 5. Deploying the App to Production

1. Create a new repository on Github
2. Push all your changes to the new repository
4. Create a Production Instance of your Clerk Application
   1. Copy your Production API Keys
   2. Copy your Production Webhook URL (Setup exactly as you did for the test mode)
5. Untoggle the test mode on your Stripe account (to use your production Stripe account)
   1. Create a new product in your production Stripe account (or copy over your test mode product)
   2. Copy your Production API Keys (PUBLIC and SECRET)
   3. Copy your Production Price ID
6. Set all your environment variables in Vercel
7. Deploy your site to Vercel with all the above Production Environment Variables

Done. Your site is now live and ready to use. Users can now sign up, login, and pay for your product.

## 5. Setup Analytics

Track your site visitors and get insights on how they interact with your site.

1. Create an account at [Umami](https://umami.is/)
2. Copy the Tracking code and paste it into the head of your `index.html` file
3. Deploy your site
4. Done. Real-time traffic data should now be being tracked.

## Learn More

Refer to the documentation of the individual technologies:
- [NextJS Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Plunk Documentation](https://docs.useplunk.com/)

## Contributing

Any beneficial contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

