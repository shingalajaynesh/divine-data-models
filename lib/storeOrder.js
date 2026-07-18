import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StoreOrder extends Model {
    static associate(models) {
      StoreOrder.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'RESTRICT',
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
      StoreOrder.hasOne(models.StoreOrderReturn, {
        foreignKey: 'orderId',
        as: 'returnRequest',
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
      totalAmountMinor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'total_amount_minor',
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'INR',
      },
      paymentStatus: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'pending',
        field: 'payment_status',
      },
      paymentId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'payment_id',
        references: {
          model: 'payments',
          key: 'id'
        }
      },
      invoiceId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'invoice_id',
        references: {
          model: 'invoices',
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
      status: {
        type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      carrier: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      trackingNumber: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'tracking_number',
      },
      estimatedDeliveryDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'estimated_delivery_date',
      },
      shippedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'shipped_at',
      },
      deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'delivered_at',
      }
    },
    {
      sequelize,
      modelName: 'StoreOrder',
      tableName: 'store_orders',
      underscored: true,
      timestamps: true,
      indexes: [
        { fields: ['user_id', 'created_at'] },
        { fields: ['payment_status', 'created_at'] },
        { fields: ['payment_id'] },
        { fields: ['invoice_id'] },
        { unique: true, fields: ['store_checkout_intent_id'] }
      ]
    }
  );

  return StoreOrder;
};
