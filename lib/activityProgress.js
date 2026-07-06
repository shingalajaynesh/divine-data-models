import { Model } from 'sequelize';

const PROGRESS_STATUSES = ['not_started', 'in_progress', 'completed', 'skipped'];

export default (sequelize, DataTypes) => {
  class ActivityProgress extends Model {}
  ActivityProgress.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    enrollmentId: { type: DataTypes.UUID, allowNull: false, field: 'enrollment_id' },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    activityId: { type: DataTypes.UUID, allowNull: false, field: 'activity_id' },
    status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'not_started', validate: { isIn: [PROGRESS_STATUSES] } },
    attempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
    score: { type: DataTypes.DECIMAL(5, 2), allowNull: true, validate: { min: 0, max: 100 } },
    durationSeconds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'duration_seconds', validate: { min: 0 } },
    lastPositionSeconds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'last_position_seconds', validate: { min: 0 } },
    notes: { type: DataTypes.TEXT, allowNull: true },
    evidenceUrl: { type: DataTypes.STRING(1000), allowNull: true, field: 'evidence_url', validate: { isUrl: true } },
    startedAt: { type: DataTypes.DATE, allowNull: true, field: 'started_at' },
    completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' },
  }, {
    sequelize,
    modelName: 'ActivityProgress',
    tableName: 'activity_progress',
    timestamps: true,
    underscored: true,
    indexes: [{ unique: true, fields: ['enrollment_id', 'activity_id'] }],
    validate: {
      completedStateHasTimestamp() {
        if (this.status === 'completed' && !this.completedAt) {
          throw new Error('Completed activity requires completedAt');
        }
      },
    },
  });
  return ActivityProgress;
};
