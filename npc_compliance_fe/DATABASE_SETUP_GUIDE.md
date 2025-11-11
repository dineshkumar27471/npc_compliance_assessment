# PostgreSQL Database Setup Guide for DBeaver

## Step 1: Create Database in DBeaver

1. Open DBeaver
2. Right-click on "Databases" → Select "New Database Connection"
3. Choose "PostgreSQL" and click "Next"
4. Configure connection:
   - **Server Host:** localhost
   - **Port:** 5432 (default)
   - **Database:** (leave empty for now)
   - **Username:** postgres (or your username)
   - **Password:** (your PostgreSQL password)
5. Click "Test Connection" to verify
6. Click "Finish"

## Step 2: Create Database

1. In DBeaver, right-click on your PostgreSQL connection
2. Select "Create New Database"
3. Enter database name: `npc_compliance_db`
4. Click "Create"

## Step 3: Run SQL Script

1. Open the SQL script file: `scripts/init-database.sql`
2. Copy all the SQL code
3. In DBeaver:
   - Right-click on `npc_compliance_db` database
   - Select "SQL Editor" → "Open SQL Script"
   - Paste the SQL code
   - Click "Execute" (or press Ctrl+Enter)
4. Verify all tables are created in the database tree

## Step 4: Configure Environment Variables

1. Open `.env.local` in your project root
2. Update with your PostgreSQL credentials:

\`\`\`env
# PostgreSQL Connection String
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/npc_compliance_db

# File Upload Configuration
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=application/pdf

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
\`\`\`

Replace:
- `postgres` with your PostgreSQL username
- `your_password` with your PostgreSQL password
- `localhost` with your server address (if not local)
- `5432` with your PostgreSQL port (if different)

## Step 5: Install Dependencies

\`\`\`bash
npm install pg
\`\`\`

## Step 6: Test Connection

Run your Next.js app:
\`\`\`bash
npm run dev
\`\`\`

The database connection will be tested when you first submit a form.

## Troubleshooting

### Connection Refused Error
- Ensure PostgreSQL is running
- Check if port 5432 is correct
- Verify username and password

### Database Not Found
- Ensure you created the `npc_compliance_db` database
- Check database name in CONNECTION_STRING

### Tables Not Created
- Run the SQL script again in DBeaver
- Check for SQL errors in the output

### File Upload Issues
- Ensure `public/uploads` directory exists
- Check file permissions
- Verify file size is under 10MB

## Database Schema

### Tables Created:
1. **assessments** - Main assessment records
2. **assessment_answers** - User answers to questions
3. **documents** - Uploaded file metadata
4. **document_question_mapping** - Links documents to multiple questions

## Viewing Data in DBeaver

1. Expand your database in the tree
2. Expand "Tables"
3. Right-click on any table → "View Data"
4. Browse, edit, or delete records

## Backing Up Your Database

In DBeaver:
1. Right-click on database → "Backup"
2. Choose backup location
3. Click "Backup"

## Resetting Database

To delete all data and start fresh:
1. Right-click on database → "Drop"
2. Create new database with same name
3. Run SQL script again
