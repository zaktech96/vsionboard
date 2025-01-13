# Database Operations Guide

## Understanding Local vs Production

### What's the Difference?
- **Local Database**: Think of this as your personal "sandbox" copy of the database that runs on your computer
  - ✅ Safe to experiment with
  - ✅ Changes only affect your machine
  - ✅ Can be reset easily
  - ✅ Perfect for testing new features
  - ❌ Not accessible to real users

- **Production Database**: This is the "real" database that your live app uses
  - ✅ Used by real users
  - ✅ Contains real data
  - ❌ Changes affect everyone
  - ❌ Mistakes can be costly
  - ❌ Can't easily be reset

### The Development Flow
1. Make changes locally first (safe to experiment)
2. Test thoroughly on your machine
3. When everything works, apply changes to production

Think of it like having a practice kitchen (local) where you can experiment with recipes before cooking in the real restaurant kitchen (production).

## Local Development

### Starting Your Local Database
```bash
# Start your personal copy of the database
supabase start

# When you're done working
supabase stop

# If you want to start fresh (DELETES ALL LOCAL DATA)
supabase stop --no-backup
```

### Making Database Changes

#### The Safe Way to Make Changes
1. **Always start with your local database**
   ```bash
   # Make sure you're working with latest changes
   git pull origin main
   
   # Start your local database
   supabase start
   ```

2. **Update your database design**
   - Edit `prisma/schema.prisma` file
   - This file defines what tables and columns your database has

3. **Apply your changes locally**
   ```bash
   # Create a migration (a record of your changes)
   prisma migrate dev --name what_you_changed
   
   # Example: 
   prisma migrate dev --name add_user_profile
   ```

4. **Test your changes**
   - Use the local Supabase Studio (http://127.0.0.1:54323)
   - Add some test data either manually or with your new feature
   - Make sure your app works with the changes

5. **When everything works locally, update production**
   ```bash
   # First backup production (safety first!)
   supabase db dump --project-ref your-project-ref -f backup.sql
   
   # Apply your changes to production
   prisma migrate deploy
   ```

### Viewing Your Changes
```bash
# See what changes you've made
supabase db diff

# Save current database state
supabase db dump --local -f my_schema.sql

# Just save the data
supabase db dump --local --data-only > my_data.sql
```

### Keeping Types Updated
After database changes, update your TypeScript types:
```bash
# Update types for better code completion
**supabase gen types typescript --local > types/supabase.ts**
```

## Production Operations

### Connecting to Production
```bash
# Link to your production database (one-time setup)
supabase link --project-ref your-project-ref

# See what projects you have
supabase projects list
```

### Safe Production Changes
ALWAYS follow these steps:

1. **Backup First**
   ```bash
   # Create a backup before any changes
   supabase db dump --project-ref your-project-ref -f backup.sql
   ```

2. **Double Check Changes**
   ```bash
   # See what's different between local and production
   supabase db diff
   ```

3. **Apply Changes**
   ```bash
   # Apply your tested local changes to production
   prisma migrate deploy
   ```

## Common Scenarios

### "Help! I Messed Up My Local Database!"
No worries! Your local database can be easily reset:
```bash
# Stop and reset everything
supabase stop --no-backup
supabase start
```

### "I Need to Start Fresh"
```bash
# Reset local database to a clean state
prisma migrate reset --force
```

### "I Want to Add a New Feature"
1. Start local database: `supabase start`
2. Edit `prisma/schema.prisma`
3. Create migration: `prisma migrate dev --name feature_name`
4. Test locally
5. When ready: `prisma migrate deploy` to production

### "Another Developer Made Changes"
```bash
# Get their changes
git pull origin main

# Update your local database
prisma migrate deploy

# Generate fresh types
prisma generate
supabase gen types typescript --local > types/supabase.ts
```

## Best Practices

1. **Never Skip Local Testing**
   - Always test changes locally first
   - Use test data to verify everything works
   - Only deploy to production when confident

2. **Always Backup Before Changes**
   ```bash
   # Local backup
   supabase db dump --local -f pre_change_backup.sql
   
   # Production backup
   supabase db dump --project-ref your-project-ref -f prod_backup.sql
   ```

3. **Keep Your Team Updated**
   - Commit migration files
   - Document major changes
   - Let others know when you change production

4. **When in Doubt, Ask**
   - Database changes can be tricky
   - Better to ask questions than fix mistakes
   - Use the team's experience
``` 