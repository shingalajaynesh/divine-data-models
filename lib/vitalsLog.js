import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class VitalsLog extends Model {
    static associate(models) {
      VitalsLog.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  VitalsLog.init(
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
        references: {
          model: 'users',
          key: 'id'
        }
      },
      weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      systolicBp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      diastolicBp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kickCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bloodSugar: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      symptoms: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]',
      },
      mood: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sleepHours: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'sleep_hours'
      },
      hydrationWater: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'hydration_water'
      },
      nutritionCalories: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'nutrition_calories'
      },
      nutritionMealNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'nutrition_meal_notes'
      },
      loggedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      sequelize,
      modelName: 'VitalsLog',
      tableName: 'vitals_logs',
      underscored: true,
      timestamps: true,
      paranoid: true,
      indexes: [
        { fields: ['user_id'] }
      ]
    }
  );

  return VitalsLog;
};
