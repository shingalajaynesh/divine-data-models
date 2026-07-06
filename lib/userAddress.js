import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserAddress extends Model {
    static associate(models) {
      UserAddress.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  UserAddress.init(
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
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'full_name',
      },
      addressLine1: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'address_line1',
      },
      addressLine2: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'address_line2',
      },
      city: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'postal_code',
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'UserAddress',
      tableName: 'user_addresses',
      underscored: true,
      timestamps: true
    }
  );

  return UserAddress;
};
