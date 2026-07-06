import { Model } from 'sequelize';

const ENROLLMENT_STATUSES = ['active', 'paused', 'completed', 'cancelled'];

export default (sequelize, DataTypes) => {
  class ProgramEnrollment extends Model {}
  ProgramEnrollment.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    programId: { type: DataTypes.UUID, allowNull: false, field: 'program_id' },
    status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'active', validate: { isIn: [ENROLLMENT_STATUSES] } },
    source: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'manual' },
    enrolledAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'enrolled_at' },
    startedAt: { type: DataTypes.DATE, allowNull: true, field: 'started_at' },
    completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' },
    accessStartsAt: { type: DataTypes.DATE, allowNull: true, field: 'access_starts_at' },
    accessEndsAt: { type: DataTypes.DATE, allowNull: true, field: 'access_ends_at' },
  }, {
    sequelize,
    modelName: 'ProgramEnrollment',
    tableName: 'program_enrollments',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{ unique: true, fields: ['user_id', 'program_id'] }],
    validate: {
      validAccessWindow() {
        if (this.accessStartsAt && this.accessEndsAt && this.accessEndsAt <= this.accessStartsAt) {
          throw new Error('Access end must be after access start');
        }
      },
      completedStateHasTimestamp() {
        if (this.status === 'completed' && !this.completedAt) {
          throw new Error('Completed enrollment requires completedAt');
        }
      },
    },
  });
  return ProgramEnrollment;
};
