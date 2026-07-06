import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserSubscription extends Model {
    static associate(models) {
      UserSubscription.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      UserSubscription.belongsTo(models.SubscriptionPlan, {
        foreignKey: 'planId',
        as: 'plan',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  UserSubscription.init(
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
      planId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'plan_id',
        references: {
          model: 'subscription_plans',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.ENUM('trialing', 'active', 'cancelled', 'expired'),
        allowNull: false,
        defaultValue: 'trialing',
      },
      trialStartDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'trial_start_date',
      },
      trialEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'trial_end_date',
      },
      currentPeriodStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'current_period_start_date',
      },
      currentPeriodEndDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'current_period_end_date',
      },
      cancelledAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'cancelled_at',
      }
    },
    {
      sequelize,
      modelName: 'UserSubscription',
      tableName: 'user_subscriptions',
      underscored: true,
      timestamps: true
    }
  );

  return UserSubscription;
};
