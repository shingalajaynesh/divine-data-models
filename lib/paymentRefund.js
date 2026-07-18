import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PaymentRefund extends Model {}

  PaymentRefund.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      paymentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'payment_id',
      },
      checkoutIntentId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'checkout_intent_id',
      },
      razorpayPaymentId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'razorpay_payment_id',
      },
      razorpayRefundId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'razorpay_refund_id',
      },
      requestedAmountMinor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'requested_amount_minor',
      },
      processedAmountMinor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'processed_amount_minor',
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'INR',
      },
      reason: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      requestedByUserId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'requested_by_user_id',
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      providerStatus: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'provider_status',
      },
      idempotencyKey: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'idempotency_key',
      },
      failureCode: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'failure_code',
      },
      failureMessage: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'failure_message',
      },
      requestedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'requested_at',
      },
      processedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'processed_at',
      },
      financialTransactionId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'financial_transaction_id',
      },
      invoiceId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'invoice_id',
      },
    },
    {
      sequelize,
      tableName: 'payment_refunds',
      modelName: 'PaymentRefund',
      timestamps: true,
      underscored: true,
    }
  );

  return PaymentRefund;
};
