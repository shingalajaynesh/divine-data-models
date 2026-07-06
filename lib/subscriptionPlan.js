import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SubscriptionPlan extends Model {
    static associate(models) {
      // Associations can be defined here
    }
  }

  SubscriptionPlan.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      billingPeriod: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'monthly',
        field: 'billing_period',
      },
      trialDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 7,
        field: 'trial_days',
      },
      features: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      }
    },
    {
      sequelize,
      modelName: 'SubscriptionPlan',
      tableName: 'subscription_plans',
      underscored: true,
      timestamps: true
    }
  );

  return SubscriptionPlan;
};
