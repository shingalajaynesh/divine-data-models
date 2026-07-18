import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class InventoryMovement extends Model {
    static associate(models) {
      InventoryMovement.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
      InventoryMovement.belongsTo(models.Center, {
        foreignKey: 'centerId',
        as: 'center',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
      InventoryMovement.belongsTo(models.User, {
        foreignKey: 'performedBy',
        as: 'performer',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }

  InventoryMovement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'product_id',
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'center_id',
      },
      reasonCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'reason_code',
      },
      reasonNote: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'reason_note',
      },
      quantityBefore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quantity_before',
      },
      quantityChange: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quantity_change',
      },
      quantityAfter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quantity_after',
      },
      referenceType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'reference_type',
      },
      referenceId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'reference_id',
      },
      performedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'performed_by',
      },
      requestCorrelationId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'request_correlation_id',
      },
    },
    {
      sequelize,
      modelName: 'InventoryMovement',
      tableName: 'inventory_movements',
      underscored: true,
      timestamps: true,
    }
  );

  return InventoryMovement;
};
