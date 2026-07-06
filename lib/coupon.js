import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      // Associations can be defined here
    }
  }

  Coupon.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      discountPercent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'discount_percent',
      },
      discountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'discount_amount',
      },
      validFrom: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'valid_from',
      },
      validUntil: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'valid_until',
      },
      maxRedemptions: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'max_redemptions',
      },
      redemptionsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'redemptions_count',
      }
    },
    {
      sequelize,
      modelName: 'Coupon',
      tableName: 'coupons',
      underscored: true,
      timestamps: true
    }
  );

  return Coupon;
};
