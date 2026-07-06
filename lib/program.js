import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Program extends Model {}
  Program.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    centerId: { type: DataTypes.UUID, allowNull: true, field: 'center_id' },
    slug: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(180), allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: true },
    coverUrl: { type: DataTypes.STRING(1000), allowNull: true, field: 'cover_url' },
    language: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'en' },
    journeyStage: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'pregnancy', field: 'journey_stage' },
    status: { type: DataTypes.ENUM('draft', 'published', 'archived'), allowNull: false, defaultValue: 'draft' },
    isPremium: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_premium' },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order' },
  }, {
    sequelize,
    modelName: 'Program',
    tableName: 'programs',
    timestamps: true,
    paranoid: true,
    underscored: true,
  });
  return Program;
};
