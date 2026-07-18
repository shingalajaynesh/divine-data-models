import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StoreOrderReturn extends Model {
    static associate(models) {
      StoreOrderReturn.belongsTo(models.StoreOrder, {
        foreignKey: 'orderId',
        as: 'order',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  StoreOrderReturn.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'order_id',
        references: {
          model: 'store_orders',
          key: 'id'
        }
      },
      reason: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('requested', 'approved', 'rejected', 'refunded'),
        allowNull: false,
        defaultValue: 'requested',
      },
      adminNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'admin_notes',
      }
    },
    {
      sequelize,
      modelName: 'StoreOrderReturn',
      tableName: 'store_order_returns',
      underscored: true,
      timestamps: true,
      indexes: [
        { fields: ['order_id', 'status'] }
      ]
    }
  );

  return StoreOrderReturn;
};
