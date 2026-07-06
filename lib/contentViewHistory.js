import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContentViewHistory extends Model {}
  ContentViewHistory.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    contentItemId: { type: DataTypes.UUID, allowNull: true, field: 'content_item_id' },
    dailyContentId: { type: DataTypes.UUID, allowNull: true, field: 'daily_content_id' },
    lastPositionSeconds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'last_position_seconds', validate: { min: 0 } },
    progressPercent: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0, field: 'progress_percent', validate: { min: 0, max: 100 } },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    viewCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1, field: 'view_count', validate: { min: 1 } },
    viewedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'viewed_at' },
  }, {
    sequelize, modelName: 'ContentViewHistory', tableName: 'content_view_history', timestamps: true, underscored: true,
    indexes: [
      { unique: true, fields: ['user_id', 'content_item_id'] },
      { unique: true, fields: ['user_id', 'daily_content_id'] }
    ],
  });
  return ContentViewHistory;
};
