# divine-data-models

A shared npm package containing the Sequelize database model definitions, associations, and utility helpers for the Divine Garbh Sanskar application.

## Installation

This package is designed to be installed as a git dependency in downstream apps (such as the backend):

```json
"dependencies": {
  "divine-data-models": "git+https://github.com/shingalajaynesh/divine-data-models.git"
}
```

## Structure & Modules

- **`index.js`**: Package entry point exporting models and helper methods.
- **`lib/data-models-class.js`**: The central `DataModels` class that instantiates the Sequelize connections and coordinates model associations.
- **`lib/user.js`**: User model schemas (demographics, due dates, current weeks).
- **`lib/center.js`**: Medical facility centers configuration.
- **`lib/role.js`**: User roles definition (`ADMIN`, `STAFF`, `MOTHER`).
- **`lib/crypto.js`**: Encryption utility functions for hashing and verification using `bcrypt`.

## CI/CD Database Branching (Neon Tech)

This repository includes a GitHub Action workflow in [neon_workflow.yml](file:///d:/WEBSITE%20DEVELOPMENT/thedivinegarbhsanskar/divine-data-models/.github/workflows/neon_workflow.yml).
* Whenever a pull request is opened or updated on this repository, it automatically contacts Neon Tech and provisions an isolated development database branch.
* When the pull request is closed or merged, the development database branch is automatically deleted.

