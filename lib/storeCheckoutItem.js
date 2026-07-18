import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StoreCheckoutItem extends Model {}

  StoreCheckoutItem.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      checkoutIntentId: { type: DataTypes.UUID, allowNull: false, field: 'checkout_intent_id' },
      productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id' },
      sku: { type: DataTypes.STRING(100), allowNull: true },
      productName: { type: DataTypes.STRING(255), allowNull: false, field: 'product_name' },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      unitPriceMinor: { type: DataTypes.INTEGER, allowNull: false, field: 'unit_price_minor' },
      lineDiscountMinor: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'line_discount_minor' },
      taxMinor: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'tax_minor' },
      lineTotalMinor: { type: DataTypes.INTEGER, allowNull: false, field: 'line_total_minor' },
      metadata: { type: DataTypes.JSONB, allowNull: true },
    },
    {
      sequelize,
      tableName: 'store_checkout_items',
      modelName: 'StoreCheckoutItem',
      timestamps: true,
      underscored: true,
    }
  );

  return StoreCheckoutItem;
};
