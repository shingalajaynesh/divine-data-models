import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReplicationStatus extends Model {}

  ReplicationStatus.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      nodeName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'node_name'
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lagMs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'lag_ms'
      },
      isHealthy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_healthy'
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'ReplicationStatus',
      tableName: 'replication_statuses',
      underscored: true,
      timestamps: true
    }
  );

  return ReplicationStatus;
};
