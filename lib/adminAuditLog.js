import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AdminAuditLog extends Model {
    static associate(models) {
      AdminAuditLog.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  AdminAuditLog.init(
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
      action: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      targetType: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'target_type',
      },
      targetId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'target_id',
      },
      payload: {
        type: DataTypes.JSONB,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'AdminAuditLog',
      tableName: 'admin_audit_logs',
      underscored: true,
      timestamps: true,
      updatedAt: false // only created at is needed for audit trails
    }
  );

  return AdminAuditLog;
};
