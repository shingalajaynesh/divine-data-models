import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LocaleString extends Model {
    static associate(models) {
      LocaleString.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updater',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  LocaleString.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      lang: {
        type: DataTypes.ENUM('en', 'hi'),
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      modelName: 'LocaleString',
      tableName: 'locale_strings',
      underscored: true,
      timestamps: true
    }
  );

  return LocaleString;
};
