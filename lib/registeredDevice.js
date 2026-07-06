import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RegisteredDevice extends Model { }
  RegisteredDevice.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'device_id',
      },
      deviceName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'device_name',
      },
      deviceType: {
        type: DataTypes.STRING, // 'mobile', 'tablet', 'desktop', 'web', 'unknown'
        allowNull: false,
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
      userAgent: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'user_agent',
      },
      deviceFingerprint: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'device_fingerprint',
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ip_address',
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING, // 'pending', 'approved', 'rejected', 'suspended'
        allowNull: false,
        defaultValue: 'pending',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
      },
      registeredBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'registered_by',
      },
      approvedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'approved_by',
      },
      approvedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'approved_at',
      },
      lastSeenAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_seen_at',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'registered_devices',
      modelName: 'RegisteredDevice',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['device_id', 'registered_by']
        },
        {
          fields: ['status']
        },
        {
          fields: ['is_active']
        }
      ]
    }
  );
  return RegisteredDevice;
};
