import { Sequelize } from "sequelize";
import role from "./role.js";
import center from "./center.js";
import user from "./user.js";
import dailyContent from "./dailyContent.js";
import babyDevelopment from "./babyDevelopment.js";
import forumPost from "./forumPost.js";
import forumComment from "./forumComment.js";
import forumGroup from "./forumGroup.js";
import liveClass from "./liveClass.js";
import payment from "./payment.js";
import paymentProviderEvent from "./paymentProviderEvent.js";
import paymentRefund from "./paymentRefund.js";
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
import audioPlaylist from "./audioPlaylist.js";
import audioPlaylistItem from "./audioPlaylistItem.js";
import dietPreference from "./dietPreference.js";
import userMealPlan from "./userMealPlan.js";
import shoppingListItem from "./shoppingListItem.js";
import liveClassBooking from "./liveClassBooking.js";
import hospitalBagItem from "./hospitalBagItem.js";
import appointment from "./appointment.js";
import medicineReminder from "./medicineReminder.js";
import supportTicket from "./supportTicket.js";
import supportTicketMessage from "./supportTicketMessage.js";
import cannedReply from "./cannedReply.js";
import counselingLead from "./counselingLead.js";
import counselingCall from "./counselingCall.js";
import product from "./product.js";
import cartItem from "./cartItem.js";
import userAddress from "./userAddress.js";
import storeOrder from "./storeOrder.js";
import storeOrderItem from "./storeOrderItem.js";
import storeOrderReturn from "./storeOrderReturn.js";
import storeCheckoutIntent from "./storeCheckoutIntent.js";
import storeCheckoutItem from "./storeCheckoutItem.js";
import inventoryReservation from "./inventoryReservation.js";
import subscriptionPlan from "./subscriptionPlan.js";
import userSubscription from "./userSubscription.js";
import coupon from "./coupon.js";
import paymentCheckoutIntent from "./paymentCheckoutIntent.js";
import couponRedemption from "./couponRedemption.js";
import adminAuditLog from "./adminAuditLog.js";
import crmNote from "./crmNote.js";
import staffTask from "./staffTask.js";
import reminderRule from "./reminderRule.js";
import specialEvent from "./specialEvent.js";
import eventRegistration from "./eventRegistration.js";
import userReferral from "./userReferral.js";
import testimonial from "./testimonial.js";
import ambassadorApplication from "./ambassadorApplication.js";
import invoice from "./invoice.js";
import financialTransaction from "./financialTransaction.js";
import reportTemplate from "./reportTemplate.js";
import reportSchedule from "./reportSchedule.js";
import systemSetting from "./systemSetting.js";
import featureFlag from "./featureFlag.js";
import localeString from "./localeString.js";
import systemMetric from "./systemMetric.js";
import queryPerformanceAudit from "./queryPerformanceAudit.js";
import replicationStatus from "./replicationStatus.js";
import databaseBackup from "./databaseBackup.js";
import staffInvitation from "./staffInvitation.js";
import inventoryMovement from "./inventoryMovement.js";

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
      const threshold = parseInt(process.env.SLOW_QUERY_THRESHOLD, 10) || 250;
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
    forumGroup(sequelize, Sequelize.DataTypes, this.log);
    liveClass(sequelize, Sequelize.DataTypes, this.log);
    payment(sequelize, Sequelize.DataTypes, this.log);
    paymentProviderEvent(sequelize, Sequelize.DataTypes, this.log);
    paymentRefund(sequelize, Sequelize.DataTypes, this.log);
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
    audioPlaylist(sequelize, Sequelize.DataTypes, this.log);
    audioPlaylistItem(sequelize, Sequelize.DataTypes, this.log);
    dietPreference(sequelize, Sequelize.DataTypes, this.log);
    userMealPlan(sequelize, Sequelize.DataTypes, this.log);
    shoppingListItem(sequelize, Sequelize.DataTypes, this.log);
    liveClassBooking(sequelize, Sequelize.DataTypes, this.log);
    hospitalBagItem(sequelize, Sequelize.DataTypes, this.log);
    appointment(sequelize, Sequelize.DataTypes, this.log);
    medicineReminder(sequelize, Sequelize.DataTypes, this.log);
    supportTicket(sequelize, Sequelize.DataTypes, this.log);
    supportTicketMessage(sequelize, Sequelize.DataTypes, this.log);
    cannedReply(sequelize, Sequelize.DataTypes, this.log);
    counselingLead(sequelize, Sequelize.DataTypes, this.log);
    counselingCall(sequelize, Sequelize.DataTypes, this.log);
    product(sequelize, Sequelize.DataTypes, this.log);
    cartItem(sequelize, Sequelize.DataTypes, this.log);
    userAddress(sequelize, Sequelize.DataTypes, this.log);
    storeOrder(sequelize, Sequelize.DataTypes, this.log);
    storeOrderItem(sequelize, Sequelize.DataTypes, this.log);
    storeOrderReturn(sequelize, Sequelize.DataTypes, this.log);
    storeCheckoutIntent(sequelize, Sequelize.DataTypes, this.log);
    storeCheckoutItem(sequelize, Sequelize.DataTypes, this.log);
    inventoryReservation(sequelize, Sequelize.DataTypes, this.log);
    subscriptionPlan(sequelize, Sequelize.DataTypes, this.log);
    userSubscription(sequelize, Sequelize.DataTypes, this.log);
    coupon(sequelize, Sequelize.DataTypes, this.log);
    paymentCheckoutIntent(sequelize, Sequelize.DataTypes, this.log);
    couponRedemption(sequelize, Sequelize.DataTypes, this.log);
    adminAuditLog(sequelize, Sequelize.DataTypes, this.log);
    crmNote(sequelize, Sequelize.DataTypes, this.log);
    staffTask(sequelize, Sequelize.DataTypes, this.log);
    reminderRule(sequelize, Sequelize.DataTypes, this.log);
    specialEvent(sequelize, Sequelize.DataTypes, this.log);
    eventRegistration(sequelize, Sequelize.DataTypes, this.log);
    userReferral(sequelize, Sequelize.DataTypes, this.log);
    testimonial(sequelize, Sequelize.DataTypes, this.log);
    ambassadorApplication(sequelize, Sequelize.DataTypes, this.log);
    invoice(sequelize, Sequelize.DataTypes, this.log);
    financialTransaction(sequelize, Sequelize.DataTypes, this.log);
    reportTemplate(sequelize, Sequelize.DataTypes, this.log);
    reportSchedule(sequelize, Sequelize.DataTypes, this.log);
    systemSetting(sequelize, Sequelize.DataTypes, this.log);
    featureFlag(sequelize, Sequelize.DataTypes, this.log);
    localeString(sequelize, Sequelize.DataTypes, this.log);
    systemMetric(sequelize, Sequelize.DataTypes, this.log);
    queryPerformanceAudit(sequelize, Sequelize.DataTypes, this.log);
    replicationStatus(sequelize, Sequelize.DataTypes, this.log);
    databaseBackup(sequelize, Sequelize.DataTypes, this.log);
    staffInvitation(sequelize, Sequelize.DataTypes, this.log);
    inventoryMovement(sequelize, Sequelize.DataTypes, this.log);

    return sequelize;
  }

  setupAssociations() {
    const { Center, User, Role, DailyContent, BabyDevelopment, ForumPost, ForumComment, ForumGroup, LiveClass, Payment, PaymentProviderEvent, PaymentRefund, Parameter, RegisteredDevice, UserSession, VitalsLog, ExpertSchedule, ConsultationBooking, Inquiry, InquiryResponse, Program, ProgramModule, ProgramLesson, ProgramActivity, ProgramEnrollment, ActivityProgress, ContentCategory, MediaAsset, ContentItem, ContentTranslation, ContentBookmark, ContentViewHistory, RecentSearch, Notification, NotificationPreference, ReminderSchedule, NotificationDelivery, DailyProgress, UserStreak, UserAchievement, QuizQuestion, QuizAttempt, PartnerActivity, PartnerActivityLog, SensoryActivity, SensoryActivityLog, AudioPlaylist, AudioPlaylistItem, DietPreference, UserMealPlan, ShoppingListItem, LiveClassBooking, HospitalBagItem, Appointment, MedicineReminder, SupportTicket, SupportTicketMessage, CannedReply, CounselingLead, CounselingCall, Product, CartItem, UserAddress, StoreOrder, StoreOrderItem, StoreOrderReturn, StoreCheckoutIntent, StoreCheckoutItem, InventoryReservation, SubscriptionPlan, UserSubscription, Coupon, PaymentCheckoutIntent, CouponRedemption, AdminAuditLog, CrmNote, StaffTask, ReminderRule, SpecialEvent, EventRegistration, UserReferral, Testimonial, AmbassadorApplication, Invoice, FinancialTransaction, ReportTemplate, ReportSchedule, SystemSetting, FeatureFlag, LocaleString, SystemMetric, QueryPerformanceAudit, ReplicationStatus, DatabaseBackup, StaffInvitation, InventoryMovement } = this.models;

    if (UserReferral && User) {
      User.hasMany(UserReferral, { foreignKey: 'referrerId', as: 'referrals' });
      UserReferral.belongsTo(User, { foreignKey: 'referrerId', as: 'referrer' });
    }

    if (Testimonial && User) {
      User.hasMany(Testimonial, { foreignKey: 'userId', as: 'testimonials' });
      User.hasMany(Testimonial, { foreignKey: 'approvedBy', as: 'approvedTestimonials' });
      Testimonial.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      Testimonial.belongsTo(User, { foreignKey: 'approvedBy', as: 'approver' });
    }

    if (AmbassadorApplication && User) {
      User.hasMany(AmbassadorApplication, { foreignKey: 'userId', as: 'ambassadorApplications' });
      AmbassadorApplication.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (SpecialEvent && EventRegistration && User) {
      SpecialEvent.hasMany(EventRegistration, { foreignKey: 'eventId', as: 'registrations' });
      EventRegistration.belongsTo(SpecialEvent, { foreignKey: 'eventId', as: 'event' });
      EventRegistration.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (CounselingLead && User && CounselingCall) {
      CounselingLead.belongsTo(User, { foreignKey: 'assignedTo', as: 'counselor' });
      CounselingLead.belongsTo(User, { foreignKey: 'convertedUserId', as: 'convertedUser' });
      CounselingLead.hasMany(CounselingCall, { foreignKey: 'leadId', as: 'calls' });

      CounselingCall.belongsTo(CounselingLead, { foreignKey: 'leadId', as: 'lead' });
      CounselingCall.belongsTo(User, { foreignKey: 'counselorId', as: 'counselor' });
    }

    if (User && CrmNote) {
      User.hasMany(CrmNote, { foreignKey: 'userId', as: 'crmNotes' });
      CrmNote.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      CrmNote.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
    }

    if (User && AdminAuditLog) {
      User.hasMany(AdminAuditLog, { foreignKey: 'userId', as: 'auditLogs', onDelete: 'RESTRICT' });
      AdminAuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'RESTRICT' });
    }

    if (User && StaffTask) {
      User.hasMany(StaffTask, { foreignKey: 'staffId', as: 'staffTasks' });
      User.hasMany(StaffTask, { foreignKey: 'userId', as: 'memberTasks' });
      StaffTask.belongsTo(User, { foreignKey: 'staffId', as: 'staff' });
      StaffTask.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && UserSubscription) {
      User.hasMany(UserSubscription, { foreignKey: 'userId', as: 'subscriptions' });
      UserSubscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (SubscriptionPlan && UserSubscription) {
      SubscriptionPlan.hasMany(UserSubscription, { foreignKey: 'planId', as: 'subscriptions' });
      UserSubscription.belongsTo(SubscriptionPlan, { foreignKey: 'planId', as: 'plan' });
    }

    if (PaymentCheckoutIntent && User && SubscriptionPlan && Coupon && Payment && Invoice) {
      User.hasMany(PaymentCheckoutIntent, { foreignKey: 'userId', as: 'paymentCheckoutIntents' });
      PaymentCheckoutIntent.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      if (Center) {
        Center.hasMany(PaymentCheckoutIntent, { foreignKey: 'centerId', as: 'paymentCheckoutIntents' });
        PaymentCheckoutIntent.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
      }
      SubscriptionPlan.hasMany(PaymentCheckoutIntent, { foreignKey: 'subscriptionPlanId', as: 'checkoutIntents' });
      PaymentCheckoutIntent.belongsTo(SubscriptionPlan, { foreignKey: 'subscriptionPlanId', as: 'subscriptionPlan' });
      Coupon.hasMany(PaymentCheckoutIntent, { foreignKey: 'couponId', as: 'checkoutIntents' });
      PaymentCheckoutIntent.belongsTo(Coupon, { foreignKey: 'couponId', as: 'coupon' });
      PaymentCheckoutIntent.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' });
      PaymentCheckoutIntent.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
      Payment.hasOne(PaymentCheckoutIntent, { foreignKey: 'paymentId', as: 'checkoutIntent' });
      Invoice.hasOne(PaymentCheckoutIntent, { foreignKey: 'invoiceId', as: 'checkoutIntent' });
    }

    if (CouponRedemption && Coupon && User && PaymentCheckoutIntent && Payment) {
      Coupon.hasMany(CouponRedemption, { foreignKey: 'couponId', as: 'redemptions' });
      CouponRedemption.belongsTo(Coupon, { foreignKey: 'couponId', as: 'coupon' });
      User.hasMany(CouponRedemption, { foreignKey: 'userId', as: 'couponRedemptions' });
      CouponRedemption.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      PaymentCheckoutIntent.hasOne(CouponRedemption, { foreignKey: 'checkoutIntentId', as: 'couponRedemption' });
      CouponRedemption.belongsTo(PaymentCheckoutIntent, { foreignKey: 'checkoutIntentId', as: 'checkoutIntent' });
      Payment.hasMany(CouponRedemption, { foreignKey: 'paymentId', as: 'couponRedemptions' });
      CouponRedemption.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' });
    }

    if (PaymentProviderEvent && PaymentCheckoutIntent) {
      PaymentCheckoutIntent.hasMany(PaymentProviderEvent, { foreignKey: 'checkoutIntentId', as: 'providerEvents' });
      PaymentProviderEvent.belongsTo(PaymentCheckoutIntent, { foreignKey: 'checkoutIntentId', as: 'checkoutIntent' });
    }

    if (PaymentProviderEvent && StoreCheckoutIntent) {
      StoreCheckoutIntent.hasMany(PaymentProviderEvent, { foreignKey: 'storeCheckoutIntentId', as: 'providerEvents' });
      PaymentProviderEvent.belongsTo(StoreCheckoutIntent, { foreignKey: 'storeCheckoutIntentId', as: 'storeCheckoutIntent' });
    }

    if (PaymentRefund && Payment && PaymentCheckoutIntent && User) {
      Payment.hasMany(PaymentRefund, { foreignKey: 'paymentId', as: 'refunds' });
      PaymentRefund.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' });
      PaymentCheckoutIntent.hasMany(PaymentRefund, { foreignKey: 'checkoutIntentId', as: 'refunds' });
      PaymentRefund.belongsTo(PaymentCheckoutIntent, { foreignKey: 'checkoutIntentId', as: 'checkoutIntent' });
      User.hasMany(PaymentRefund, { foreignKey: 'requestedByUserId', as: 'requestedPaymentRefunds' });
      PaymentRefund.belongsTo(User, { foreignKey: 'requestedByUserId', as: 'requestedByUser' });
      if (FinancialTransaction) {
        PaymentRefund.belongsTo(FinancialTransaction, { foreignKey: 'financialTransactionId', as: 'financialTransaction' });
        FinancialTransaction.hasOne(PaymentRefund, { foreignKey: 'financialTransactionId', as: 'paymentRefund' });
      }
      if (Invoice) {
        PaymentRefund.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
        Invoice.hasOne(PaymentRefund, { foreignKey: 'invoiceId', as: 'paymentRefund' });
      }
    }

    if (StoreOrder && StoreOrderReturn) {
      StoreOrder.hasOne(StoreOrderReturn, { foreignKey: 'orderId', as: 'returnRequest', onDelete: 'CASCADE' });
      StoreOrderReturn.belongsTo(StoreOrder, { foreignKey: 'orderId', as: 'order' });
    }

    if (StoreCheckoutIntent && StoreCheckoutItem && InventoryReservation && Product && User && UserAddress) {
      User.hasMany(StoreCheckoutIntent, { foreignKey: 'userId', as: 'storeCheckoutIntents' });
      StoreCheckoutIntent.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      StoreCheckoutIntent.belongsTo(UserAddress, { foreignKey: 'addressId', as: 'address' });
      if (Center) {
        Center.hasMany(StoreCheckoutIntent, { foreignKey: 'centerId', as: 'storeCheckoutIntents' });
        StoreCheckoutIntent.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
      }
      StoreCheckoutIntent.hasMany(StoreCheckoutItem, { foreignKey: 'checkoutIntentId', as: 'items' });
      StoreCheckoutItem.belongsTo(StoreCheckoutIntent, { foreignKey: 'checkoutIntentId', as: 'checkoutIntent' });
      StoreCheckoutItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
      StoreCheckoutIntent.hasMany(InventoryReservation, { foreignKey: 'checkoutIntentId', as: 'reservations' });
      InventoryReservation.belongsTo(StoreCheckoutIntent, { foreignKey: 'checkoutIntentId', as: 'checkoutIntent' });
      Product.hasMany(InventoryReservation, { foreignKey: 'productId', as: 'inventoryReservations' });
      InventoryReservation.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
      if (StoreOrder) {
        StoreCheckoutIntent.belongsTo(StoreOrder, { foreignKey: 'storeOrderId', as: 'storeOrder' });
        StoreOrder.hasOne(StoreCheckoutIntent, { foreignKey: 'storeOrderId', as: 'storeCheckoutIntent' });
      }
      if (Payment) {
        StoreCheckoutIntent.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' });
        Payment.belongsTo(StoreCheckoutIntent, { foreignKey: 'storeCheckoutIntentId', as: 'storeCheckoutIntent' });
      }
      if (Invoice) {
        StoreCheckoutIntent.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
      }
      if (Coupon) {
        Coupon.hasMany(StoreCheckoutIntent, { foreignKey: 'couponId', as: 'storeCheckoutIntents' });
        StoreCheckoutIntent.belongsTo(Coupon, { foreignKey: 'couponId', as: 'coupon' });
      }
    }

    if (User && CartItem) {
      User.hasMany(CartItem, { foreignKey: 'userId', as: 'cartItems' });
      CartItem.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (Product && CartItem) {
      Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });
      CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
    }

    if (Center && Product) {
      Center.hasMany(Product, { foreignKey: 'centerId', as: 'products' });
      Product.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
    }

    if (User && UserAddress) {
      User.hasMany(UserAddress, { foreignKey: 'userId', as: 'addresses' });
      UserAddress.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && StoreOrder) {
      User.hasMany(StoreOrder, { foreignKey: 'userId', as: 'orders', onDelete: 'RESTRICT' });
      StoreOrder.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'RESTRICT' });
    }

    if (UserAddress && StoreOrder) {
      UserAddress.hasMany(StoreOrder, { foreignKey: 'addressId', as: 'orders' });
      StoreOrder.belongsTo(UserAddress, { foreignKey: 'addressId', as: 'address' });
    }

    if (StoreOrder && Payment) {
      StoreOrder.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' });
      Payment.hasOne(StoreOrder, { foreignKey: 'paymentId', as: 'paidStoreOrder' });
      Payment.belongsTo(StoreOrder, { foreignKey: 'storeOrderId', as: 'storeOrder' });
    }

    if (StoreOrder && Invoice) {
      StoreOrder.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
      Invoice.hasOne(StoreOrder, { foreignKey: 'invoiceId', as: 'storeOrder' });
    }

    if (StoreOrder && StoreCheckoutIntent) {
      StoreOrder.belongsTo(StoreCheckoutIntent, { foreignKey: 'storeCheckoutIntentId', as: 'checkoutIntent' });
    }

    if (StoreOrder && StoreOrderItem) {
      StoreOrder.hasMany(StoreOrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });
      StoreOrderItem.belongsTo(StoreOrder, { foreignKey: 'orderId', as: 'order' });
    }

    if (Product && StoreOrderItem) {
      Product.hasMany(StoreOrderItem, { foreignKey: 'productId', as: 'orderItems' });
      StoreOrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
    }

    if (User && SupportTicket) {
      User.hasMany(SupportTicket, { foreignKey: 'userId', as: 'supportTickets' });
      SupportTicket.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (SupportTicket && SupportTicketMessage) {
      SupportTicket.hasMany(SupportTicketMessage, { foreignKey: 'ticketId', as: 'messages', onDelete: 'CASCADE' });
      SupportTicketMessage.belongsTo(SupportTicket, { foreignKey: 'ticketId', as: 'ticket' });
    }

    if (User && SupportTicketMessage) {
      User.hasMany(SupportTicketMessage, { foreignKey: 'senderId', as: 'supportTicketMessages' });
      SupportTicketMessage.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
    }

    if (User && HospitalBagItem) {
      User.hasMany(HospitalBagItem, { foreignKey: 'userId', as: 'hospitalBagItems' });
      HospitalBagItem.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && Appointment) {
      User.hasMany(Appointment, { foreignKey: 'userId', as: 'appointments' });
      Appointment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && MedicineReminder) {
      User.hasMany(MedicineReminder, { foreignKey: 'userId', as: 'medicineReminders' });
      MedicineReminder.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

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

      User.belongsTo(User, {
        foreignKey: "partnerId",
        as: "partner", // Alias for the association
      });

      if (LiveClassBooking) {
        User.hasMany(LiveClassBooking, { foreignKey: 'userId', as: 'liveClassBookings' });
        LiveClassBooking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      }
    }

    if (User && DietPreference) {
      User.hasOne(DietPreference, { foreignKey: 'userId', as: 'dietPreference' });
      DietPreference.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (User && UserMealPlan) {
      User.hasMany(UserMealPlan, { foreignKey: 'userId', as: 'mealPlans' });
      UserMealPlan.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (UserMealPlan && ContentItem) {
      ContentItem.hasMany(UserMealPlan, { foreignKey: 'contentItemId', as: 'mealPlans' });
      UserMealPlan.belongsTo(ContentItem, { foreignKey: 'contentItemId', as: 'contentItem' });
    }

    if (User && ShoppingListItem) {
      User.hasMany(ShoppingListItem, { foreignKey: 'userId', as: 'shoppingListItems' });
      ShoppingListItem.belongsTo(User, { foreignKey: 'userId', as: 'user' });
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

    if (LiveClass && LiveClassBooking) {
      LiveClass.hasMany(LiveClassBooking, { foreignKey: 'liveClassId', as: 'bookings' });
      LiveClassBooking.belongsTo(LiveClass, { foreignKey: 'liveClassId', as: 'liveClass' });
    }

    if (Center && LiveClass) {
      Center.hasMany(LiveClass, { foreignKey: 'centerId', as: 'liveClasses' });
      LiveClass.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
    }

    // New associations
    if (User && ForumPost) {
      User.hasMany(ForumPost, { foreignKey: 'userId', as: 'posts' });
      ForumPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    if (ForumGroup && ForumPost) {
      ForumGroup.hasMany(ForumPost, { foreignKey: 'groupId', as: 'posts' });
      ForumPost.belongsTo(ForumGroup, { foreignKey: 'groupId', as: 'group' });
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
      User.hasMany(Payment, { foreignKey: 'userId', as: 'payments', onDelete: 'RESTRICT' });
      Payment.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'RESTRICT' });
    }

    if (Center && Parameter) {
      Center.hasMany(Parameter, { foreignKey: 'centerId', as: 'parameters' });
      Parameter.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
    }

    if (User && RegisteredDevice) {
      User.hasMany(RegisteredDevice, { foreignKey: 'registeredBy', as: 'devices' });
      User.hasMany(RegisteredDevice, { foreignKey: 'approvedBy', as: 'approvedDevices' });
      RegisteredDevice.belongsTo(User, { foreignKey: 'registeredBy', as: 'user' });
      RegisteredDevice.belongsTo(User, { foreignKey: 'approvedBy', as: 'approver' });
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
      User.hasMany(ContentItem, { foreignKey: 'reviewedBy', as: 'reviewedContentItems' });
      ContentItem.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
      ContentItem.belongsTo(User, { foreignKey: 'updatedBy', as: 'updater' });
      ContentItem.belongsTo(User, { foreignKey: 'reviewedBy', as: 'reviewer' });
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
    if (QuizQuestion && QuizAttempt) {
      QuizQuestion.hasMany(QuizAttempt, { foreignKey: 'quizQuestionId', as: 'attempts' });
      QuizAttempt.belongsTo(QuizQuestion, { foreignKey: 'quizQuestionId', as: 'question' });
    }
    if (User && PartnerActivityLog) {
      User.hasMany(PartnerActivityLog, { foreignKey: 'userId', as: 'partnerActivityLogs' });
      PartnerActivityLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (PartnerActivity && PartnerActivityLog) {
      PartnerActivity.hasMany(PartnerActivityLog, { foreignKey: 'partnerActivityId', as: 'logs' });
      PartnerActivityLog.belongsTo(PartnerActivity, { foreignKey: 'partnerActivityId', as: 'activity' });
    }
    if (User && SensoryActivityLog) {
      User.hasMany(SensoryActivityLog, { foreignKey: 'userId', as: 'sensoryActivityLogs' });
      SensoryActivityLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (SensoryActivity && SensoryActivityLog) {
      SensoryActivity.hasMany(SensoryActivityLog, { foreignKey: 'sensoryActivityId', as: 'logs' });
      SensoryActivityLog.belongsTo(SensoryActivity, { foreignKey: 'sensoryActivityId', as: 'activity' });
    }
    if (User && AudioPlaylist) {
      User.hasMany(AudioPlaylist, { foreignKey: 'userId', as: 'audioPlaylists' });
      AudioPlaylist.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    if (AudioPlaylist && AudioPlaylistItem && ContentItem) {
      AudioPlaylist.hasMany(AudioPlaylistItem, { foreignKey: 'playlistId', as: 'items' });
      AudioPlaylistItem.belongsTo(AudioPlaylist, { foreignKey: 'playlistId', as: 'playlist' });
      ContentItem.hasMany(AudioPlaylistItem, { foreignKey: 'contentItemId', as: 'playlistItems' });
      AudioPlaylistItem.belongsTo(ContentItem, { foreignKey: 'contentItemId', as: 'contentItem' });
    }

    if (Invoice && User) {
      User.hasMany(Invoice, { foreignKey: 'userId', as: 'invoices', onDelete: 'RESTRICT' });
      Invoice.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'RESTRICT' });
    }

    if (Invoice && UserSubscription) {
      UserSubscription.hasMany(Invoice, { foreignKey: 'subscriptionId', as: 'invoices' });
      Invoice.belongsTo(UserSubscription, { foreignKey: 'subscriptionId', as: 'subscription' });
    }

    if (Invoice && Payment) {
      Payment.hasOne(Invoice, { foreignKey: 'paymentId', as: 'invoice' });
      Invoice.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' });
    }

    if (FinancialTransaction && User) {
      User.hasMany(FinancialTransaction, { foreignKey: 'userId', as: 'financialTransactions', onDelete: 'RESTRICT' });
      FinancialTransaction.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'RESTRICT' });
    }

    if (FinancialTransaction && Center) {
      Center.hasMany(FinancialTransaction, { foreignKey: 'centerId', as: 'financialTransactions' });
      FinancialTransaction.belongsTo(Center, { foreignKey: 'centerId', as: 'center' });
    }

    if (FinancialTransaction && Payment) {
      Payment.hasMany(FinancialTransaction, { foreignKey: 'paymentId', as: 'financialTransactions' });
      FinancialTransaction.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' });
    }

    if (FinancialTransaction && Invoice) {
      Invoice.hasMany(FinancialTransaction, { foreignKey: 'invoiceId', as: 'financialTransactions' });
      FinancialTransaction.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
    }

    if (ReportTemplate && User) {
      User.hasMany(ReportTemplate, { foreignKey: 'createdBy', as: 'reportTemplates' });
      ReportTemplate.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
    }

    if (ReportSchedule && ReportTemplate) {
      ReportTemplate.hasMany(ReportSchedule, { foreignKey: 'templateId', as: 'schedules', onDelete: 'CASCADE' });
      ReportSchedule.belongsTo(ReportTemplate, { foreignKey: 'templateId', as: 'template' });
    }

    if (ReportSchedule && User) {
      User.hasMany(ReportSchedule, { foreignKey: 'createdBy', as: 'reportSchedules' });
      ReportSchedule.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
    }

    if (SystemSetting && User) {
      SystemSetting.belongsTo(User, { foreignKey: 'updatedBy', as: 'updater' });
    }

    if (FeatureFlag && User) {
      FeatureFlag.belongsTo(User, { foreignKey: 'updatedBy', as: 'updater' });
    }

    if (LocaleString && User) {
      LocaleString.belongsTo(User, { foreignKey: 'updatedBy', as: 'updater' });
    }

    if (StaffInvitation) {
      if (Role) {
        StaffInvitation.belongsTo(Role, { foreignKey: 'roleId', as: 'role', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
        Role.hasMany(StaffInvitation, { foreignKey: 'roleId', as: 'staffInvitations' });
      }
      if (Center) {
        StaffInvitation.belongsTo(Center, { foreignKey: 'centerId', as: 'center', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
        Center.hasMany(StaffInvitation, { foreignKey: 'centerId', as: 'staffInvitations' });
      }
      if (User) {
        StaffInvitation.belongsTo(User, { foreignKey: 'createdBy', as: 'creator', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
        User.hasMany(StaffInvitation, { foreignKey: 'createdBy', as: 'createdInvitations' });
      }
    }

    if (InventoryMovement) {
      if (Product) {
        InventoryMovement.belongsTo(Product, { foreignKey: 'productId', as: 'product', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
        Product.hasMany(InventoryMovement, { foreignKey: 'productId', as: 'inventoryMovements' });
      }
      if (Center) {
        InventoryMovement.belongsTo(Center, { foreignKey: 'centerId', as: 'center', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
        Center.hasMany(InventoryMovement, { foreignKey: 'centerId', as: 'inventoryMovements' });
      }
      if (User) {
        InventoryMovement.belongsTo(User, { foreignKey: 'performedBy', as: 'performer', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
        User.hasMany(InventoryMovement, { foreignKey: 'performedBy', as: 'performedMovements' });
      }
    }
  }
}
