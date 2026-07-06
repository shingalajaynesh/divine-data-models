import { Sequelize } from "sequelize";
import role from "./role.js";
import center from "./center.js";
import user from "./user.js";
import dailyContent from "./dailyContent.js";
import babyDevelopment from "./babyDevelopment.js";
import forumPost from "./forumPost.js";
import forumComment from "./forumComment.js";
import liveClass from "./liveClass.js";
import payment from "./payment.js";
import parameter from "./parameter.js";
import registeredDevice from "./registeredDevice.js";
import userSession from "./userSession.js";
import vitalsLog from "./vitalsLog.js";
import expertSchedule from "./expertSchedule.js";
import consultationBooking from "./consultationBooking.js";
import inquiry from "./inquiry.js";
import inquiryResponse from "./inquiryResponse.js";

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
    dailyContent(sequelize, Sequelize.DataTypes, this.log);
    babyDevelopment(sequelize, Sequelize.DataTypes, this.log);
    forumPost(sequelize, Sequelize.DataTypes, this.log);
    forumComment(sequelize, Sequelize.DataTypes, this.log);
    liveClass(sequelize, Sequelize.DataTypes, this.log);
    payment(sequelize, Sequelize.DataTypes, this.log);
    parameter(sequelize, Sequelize.DataTypes, this.log);
    registeredDevice(sequelize, Sequelize.DataTypes, this.log);
    userSession(sequelize, Sequelize.DataTypes, this.log);
    vitalsLog(sequelize, Sequelize.DataTypes, this.log);
    expertSchedule(sequelize, Sequelize.DataTypes, this.log);
    consultationBooking(sequelize, Sequelize.DataTypes, this.log);
    inquiry(sequelize, Sequelize.DataTypes, this.log);
    inquiryResponse(sequelize, Sequelize.DataTypes, this.log);

    return sequelize;
  }

  setupAssociations() {
    const { Center, User, Role, DailyContent, BabyDevelopment, ForumPost, ForumComment, LiveClass, Payment, Parameter, RegisteredDevice, UserSession, VitalsLog, ExpertSchedule, ConsultationBooking, Inquiry, InquiryResponse } = this.models;

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

    // New associations
    if (User && ForumPost) {
      User.hasMany(ForumPost, { foreignKey: 'userId', as: 'posts' });
      ForumPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (ForumPost && ForumComment) {
      ForumPost.hasMany(ForumComment, { foreignKey: 'postId', as: 'comments' });
      ForumComment.belongsTo(ForumPost, { foreignKey: 'postId', as: 'post' });
    }

    if (User && ForumComment) {
      User.hasMany(ForumComment, { foreignKey: 'userId', as: 'comments' });
      ForumComment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && LiveClass) {
      User.belongsToMany(LiveClass, {
        through: 'class_bookings',
        foreignKey: 'user_id',
        otherKey: 'live_class_id',
        as: 'bookedClasses'
      });
      LiveClass.belongsToMany(User, {
        through: 'class_bookings',
        foreignKey: 'live_class_id',
        otherKey: 'user_id',
        as: 'attendees'
      });
    }

    if (User && Payment) {
      User.hasMany(Payment, { foreignKey: 'userId', as: 'payments' });
      Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (Center && Parameter) {
      Center.hasMany(Parameter, { foreignKey: 'centerId', as: 'parameters' });
      Parameter.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
    }

    if (User && RegisteredDevice) {
      User.hasMany(RegisteredDevice, { foreignKey: 'registeredBy', as: 'devices' });
      RegisteredDevice.belongsTo(User, { foreignKey: 'registeredBy', as: 'user' });
    }

    if (User && UserSession) {
      User.hasMany(UserSession, { foreignKey: 'userId', as: 'sessions' });
      UserSession.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && VitalsLog) {
      User.hasMany(VitalsLog, { foreignKey: 'userId', as: 'vitalsLogs' });
      VitalsLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && ExpertSchedule) {
      User.hasMany(ExpertSchedule, { foreignKey: 'expertId', as: 'expertSchedules' });
      ExpertSchedule.belongsTo(User, { foreignKey: 'expertId', as: 'expert' });
    }

    if (User && ConsultationBooking) {
      User.hasMany(ConsultationBooking, { foreignKey: 'userId', as: 'consultations' });
      User.hasMany(ConsultationBooking, { foreignKey: 'expertId', as: 'expertBookings' });
      ConsultationBooking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      ConsultationBooking.belongsTo(User, { foreignKey: 'expertId', as: 'expert' });
    }

    if (Center && Inquiry) {
      Center.hasMany(Inquiry, { foreignKey: 'centerId', as: 'inquiries' });
      Inquiry.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
    }

    if (User && Inquiry) {
      User.hasMany(Inquiry, { foreignKey: 'assignedTo', as: 'assignedInquiries' });
      Inquiry.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });
    }

    if (Inquiry && InquiryResponse) {
      Inquiry.hasMany(InquiryResponse, { foreignKey: 'inquiryId', as: 'responses' });
      InquiryResponse.belongsTo(Inquiry, { foreignKey: 'inquiryId', as: 'inquiry' });
    }

    if (User && InquiryResponse) {
      User.hasMany(InquiryResponse, { foreignKey: 'authorId', as: 'inquiryResponses' });
      InquiryResponse.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
    }
  }
}
