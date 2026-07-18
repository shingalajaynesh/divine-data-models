import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CouponRedemption extends Model {}

  CouponRedemption.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      couponId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'coupon_id',
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      checkoutIntentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'checkout_intent_id',
      },
      paymentId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'payment_id',
      },
      redeemedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'redeemed_at',
      },
    },
    {
      sequelize,
      tableName: 'coupon_redemptions',
      modelName: 'CouponRedemption',
      timestamps: true,
      underscored: true,
    }
  );

  return CouponRedemption;
};
