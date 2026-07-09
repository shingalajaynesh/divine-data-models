import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FinancialTransaction extends Model {
    static associate(models) {
      FinancialTransaction.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
      FinancialTransaction.belongsTo(models.Center, {
        foreignKey: 'centerId',
        as: 'center',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
      FinancialTransaction.belongsTo(models.Payment, {
        foreignKey: 'paymentId',
        as: 'payment',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
      FinancialTransaction.belongsTo(models.Invoice, {
        foreignKey: 'invoiceId',
        as: 'invoice',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  FinancialTransaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'center_id',
        references: {
          model: 'centers',
          key: 'id'
        }
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('payment', 'refund', 'settlement', 'reconciliation'),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'completed',
      },
      centerShare: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        field: 'center_share',
      },
      platformShare: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        field: 'platform_share',
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
      reconciledAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'reconciled_at',
      },
      reconciliationNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'reconciliation_notes',
      }
    },
    {
      sequelize,
      modelName: 'FinancialTransaction',
      tableName: 'financial_transactions',
      underscored: true,
      timestamps: true
    }
  );

  return FinancialTransaction;
};
