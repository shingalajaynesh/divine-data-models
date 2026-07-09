import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FeatureFlag extends Model {
    static associate(models) {
      FeatureFlag.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updater',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  FeatureFlag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_enabled',
      },
      rules: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: null,
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
      modelName: 'FeatureFlag',
      tableName: 'feature_flags',
      underscored: true,
      timestamps: true
    }
  );

  return FeatureFlag;
};
