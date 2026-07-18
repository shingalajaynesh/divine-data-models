import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PaymentCheckoutIntent extends Model {}

  PaymentCheckoutIntent.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'center_id',
      },
      subscriptionPlanId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'subscription_plan_id',
      },
      couponId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'coupon_id',
      },
      razorpayOrderId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'razorpay_order_id',
      },
      razorpayPaymentId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'razorpay_payment_id',
      },
      expectedAmountMinor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'expected_amount_minor',
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'INR',
      },
      purpose: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      receipt: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at',
      },
      verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'verified_at',
      },
      processedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'processed_at',
      },
      providerConfirmedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'provider_confirmed_at',
      },
      providerStatus: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'provider_status',
      },
      totalRefundedMinor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'total_refunded_minor',
      },
      paymentId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'payment_id',
      },
      invoiceId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'invoice_id',
      },
      failureReason: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'failure_reason',
      },
    },
    {
      sequelize,
      tableName: 'payment_checkout_intents',
      modelName: 'PaymentCheckoutIntent',
      timestamps: true,
      underscored: true,
    }
  );

  return PaymentCheckoutIntent;
};
