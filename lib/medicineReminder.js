import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class MedicineReminder extends Model {
    static associate(models) {
      MedicineReminder.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  MedicineReminder.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dosage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeOfDay: {
        type: DataTypes.STRING, // e.g. "08:00"
        allowNull: false,
        field: 'time_of_day',
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    },
    {
      sequelize,
      modelName: 'MedicineReminder',
      tableName: 'medicine_reminders',
      underscored: true,
      timestamps: true,
      indexes: [
        { fields: ['user_id', 'active', 'time_of_day'] }
      ]
    }
  );

  return MedicineReminder;
};
