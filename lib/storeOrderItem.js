import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StoreOrderItem extends Model {
    static associate(models) {
      StoreOrderItem.belongsTo(models.StoreOrder, {
        foreignKey: 'orderId',
        as: 'order',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      StoreOrderItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  StoreOrderItem.init(
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
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'StoreOrderItem',
      tableName: 'store_order_items',
      underscored: true,
      timestamps: true
    }
  );

  return StoreOrderItem;
};
