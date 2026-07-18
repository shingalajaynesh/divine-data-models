import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Appointment.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doctorName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'doctor_name',
      },
      appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'appointment_date',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointments',
      underscored: true,
      timestamps: true,
      indexes: [
        { fields: ['user_id', 'appointment_date'] }
      ]
    }
  );

  return Appointment;
};
