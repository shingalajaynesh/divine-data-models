import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StaffInvitation extends Model {
    static associate(models) {
      StaffInvitation.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
      StaffInvitation.belongsTo(models.Center, {
        foreignKey: 'centerId',
        as: 'center',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
      StaffInvitation.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }

  StaffInvitation.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email_address',
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'role_id',
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'center_id',
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'INVITED',
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at',
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'created_by',
      },
    },
    {
      sequelize,
      modelName: 'StaffInvitation',
      tableName: 'staff_invitations',
      underscored: true,
      timestamps: true,
    }
  );

  return StaffInvitation;
};
