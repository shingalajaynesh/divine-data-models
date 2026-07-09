# divine-data-models

A shared npm package containing the centralized Sequelize database model definitions, associations, and utility helpers for the Divine Garbh Sanskar application.

## Installation

This package is designed to be installed as a git dependency in downstream apps (such as the backend and migration tools):

```json
"dependencies": {
  "divine-data-models": "git+https://github.com/shingalajaynesh/divine-data-models.git"
}
```

## Structure & Architecture

```text
divine-data-models/
├── index.js                  # Package entry point exporting all model models
└── lib/
    ├── dataModelsClass.js    # Central coordinator initializing Sequelize & associations
    ├── user.js               # Demographic user records
    ├── center.js             # Hospital/medical centers configuration
    ├── databaseBackup.js     # DevOps backup snapshot logs (Chunk 50)
    ├── replicationStatus.js  # Database replication monitor (Chunk 49)
    └── [80+ other models]    # Modular database schema definitions
```

- **`index.js`**: Central exports registry.
- **`lib/dataModelsClass.js`**: The central `DataModels` class that instantiates the Sequelize connections, configures connection pool parameters, and coordinates all 88 model associations.

## Database Association Design

The database employs Sequelize relations to tie center domains and patient profiles together:
* **Centers & Roles**: Every `User` belongs to a specific `Role` and is scoped to a primary `Center`.
* **Clinical Health logs**: `vitals_logs` map to `User` for tracking sleep, hydration, nutrition, and mood.
* **Activities & Progress**: `program_enrollments` map maternal accounts to structured developmental lessons and PQ/IQ/EQ/SQ quotient tasks.
* ** CRM & Support Desk**: `support_tickets` link user inquiries and staff assignments.

## CI/CD Database Branching (Neon Tech)

This repository includes a GitHub Action workflow in `.github/workflows/neon_workflow.yml`.
* Whenever a pull request is opened or updated on this repository, it automatically contacts Neon Tech and provisions an isolated development database branch.
* When the pull request is closed or merged, the development database branch is automatically deleted.
