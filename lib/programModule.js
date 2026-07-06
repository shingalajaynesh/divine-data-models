import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProgramModule extends Model {}
  ProgramModule.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    programId: { type: DataTypes.UUID, allowNull: false, field: 'program_id' },
    title: { type: DataTypes.STRING(180), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    coverUrl: { type: DataTypes.STRING(1000), allowNull: true, field: 'cover_url' },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order' },
    unlockDay: { type: DataTypes.INTEGER, allowNull: true, field: 'unlock_day' },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_published' },
  }, {
    sequelize,
    modelName: 'ProgramModule',
    tableName: 'program_modules',
    timestamps: true,
    paranoid: true,
    underscored: true,
  });
  return ProgramModule;
};
