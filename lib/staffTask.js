import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StaffTask extends Model {
    static associate(models) {
      StaffTask.belongsTo(models.User, {
        foreignKey: 'staffId',
        as: 'staff',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      StaffTask.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  StaffTask.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      staffId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'staff_id',
        references: {
          model: 'users',
          key: 'id'
        }
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
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'due_date'
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'StaffTask',
      tableName: 'staff_tasks',
      underscored: true,
      timestamps: true
    }
  );

  return StaffTask;
};
