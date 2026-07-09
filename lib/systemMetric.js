import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SystemMetric extends Model {}

  SystemMetric.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      metricType: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'metric_type'
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'SystemMetric',
      tableName: 'system_metrics',
      underscored: true,
      timestamps: true
    }
  );

  return SystemMetric;
};
