import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class QueryPerformanceAudit extends Model {}

  QueryPerformanceAudit.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      sqlQuery: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'sql_query'
      },
      durationMs: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'duration_ms'
      },
      thresholdMs: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'threshold_ms'
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'QueryPerformanceAudit',
      tableName: 'query_performance_audits',
      underscored: true,
      timestamps: true
    }
  );

  return QueryPerformanceAudit;
};
