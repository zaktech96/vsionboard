# Database Operations Guide

## Local Development

### Starting/Stopping Local Instance
```bash
# Start local Supabase
supabase start

# Stop local Supabase (preserves data)
supabase stop

# Stop and reset local database
supabase stop --no-backup
```

### Database Migrations

#### Creating Migrations
1. Update your `prisma/schema.prisma` file with your changes
2. Generate and apply migration:
```bash
# Create a new migration
prisma migrate dev --name your_migration_name

# Apply pending migrations
prisma migrate deploy
```

#### Working with Local Database
```bash
# Get current database schema
supabase db dump --local -f schema.sql

# Backup data only
supabase db dump --local --data-only > backup.sql

# Reset local database (CAUTION: Deletes all data)
supabase db reset

# View database changes
supabase db diff -f changes.sql
```

### Type Generation
```bash
# Generate types from local database
supabase gen types typescript --local > types/supabase.ts

# Generate types from production
supabase gen types typescript --project-id your-project-id > types/supabase.ts
```

## Production Operations

### Linking Production Project
```bash
# Link to existing project
supabase link --project-ref your-project-ref

# Get project details
supabase projects list
```

### Database Changes
```bash
# Push local schema to production (CAREFUL!)
supabase db push

# Pull production schema locally
supabase db pull

# View differences between local and production
supabase db diff
```

### Backup & Restore
```bash
# Backup production database
supabase db dump --project-ref your-project-ref -f backup.sql

# Restore from backup (CAREFUL!)
supabase db restore --project-ref your-project-ref backup.sql
```

## Best Practices

1. **Always Backup Before Changes**
   ```bash
   # Local backup
   supabase db dump --local -f pre_change_backup.sql
   
   # Production backup
   supabase db dump --project-ref your-project-ref -f prod_backup.sql
   ```

2. **Test Migrations Locally First**
   - Always test schema changes on local instance
   - Verify data integrity after migrations
   - Use `supabase db diff` to review changes

3. **Production Safeguards**
   - Schedule maintenance windows for production changes
   - Always have recent backups before changes
   - Test restoration process periodically

4. **Version Control**
   - Commit all migration files
   - Document breaking changes
   - Keep track of migration history

## Developer Onboarding

### First-Time Setup
1. Install prerequisites:
   ```bash
   # Install Supabase CLI
   brew install supabase/tap/supabase  # Mac
   scoop install supabase              # Windows
   
   # Install Docker/Orbstack if not installed
   brew install orbstack  # Mac
   # Or download Docker Desktop for your OS
   ```

2. Clone and initialize:
   ```bash
   # Clone the repo
   git clone <your-repo>
   cd <your-repo>

3. Start local instance:
   ```bash
   supabase start
   ```

### Running Existing Migrations
1. Pull latest changes:
   ```bash
   git pull origin main
   ```

2. Apply migrations:
   ```bash
   # Apply all pending Prisma migrations
   prisma migrate deploy
   
   # Verify database state
   prisma db pull
   ```

3. Generate types:
   ```bash
   # Generate Prisma client
   prisma generate
   
   # Generate Supabase types
   supabase gen types typescript --local > types/supabase.ts
   ```

4. Verify setup:
   ```bash
   # Check database tables
   supabase db diff
   
   # Start the app and test functionality
   pnpm dev
   ```

### Troubleshooting
If you encounter issues:
1. Reset local instance:
   ```bash
   supabase stop --no-backup
   supabase start
   ```

2. Force reset Prisma state:
   ```bash
   prisma migrate reset --force
   ```

3. Verify database state:
   ```bash
   # Check current schema
   supabase db dump --local -f current_schema.sql
   
   # Compare with expected state
   git diff current_schema.sql
   ```

## Common Workflows

### Adding a New Table
1. Update `schema.prisma`
2. Run local migration:
   ```bash
   prisma migrate dev --name add_new_table
   ```
3. Test locally
4. Apply to production:
   ```bash
   prisma migrate deploy
   ```

### Modifying Existing Table
1. Backup current state:
   ```bash
   supabase db dump --local -f pre_mod_backup.sql
   ```
2. Update `schema.prisma`
3. Create migration:
   ```bash
   prisma migrate dev --name modify_table
   ```
4. Test thoroughly locally
5. Backup production:
   ```bash
   supabase db dump --project-ref your-project-ref -f prod_backup.sql
   ```
6. Apply to production:
   ```bash
   prisma migrate deploy
   ```

### Emergency Rollback
1. For local:
   ```bash
   supabase db reset
   psql -f pre_mod_backup.sql
   ```
2. For production:
   ```bash
   # Contact Supabase support for point-in-time recovery
   # Or restore from backup if necessary
   ```
``` 