import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContentTranslation extends Model {}
  ContentTranslation.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    contentItemId: { type: DataTypes.UUID, allowNull: false, field: 'content_item_id' },
    language: { type: DataTypes.STRING(10), allowNull: false, validate: { is: /^[a-z]{2}(?:-[A-Z]{2})?$/ } },
    title: { type: DataTypes.STRING(240), allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: true },
    body: { type: DataTypes.TEXT, allowNull: true },
  }, {
    sequelize, modelName: 'ContentTranslation', tableName: 'content_translations', timestamps: true, paranoid: true, underscored: true,
    indexes: [{ unique: true, fields: ['content_item_id', 'language'] }],
  });
  return ContentTranslation;
};
