import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserSession extends Model { }
  UserSession.init(
    {
      id: {
        type: DataTypes.STRING(255),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ip_address',
      },
      userAgent: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'user_agent',
      },
      deviceType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'web',
        field: 'device_type',
      },
      browser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      operatingSystem: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'operating_system',
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
      },
      lastAccessedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'last_accessed_at',
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'expired_at',
      },
    },
    {
      sequelize,
      tableName: 'user_sessions',
      modelName: 'UserSession',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['user_id']
        },
        {
          fields: ['is_active']
        },
        {
          fields: ['last_accessed_at']
        }
      ]
    }
  );
  return UserSession;
};
