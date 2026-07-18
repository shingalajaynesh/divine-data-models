import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Payment extends Model { }
  Payment.init(
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
      stripeSessionId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'stripe_session_id',
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
      razorpaySignature: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'razorpay_signature',
      },
      checkoutIntentId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'checkout_intent_id',
        references: {
          model: 'payment_checkout_intents',
          key: 'id'
        }
      },
      storeCheckoutIntentId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'store_checkout_intent_id',
        references: {
          model: 'store_checkout_intents',
          key: 'id'
        }
      },
      storeOrderId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'store_order_id',
        references: {
          model: 'store_orders',
          key: 'id'
        }
      },
      purpose: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      providerStatus: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'provider_status',
      },
      amountMinor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'amount_minor',
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'INR',
      },
      totalRefundedMinor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'total_refunded_minor',
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING, // 'pending', 'succeeded', 'failed'
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'payments',
      modelName: 'Payment',
      timestamps: true,
      paranoid: true,
      underscored: true,
      indexes: [
        { fields: ['user_id'] },
        { unique: true, fields: ['razorpay_order_id'] },
        { unique: true, fields: ['razorpay_payment_id'] },
        { unique: true, fields: ['checkout_intent_id'] },
        { fields: ['store_checkout_intent_id'] },
        { fields: ['store_order_id'] },
        { fields: ['status', 'created_at'] }
      ]
    }
  );
  return Payment;
};
