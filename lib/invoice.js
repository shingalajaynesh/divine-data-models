import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Invoice.belongsTo(models.UserSubscription, {
        foreignKey: 'subscriptionId',
        as: 'subscription',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
      Invoice.belongsTo(models.Payment, {
        foreignKey: 'paymentId',
        as: 'payment',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  Invoice.init(
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
      subscriptionId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'subscription_id',
        references: {
          model: 'user_subscriptions',
          key: 'id'
        }
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
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'unpaid',
      },
      invoiceNumber: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'invoice_number',
      },
      billingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'billing_date',
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'due_date',
      }
    },
    {
      sequelize,
      modelName: 'Invoice',
      tableName: 'invoices',
      underscored: true,
      timestamps: true
    }
  );

  return Invoice;
};
