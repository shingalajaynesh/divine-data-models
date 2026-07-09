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
      },
      intakeForm: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'intake_form',
      },
      prescriptions: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'prescriptions',
      },
      documents: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'documents',
      },
      followUpDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'follow_up_date',
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
