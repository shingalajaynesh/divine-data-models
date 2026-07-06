import { Model } from 'sequelize';

const QUOTIENTS = ['PQ', 'IQ', 'EQ', 'SQ', 'WELLNESS', 'GENERAL'];
const ACTIVITY_TYPES = ['practice', 'puzzle', 'quiz', 'reflection', 'media', 'offline'];

export default (sequelize, DataTypes) => {
  class ProgramActivity extends Model {}
  ProgramActivity.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    lessonId: { type: DataTypes.UUID, allowNull: false, field: 'lesson_id' },
    slug: { type: DataTypes.STRING(120), allowNull: false },
    title: { type: DataTypes.STRING(180), allowNull: false },
    instructions: { type: DataTypes.TEXT, allowNull: false },
    quotient: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'GENERAL', validate: { isIn: [QUOTIENTS] } },
    activityType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'practice',
      field: 'activity_type',
      validate: { isIn: [ACTIVITY_TYPES] },
    },
    mediaUrl: { type: DataTypes.STRING(1000), allowNull: true, field: 'media_url', validate: { isUrl: true } },
    estimatedMins: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10, field: 'estimated_mins', validate: { min: 1, max: 480 } },
    requiresSubmission: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'requires_submission' },
    points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0, max: 10000 } },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order', validate: { min: 0 } },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_published' },
  }, {
    sequelize,
    modelName: 'ProgramActivity',
    tableName: 'program_activities',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{ unique: true, fields: ['lesson_id', 'slug'] }],
  });
  return ProgramActivity;
};
