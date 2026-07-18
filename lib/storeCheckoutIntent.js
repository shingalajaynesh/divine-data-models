import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StoreCheckoutIntent extends Model {}

  StoreCheckoutIntent.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' } },
      centerId: { type: DataTypes.UUID, allowNull: true, field: 'center_id', references: { model: 'centers', key: 'id' } },
      addressId: { type: DataTypes.UUID, allowNull: false, field: 'address_id', references: { model: 'user_addresses', key: 'id' } },
      currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: 'INR' },
      subtotalMinor: { type: DataTypes.INTEGER, allowNull: false, field: 'subtotal_minor' },
      discountMinor: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'discount_minor' },
      taxMinor: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'tax_minor' },
      shippingMinor: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'shipping_minor' },
      totalMinor: { type: DataTypes.INTEGER, allowNull: false, field: 'total_minor' },
      couponId: { type: DataTypes.UUID, allowNull: true, field: 'coupon_id', references: { model: 'coupons', key: 'id' } },
      couponCode: { type: DataTypes.STRING(100), allowNull: true, field: 'coupon_code' },
      razorpayOrderId: { type: DataTypes.STRING, allowNull: true, field: 'razorpay_order_id' },
      razorpayPaymentId: { type: DataTypes.STRING, allowNull: true, field: 'razorpay_payment_id' },
      receipt: { type: DataTypes.STRING(100), allowNull: false },
      status: { type: DataTypes.STRING(50), allowNull: false },
      expiresAt: { type: DataTypes.DATE, allowNull: false, field: 'expires_at' },
      clientVerifiedAt: { type: DataTypes.DATE, allowNull: true, field: 'client_verified_at' },
      providerConfirmedAt: { type: DataTypes.DATE, allowNull: true, field: 'provider_confirmed_at' },
      storeOrderId: { type: DataTypes.UUID, allowNull: true, field: 'store_order_id', references: { model: 'store_orders', key: 'id' } },
      paymentId: { type: DataTypes.UUID, allowNull: true, field: 'payment_id', references: { model: 'payments', key: 'id' } },
      invoiceId: { type: DataTypes.UUID, allowNull: true, field: 'invoice_id', references: { model: 'invoices', key: 'id' } },
      failureCode: { type: DataTypes.STRING(100), allowNull: true, field: 'failure_code' },
      failureMessage: { type: DataTypes.STRING(500), allowNull: true, field: 'failure_message' },
    },
    {
      sequelize,
      tableName: 'store_checkout_intents',
      modelName: 'StoreCheckoutIntent',
      timestamps: true,
      underscored: true,
      indexes: [
        { unique: true, fields: ['receipt'] },
        { unique: true, fields: ['razorpay_order_id'] },
        { unique: true, fields: ['store_order_id'] },
        { fields: ['user_id', 'status'] },
        { fields: ['coupon_id'] },
        { fields: ['payment_id'] },
        { fields: ['invoice_id'] }
      ],
    }
  );

  return StoreCheckoutIntent;
};
