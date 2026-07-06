import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ConsultationBooking extends Model {
    static associate(models) {
      ConsultationBooking.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      ConsultationBooking.belongsTo(models.User, {
        foreignKey: 'expertId',
        as: 'expert',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  ConsultationBooking.init(
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
      expertId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      scheduleSlot: {
        type: DataTypes.DATE, // slot timestamp
        allowNull: false,
      },
      videoCallUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING, // 'pending', 'confirmed', 'cancelled'
        allowNull: false,
        defaultValue: 'confirmed',
      },
      caseNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'case_notes',
      },
      followUpTasks: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'follow_up_tasks',
      }
    },
    {
      sequelize,
      modelName: 'ConsultationBooking',
      tableName: 'consultation_bookings',
      underscored: true,
      timestamps: true,
      paranoid: true
    }
  );

  return ConsultationBooking;
};
