import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AudioPlaylist extends Model {}
  AudioPlaylist.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    name: { type: DataTypes.STRING(240), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  }, {
    sequelize, modelName: 'AudioPlaylist', tableName: 'audio_playlists', timestamps: true, underscored: true,
  });
  return AudioPlaylist;
};
