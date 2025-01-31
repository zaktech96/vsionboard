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

## Local Development

### Starting Your Local Database
```bash
# Start your personal copy of the database
supabase start

# When you're done working
supabase stop

# If you want to start fresh (DELETES ALL LOCAL DATA)
supabase db reset
```

### Making Database Changes

#### The Safe Way to Make Changes
1. **Start with your local database**
   ```bash
   # Make sure you're working with latest changes
   git pull origin main
   
   # Start your local database if not running
   supabase start
   ```

2. **Update your database design**
   - Edit `prisma/schema.prisma` file
   - This file defines your tables and columns

3. **Apply your changes locally**
   ```bash
   # Create and apply a Prisma migration
   npx prisma migrate dev --name what_you_changed
   
   # Example: 
   npx prisma migrate dev --name add_user_profile
   
   # After migration, update Supabase types
   supabase gen types typescript --local > types/supabase.ts
   ```

4. **Test your changes**
   - Use the local Supabase Studio (http://localhost:54323)
   - Add test data
   - Verify app functionality

5. **When ready for production**
   ```bash
   # First backup production (safety first!)
   supabase db dump --project-ref your-project-ref -f backup.sql
   
   # Apply migrations to production
   prisma migrate deploy
   
   # Update production types
   supabase gen types typescript --project-ref your-project-ref > types/supabase.ts
   ```

### Viewing Your Changes
```bash
# See what changes you've made
supabase db diff

# Save current database state
supabase db dump --local -f my_schema.sql
```

## Common Scenarios

### "Help! I Messed Up My Local Database!"
No worries! You can reset everything:
```bash
# Option 1: Full reset
supabase db reset

# Option 2: Reset and recreate from Prisma schema
supabase db reset
npx prisma migrate reset --force
npx prisma migrate dev
supabase gen types typescript --local > types/supabase.ts
```

### "I Need to Start Fresh"
```bash
# Stop everything
supabase stop

# Start fresh
supabase start
npx prisma migrate reset --force
```

### "Another Developer Made Changes"
```bash
# Get their changes
git pull origin main

# Reset and apply all migrations
supabase db reset
npx prisma migrate dev
supabase gen types typescript --local > types/supabase.ts
```

## Best Practices

1. **Always Work Locally First**
   - Test all schema changes in your local database
   - Use `prisma migrate dev` for development
   - Use `prisma migrate deploy` for production

2. **Keep Types in Sync**
   ```bash
   # After any schema change:
   supabase gen types typescript --local > types/supabase.ts
   ```

3. **Backup Before Changes**
   ```bash
   # Local backup
   supabase db dump --local -f pre_change_backup.sql
   
   # Production backup
   supabase db dump --project-ref your-project-ref -f prod_backup.sql
   ```

4. **Use Clear Migration Names**
   ```bash
   # Good examples:
   npx prisma migrate dev --name add_user_profile
   npx prisma migrate dev --name create_booking_table
   npx prisma migrate dev --name update_payment_fields
   ```

5. **Document Major Changes**
   - Comment your schema changes
   - Update API documentation if needed
   - Notify team members of breaking changes

6. **Handle Errors Gracefully**
   - If a migration fails, don't panic
   - Check the error message
   - Use `supabase db reset` if needed
   - Ask for help if unsure
``` 