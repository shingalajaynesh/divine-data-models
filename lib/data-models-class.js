import { Sequelize } from "sequelize";
import role from "./role.js";
import center from "./center.js";
import user from "./user.js";

export class DataModels {
  constructor(logger) {
    this.log = logger;
    this.sequelize;
    this.models;
  }

  /**
   * Build the slow-query logging function using this.log.
   * Threshold controlled by SLOW_QUERY_THRESHOLD env var (default 100 ms).
   */
  _makeLoggingFn() {
    return (sql, timing) => {
      const threshold = parseInt(process.env.SLOW_QUERY_THRESHOLD, 10) || 100;
      if (timing > threshold) {
        this.log.warn(
          `\x1b[1m\x1b[33m[SLOW QUERY]\x1b[0m \x1b[1m\x1b[31m(${timing}ms):\x1b[0m \x1b[33m${sql}\x1b[0m`
        );
      } else {
        this.log.info(`(${timing}ms) ${sql}`);
      }
    };
  }

  init(config) {
    let sequelize;

    if (!config) {
      throw new Error("Config Object required");
    }

    if (config.sequelize) {
      // Caller already built the Sequelize instance — just wire in our logger.
      sequelize = config.sequelize;
      sequelize.options.logging = this._makeLoggingFn();
      sequelize.options.benchmark = true;
    } else {
      if (!config.database) throw new Error("Database name required");
      if (!config.dbUser)   throw new Error("Database user required");
      if (!config.dbPassword) throw new Error("Database password required");

      const dialect = config.dialect || "postgres";

      // Connection pool defaults
      const pool = Object.assign(
        { max: 10, min: 2, acquire: 30000, idle: 10000 },
        config.pool || {}
      );

      sequelize = new Sequelize(
        config.database,
        config.dbUser,
        config.dbPassword,
        {
          dialect,
          host: config.host || "localhost",
          port: config.port || (dialect === "postgres" ? 5432 : 3306),
          dialectOptions: config.dialectOptions || {},
          pool,
          benchmark: true,
          logging: this._makeLoggingFn(),
        }
      );
    }

    this.config = config;
    const updatedSequelize = this.initializeSequelize(sequelize);
    this.sequelize = updatedSequelize;
    this.models = updatedSequelize.models;
    this.setupAssociations(); // Call the function to setup associations
  }

  initializeSequelize(sequelize) {
    // Initialize models
    center(sequelize, Sequelize.DataTypes, this.log);
    user(sequelize, Sequelize.DataTypes, this.log);
    role(sequelize, Sequelize.DataTypes, this.log);

    return sequelize;
  }

  setupAssociations() {
    const { Center, User, Role } = this.models;

    // Define associations
    if (Center && User) {
      Center.hasMany(User, {
        foreignKey: "centerId",
        as: "users", // Alias for the association
      });

      Center.belongsTo(User, {
        foreignKey: "primaryUser", // Foreign key in centers table
        as: "primaryUserDetails", // Alias for the association
        constraints: false, // Disable DB constraint to avoid cyclic sync SQL bug
      });

      User.belongsTo(Center, {
        foreignKey: "centerId",
        as: "center", // Alias for the association
      });
    }

    if (Role && User) {
      Role.belongsTo(Center, {
        foreignKey: "centerId",
        as: "center", // Alias for the association
      });

      User.belongsTo(Role, {
        foreignKey: "roleId",
        as: "role", // Alias for the association
      });
    }
  }
}
