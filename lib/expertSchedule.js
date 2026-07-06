import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ExpertSchedule extends Model {
    static associate(models) {
      ExpertSchedule.belongsTo(models.User, {
        foreignKey: 'expertId',
        as: 'expert',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  ExpertSchedule.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      expertId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      dayOfWeek: {
        type: DataTypes.INTEGER, // 0 (Sunday) to 6 (Saturday)
        allowNull: false,
      },
      startTime: {
        type: DataTypes.STRING, // e.g. "09:00"
        allowNull: false,
      },
      endTime: {
        type: DataTypes.STRING, // e.g. "17:00"
        allowNull: false,
      },
      slotDurationMins: {
        type: DataTypes.INTEGER, // e.g. 30
        allowNull: false,
        defaultValue: 30,
      }
    },
    {
      sequelize,
      modelName: 'ExpertSchedule',
      tableName: 'expert_schedules',
      underscored: true,
      timestamps: true,
      paranoid: true
    }
  );

  return ExpertSchedule;
};
