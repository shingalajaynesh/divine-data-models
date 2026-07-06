import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AudioPlaylistItem extends Model {}
  AudioPlaylistItem.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    playlistId: { type: DataTypes.UUID, allowNull: false, field: 'playlist_id' },
    contentItemId: { type: DataTypes.UUID, allowNull: false, field: 'content_item_id' },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order', validate: { min: 0 } },
  }, {
    sequelize, modelName: 'AudioPlaylistItem', tableName: 'audio_playlist_items', timestamps: true, underscored: true,
    indexes: [
      { unique: true, fields: ['playlist_id', 'content_item_id'] }
    ]
  });
  return AudioPlaylistItem;
};
