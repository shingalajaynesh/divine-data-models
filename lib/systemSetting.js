import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SystemSetting extends Model {
    static associate(models) {
      SystemSetting.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updater',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  SystemSetting.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'updated_by',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'SystemSetting',
      tableName: 'system_settings',
      underscored: true,
      timestamps: true
    }
  );

  return SystemSetting;
};
