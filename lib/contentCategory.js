import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContentCategory extends Model {}
  ContentCategory.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    parentId: { type: DataTypes.UUID, allowNull: true, field: 'parent_id' },
    slug: { type: DataTypes.STRING(100), allowNull: false, unique: true, validate: { is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ } },
    name: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    icon: { type: DataTypes.STRING(80), allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order', validate: { min: 0 } },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
  }, { sequelize, modelName: 'ContentCategory', tableName: 'content_categories', timestamps: true, paranoid: true, underscored: true });
  return ContentCategory;
};
