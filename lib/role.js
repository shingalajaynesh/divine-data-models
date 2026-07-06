import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Role extends Model { }
  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roleType: {
        type: DataTypes.ENUM('GUIDE', 'STAFF', 'ADMIN', 'MOTHER'),
        allowNull: false,
      },
      permissions: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      isSystemDefine: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'roles',
      modelName: 'Role',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  return Role;
};
