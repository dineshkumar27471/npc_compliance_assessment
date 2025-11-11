# NPC Compliance Backend

This is the backend API for the NPC Compliance system built with Express.js and Knex.js.

## Database Setup

### Prerequisites

-  PostgreSQL installed and running
-  Database `npc_compliance_db` created
-  User `knxtuser` with password `123456789` and access to the database

### Available Commands

#### Migration Commands

```bash
# Run pending migrations
npm run migrate

# Rollback the last migration
npm run migrate:rollback

# Reset all migrations and re-run them (fresh start)
npm run migrate:fresh
```

#### Seeding Commands

```bash
# Run all seed files
npm run seed

# Create a new seed file
npm run seed:make seed_name
```

#### Database Reset

```bash
# Complete database reset: rollback all migrations, re-run migrations, and seed data
npm run db:reset
```

## Seed Data

The application comes with pre-configured seed data that includes:

### 1. Assessment Types (`01_assessment_types.js`)

-  Self Assessment (ID: 1)
-  External Assessment (ID: 2)

### 2. Entities (`02_entities.js`)

-  Ministry of Health (ID: 2e6888d4-55dd-4c85-8375-15a059f2a636)

### 3. Domains (`03_domains.js`)

15 domains for External Assessment including:

-  Coordinating the national statistical system
-  Managing relationships with data providers and stakeholders
-  Managing statistical information
-  Assuring Professional Competence
-  And 11 more domains...

### 4. Entity Assessments (`04_entity_assessments.js`)

-  One assessment assigned to Ministry of Health for External Assessment

### 5. Questions (`05_questions.js`)

-  30 questions (2 per domain)
-  Each question has a `requires_document` flag
-  Questions are linked to specific domains

## Database Schema Overview

-  **entities**: Organizations being assessed
-  **assessment_types**: Types of assessments (Self/External)
-  **domains**: Assessment domains/categories
-  **entity_assessments**: Assessment instances for entities
-  **questions**: Assessment questions linked to domains
-  **answers**: Responses to questions for specific assessments
-  **documents**: File uploads related to assessments

## Development Workflow

1. **Initial Setup**:

   ```bash
   npm install
   npm run migrate
   npm run seed
   ```

2. **Reset Database** (when schema changes):

   ```bash
   npm run db:reset
   ```

3. **Add New Seed Data**:
   ```bash
   npm run seed:make new_seed_name
   # Edit the generated file in seeds/ directory
   npm run seed
   ```

## API Endpoints

The server runs on port 8000 and provides the following endpoints:

-  `/api/assessments` - Assessment management
-  `/api/answers` - Answer management
-  `/api/documents` - Document upload and management

Start the server with:

```bash
npm start
```
