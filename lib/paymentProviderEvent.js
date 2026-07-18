import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PaymentProviderEvent extends Model {}

  PaymentProviderEvent.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      provider: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      providerEventId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'provider_event_id',
      },
      eventType: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'event_type',
      },
      payloadHash: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'payload_hash',
      },
      signatureHash: {
        type: DataTypes.STRING(64),
        allowNull: true,
        field: 'signature_hash',
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
      razorpayRefundId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'razorpay_refund_id',
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
      processingStatus: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'processing_status',
      },
      processingAttempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'processing_attempts',
      },
      firstReceivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'first_received_at',
      },
      lastReceivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'last_received_at',
      },
      processingStartedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'processing_started_at',
      },
      processedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'processed_at',
      },
      nextRetryAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'next_retry_at',
      },
      lastErrorCode: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'last_error_code',
      },
      lastErrorMessage: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'last_error_message',
      },
      correlationId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'correlation_id',
      },
    },
    {
      sequelize,
      tableName: 'payment_provider_events',
      modelName: 'PaymentProviderEvent',
      timestamps: true,
      underscored: true,
      indexes: [
        { unique: true, fields: ['provider', 'provider_event_id'] },
        { fields: ['processing_status', 'next_retry_at'] },
        { fields: ['razorpay_order_id'] },
        { fields: ['razorpay_payment_id'] },
        { fields: ['store_checkout_intent_id'] }
      ],
    }
  );

  return PaymentProviderEvent;
};
