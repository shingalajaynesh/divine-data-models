import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StoreOrder extends Model {
    static associate(models) {
      StoreOrder.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      StoreOrder.belongsTo(models.UserAddress, {
        foreignKey: 'addressId',
        as: 'address',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
      StoreOrder.hasMany(models.StoreOrderItem, {
        foreignKey: 'orderId',
        as: 'items',
        onDelete: 'CASCADE'
      });
    }
  }

  StoreOrder.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      addressId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'address_id',
        references: {
          model: 'user_addresses',
          key: 'id'
        }
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'total_amount',
      },
      status: {
        type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      }
    },
    {
      sequelize,
      modelName: 'StoreOrder',
      tableName: 'store_orders',
      underscored: true,
      timestamps: true
    }
  );

  return StoreOrder;
};
