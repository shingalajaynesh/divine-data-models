import { Model } from 'sequelize';

const LESSON_TYPES = ['article', 'audio', 'video', 'live', 'practice', 'mixed'];

export default (sequelize, DataTypes) => {
  class ProgramLesson extends Model {}
  ProgramLesson.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    moduleId: { type: DataTypes.UUID, allowNull: false, field: 'module_id' },
    slug: { type: DataTypes.STRING(120), allowNull: false },
    title: { type: DataTypes.STRING(180), allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: true },
    lessonType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'mixed',
      field: 'lesson_type',
      validate: { isIn: [LESSON_TYPES] },
    },
    durationMins: { type: DataTypes.INTEGER, allowNull: true, field: 'duration_mins', validate: { min: 0, max: 1440 } },
    releaseDay: { type: DataTypes.INTEGER, allowNull: true, field: 'release_day', validate: { min: 1, max: 280 } },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order', validate: { min: 0 } },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_published' },
  }, {
    sequelize,
    modelName: 'ProgramLesson',
    tableName: 'program_lessons',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{ unique: true, fields: ['module_id', 'slug'] }],
  });
  return ProgramLesson;
};
