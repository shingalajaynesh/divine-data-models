import { Model } from 'sequelize';

const MEDIA_KINDS = ['image', 'audio', 'video', 'document'];
const MEDIA_STATUSES = ['uploading', 'ready', 'failed', 'archived'];

export default (sequelize, DataTypes) => {
  class MediaAsset extends Model {}
  MediaAsset.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    centerId: { type: DataTypes.UUID, allowNull: true, field: 'center_id' },
    ownerId: { type: DataTypes.UUID, allowNull: false, field: 'owner_id' },
    storageKey: { type: DataTypes.STRING(500), allowNull: false, unique: true, field: 'storage_key' },
    url: { type: DataTypes.STRING(1000), allowNull: true, validate: { isUrl: true } },
    mimeType: { type: DataTypes.STRING(120), allowNull: false, field: 'mime_type' },
    kind: { type: DataTypes.STRING(20), allowNull: false, validate: { isIn: [MEDIA_KINDS] } },
    sizeBytes: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0, field: 'size_bytes', validate: { min: 0 } },
    durationSeconds: { type: DataTypes.INTEGER, allowNull: true, field: 'duration_seconds', validate: { min: 0 } },
    status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'uploading', validate: { isIn: [MEDIA_STATUSES] } },
    altText: { type: DataTypes.STRING(300), allowNull: true, field: 'alt_text' },
    checksum: { type: DataTypes.STRING(128), allowNull: true },
    metadata: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
  }, {
    sequelize, modelName: 'MediaAsset', tableName: 'media_assets', timestamps: true, paranoid: true, underscored: true,
    validate: { readyAssetHasUrl() { if (this.status === 'ready' && !this.url) throw new Error('Ready media requires a URL'); } },
  });
  return MediaAsset;
};
