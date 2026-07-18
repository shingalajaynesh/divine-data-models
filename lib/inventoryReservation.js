import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class InventoryReservation extends Model {}

  InventoryReservation.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id' },
      checkoutIntentId: { type: DataTypes.UUID, allowNull: false, field: 'checkout_intent_id' },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING(50), allowNull: false },
      reservedAt: { type: DataTypes.DATE, allowNull: false, field: 'reserved_at' },
      expiresAt: { type: DataTypes.DATE, allowNull: false, field: 'expires_at' },
      releasedAt: { type: DataTypes.DATE, allowNull: true, field: 'released_at' },
      consumedAt: { type: DataTypes.DATE, allowNull: true, field: 'consumed_at' },
    },
    {
      sequelize,
      tableName: 'inventory_reservations',
      modelName: 'InventoryReservation',
      timestamps: true,
      underscored: true,
    }
  );

  return InventoryReservation;
};
