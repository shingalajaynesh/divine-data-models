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
import program from "./program.js";
import programModule from "./programModule.js";
import programLesson from "./programLesson.js";
import programActivity from "./programActivity.js";
import programEnrollment from "./programEnrollment.js";
import activityProgress from "./activityProgress.js";
import contentCategory from "./contentCategory.js";
import mediaAsset from "./mediaAsset.js";
import contentItem from "./contentItem.js";
import contentTranslation from "./contentTranslation.js";
import contentBookmark from "./contentBookmark.js";
import contentViewHistory from "./contentViewHistory.js";
import recentSearch from "./recentSearch.js";
import notification from "./notification.js";
import notificationPreference from "./notificationPreference.js";
import reminderSchedule from "./reminderSchedule.js";
import notificationDelivery from "./notificationDelivery.js";
import dailyProgress from "./dailyProgress.js";
import userStreak from "./userStreak.js";
import userAchievement from "./userAchievement.js";
import quizQuestion from "./quizQuestion.js";
import quizAttempt from "./quizAttempt.js";
import partnerActivity from "./partnerActivity.js";
import partnerActivityLog from "./partnerActivityLog.js";
import sensoryActivity from "./sensoryActivity.js";
import sensoryActivityLog from "./sensoryActivityLog.js";

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
    program(sequelize, Sequelize.DataTypes, this.log);
    programModule(sequelize, Sequelize.DataTypes, this.log);
    programLesson(sequelize, Sequelize.DataTypes, this.log);
    programActivity(sequelize, Sequelize.DataTypes, this.log);
    programEnrollment(sequelize, Sequelize.DataTypes, this.log);
    activityProgress(sequelize, Sequelize.DataTypes, this.log);
    contentCategory(sequelize, Sequelize.DataTypes, this.log);
    mediaAsset(sequelize, Sequelize.DataTypes, this.log);
    contentItem(sequelize, Sequelize.DataTypes, this.log);
    contentTranslation(sequelize, Sequelize.DataTypes, this.log);
    contentBookmark(sequelize, Sequelize.DataTypes, this.log);
    contentViewHistory(sequelize, Sequelize.DataTypes, this.log);
    recentSearch(sequelize, Sequelize.DataTypes, this.log);
    notification(sequelize, Sequelize.DataTypes, this.log);
    notificationPreference(sequelize, Sequelize.DataTypes, this.log);
    reminderSchedule(sequelize, Sequelize.DataTypes, this.log);
    notificationDelivery(sequelize, Sequelize.DataTypes, this.log);
    dailyProgress(sequelize, Sequelize.DataTypes, this.log);
    userStreak(sequelize, Sequelize.DataTypes, this.log);
    userAchievement(sequelize, Sequelize.DataTypes, this.log);
    quizQuestion(sequelize, Sequelize.DataTypes, this.log);
    quizAttempt(sequelize, Sequelize.DataTypes, this.log);
    partnerActivity(sequelize, Sequelize.DataTypes, this.log);
    partnerActivityLog(sequelize, Sequelize.DataTypes, this.log);
    sensoryActivity(sequelize, Sequelize.DataTypes, this.log);
    sensoryActivityLog(sequelize, Sequelize.DataTypes, this.log);

    return sequelize;
  }

  setupAssociations() {
    const { Center, User, Role, DailyContent, BabyDevelopment, ForumPost, ForumComment, LiveClass, Payment, Parameter, RegisteredDevice, UserSession, VitalsLog, ExpertSchedule, ConsultationBooking, Inquiry, InquiryResponse, Program, ProgramModule, ProgramLesson, ProgramActivity, ProgramEnrollment, ActivityProgress, ContentCategory, MediaAsset, ContentItem, ContentTranslation, ContentBookmark, ContentViewHistory, RecentSearch, Notification, NotificationPreference, ReminderSchedule, NotificationDelivery, DailyProgress, UserStreak, UserAchievement, QuizQuestion, QuizAttempt, PartnerActivity, PartnerActivityLog, SensoryActivity, SensoryActivityLog } = this.models;

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

    if (Center && Program) {
      Center.hasMany(Program, { foreignKey: 'centerId', as: 'programs' });
      Program.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
    }

    if (Program && ProgramModule) {
      Program.hasMany(ProgramModule, { foreignKey: 'programId', as: 'modules' });
      ProgramModule.belongsTo(Program, { foreignKey: 'programId', as: 'program' });
    }

    if (ProgramModule && ProgramLesson) {
      ProgramModule.hasMany(ProgramLesson, { foreignKey: 'moduleId', as: 'lessons' });
      ProgramLesson.belongsTo(ProgramModule, { foreignKey: 'moduleId', as: 'module' });
    }

    if (ProgramLesson && ProgramActivity) {
      ProgramLesson.hasMany(ProgramActivity, { foreignKey: 'lessonId', as: 'activities' });
      ProgramActivity.belongsTo(ProgramLesson, { foreignKey: 'lessonId', as: 'lesson' });
    }

    if (User && Program && ProgramEnrollment) {
      User.hasMany(ProgramEnrollment, { foreignKey: 'userId', as: 'programEnrollments' });
      ProgramEnrollment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      Program.hasMany(ProgramEnrollment, { foreignKey: 'programId', as: 'enrollments' });
      ProgramEnrollment.belongsTo(Program, { foreignKey: 'programId', as: 'program' });
    }

    if (ProgramEnrollment && User && ProgramActivity && ActivityProgress) {
      ProgramEnrollment.hasMany(ActivityProgress, { foreignKey: 'enrollmentId', as: 'activityProgress' });
      ActivityProgress.belongsTo(ProgramEnrollment, { foreignKey: 'enrollmentId', as: 'enrollment' });
      User.hasMany(ActivityProgress, { foreignKey: 'userId', as: 'activityProgress' });
      ActivityProgress.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      ProgramActivity.hasMany(ActivityProgress, { foreignKey: 'activityId', as: 'progressRecords' });
      ActivityProgress.belongsTo(ProgramActivity, { foreignKey: 'activityId', as: 'activity' });
    }

    if (ContentCategory) {
      ContentCategory.hasMany(ContentCategory, { foreignKey: 'parentId', as: 'children' });
      ContentCategory.belongsTo(ContentCategory, { foreignKey: 'parentId', as: 'parent' });
    }

    if (Center && User && MediaAsset) {
      Center.hasMany(MediaAsset, { foreignKey: 'centerId', as: 'mediaAssets' });
      MediaAsset.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
      User.hasMany(MediaAsset, { foreignKey: 'ownerId', as: 'ownedMediaAssets' });
      MediaAsset.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
    }

    if (Center && User && ContentCategory && MediaAsset && ContentItem) {
      Center.hasMany(ContentItem, { foreignKey: 'centerId', as: 'contentItems' });
      ContentItem.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
      ContentCategory.hasMany(ContentItem, { foreignKey: 'categoryId', as: 'contentItems' });
      ContentItem.belongsTo(ContentCategory, { foreignKey: 'categoryId', as: 'category' });
      MediaAsset.hasMany(ContentItem, { foreignKey: 'coverAssetId', as: 'coverForItems' });
      ContentItem.belongsTo(MediaAsset, { foreignKey: 'coverAssetId', as: 'coverAsset' });
      User.hasMany(ContentItem, { foreignKey: 'createdBy', as: 'createdContentItems' });
      ContentItem.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
      ContentItem.belongsTo(User, { foreignKey: 'updatedBy', as: 'updater' });
    }

    if (ContentItem && ContentTranslation) {
      ContentItem.hasMany(ContentTranslation, { foreignKey: 'contentItemId', as: 'translations' });
      ContentTranslation.belongsTo(ContentItem, { foreignKey: 'contentItemId', as: 'contentItem' });
    }

    if (User && ContentItem && ContentBookmark) {
      User.hasMany(ContentBookmark, { foreignKey: 'userId', as: 'contentBookmarks' });
      ContentBookmark.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      ContentItem.hasMany(ContentBookmark, { foreignKey: 'contentItemId', as: 'bookmarks' });
      ContentBookmark.belongsTo(ContentItem, { foreignKey: 'contentItemId', as: 'contentItem' });
    }

    if (User && ContentItem && ContentViewHistory) {
      User.hasMany(ContentViewHistory, { foreignKey: 'userId', as: 'contentViewHistory' });
      ContentViewHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      ContentItem.hasMany(ContentViewHistory, { foreignKey: 'contentItemId', as: 'viewHistory' });
      ContentViewHistory.belongsTo(ContentItem, { foreignKey: 'contentItemId', as: 'contentItem' });
      if (DailyContent) {
        DailyContent.hasMany(ContentViewHistory, { foreignKey: 'dailyContentId', as: 'viewHistory' });
        ContentViewHistory.belongsTo(DailyContent, { foreignKey: 'dailyContentId', as: 'dailyContent' });
      }
    }

    if (User && RecentSearch) {
      User.hasMany(RecentSearch, { foreignKey: 'userId', as: 'recentSearches' });
      RecentSearch.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && Notification) {
      User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
      Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      if (Center) { Center.hasMany(Notification, { foreignKey: 'centerId', as: 'notifications' }); Notification.belongsTo(Center, { foreignKey: 'centerId', as: 'center' }); }
    }
    if (User && NotificationPreference) {
      User.hasOne(NotificationPreference, { foreignKey: 'userId', as: 'notificationPreference' });
      NotificationPreference.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (User && ReminderSchedule) {
      User.hasMany(ReminderSchedule, { foreignKey: 'userId', as: 'reminderSchedules' });
      ReminderSchedule.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (Notification && NotificationDelivery) {
      Notification.hasMany(NotificationDelivery, { foreignKey: 'notificationId', as: 'deliveries' });
      NotificationDelivery.belongsTo(Notification, { foreignKey: 'notificationId', as: 'notification' });
    }
    if (User && DailyProgress) {
      User.hasMany(DailyProgress, { foreignKey: 'userId', as: 'dailyProgress' });
      DailyProgress.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (User && UserStreak) {
      User.hasOne(UserStreak, { foreignKey: 'userId', as: 'streak' });
      UserStreak.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (User && UserAchievement) {
      User.hasMany(UserAchievement, { foreignKey: 'userId', as: 'achievements' });
      UserAchievement.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (User && QuizAttempt) {
      User.hasMany(QuizAttempt, { foreignKey: 'userId', as: 'quizAttempts' });
      QuizAttempt.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (User && PartnerActivityLog) {
      User.hasMany(PartnerActivityLog, { foreignKey: 'userId', as: 'partnerActivityLogs' });
      PartnerActivityLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (User && SensoryActivityLog) {
      User.hasMany(SensoryActivityLog, { foreignKey: 'userId', as: 'sensoryActivityLogs' });
      SensoryActivityLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
  }
}
