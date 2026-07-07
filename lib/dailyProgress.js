import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DailyProgress extends Model {}
  DailyProgress.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    dayNumber: { type: DataTypes.INTEGER, allowNull: false, field: 'day_number', validate: { min: 1, max: 280 } },
    pqCompleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'pq_completed' },
    iqCompleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'iq_completed' },
    eqCompleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'eq_completed' },
    sqCompleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'sq_completed' },
    pqDurationMins: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0, field: 'pq_duration_mins' },
    iqDurationMins: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0, field: 'iq_duration_mins' },
    eqDurationMins: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0, field: 'eq_duration_mins' },
    sqDurationMins: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0, field: 'sq_duration_mins' },
    pqEvidence: { type: DataTypes.TEXT, allowNull: true, field: 'pq_evidence' },
    iqEvidence: { type: DataTypes.TEXT, allowNull: true, field: 'iq_evidence' },
    eqEvidence: { type: DataTypes.TEXT, allowNull: true, field: 'eq_evidence' },
    sqEvidence: { type: DataTypes.TEXT, allowNull: true, field: 'sq_evidence' },
    pqNotes: { type: DataTypes.TEXT, allowNull: true, field: 'pq_notes' },
    iqNotes: { type: DataTypes.TEXT, allowNull: true, field: 'iq_notes' },
    eqNotes: { type: DataTypes.TEXT, allowNull: true, field: 'eq_notes' },
    sqNotes: { type: DataTypes.TEXT, allowNull: true, field: 'sq_notes' },
    pqFeedback: { type: DataTypes.TEXT, allowNull: true, field: 'pq_feedback' },
    iqFeedback: { type: DataTypes.TEXT, allowNull: true, field: 'iq_feedback' },
    eqFeedback: { type: DataTypes.TEXT, allowNull: true, field: 'eq_feedback' },
    sqFeedback: { type: DataTypes.TEXT, allowNull: true, field: 'sq_feedback' },
    notes: { type: DataTypes.TEXT, allowNull: true },
    completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' },
  }, {
    sequelize,
    modelName: 'DailyProgress',
    tableName: 'daily_progress',
    timestamps: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['user_id', 'day_number'] }
    ]
  });
  return DailyProgress;
};
