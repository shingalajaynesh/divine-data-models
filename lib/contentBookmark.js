import { Model } from 'sequelize';

const BOOKMARK_KINDS = ['bookmark', 'watch_later'];

export default (sequelize, DataTypes) => {
  class ContentBookmark extends Model {}
  ContentBookmark.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    contentItemId: { type: DataTypes.UUID, allowNull: false, field: 'content_item_id' },
    kind: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'bookmark', validate: { isIn: [BOOKMARK_KINDS] } },
  }, {
    sequelize, modelName: 'ContentBookmark', tableName: 'content_bookmarks', timestamps: true, underscored: true,
    indexes: [{ unique: true, fields: ['user_id', 'content_item_id', 'kind'] }],
  });
  return ContentBookmark;
};
