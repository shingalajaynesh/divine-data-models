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
      paranoid: true
    }
  );

  return VitalsLog;
};
