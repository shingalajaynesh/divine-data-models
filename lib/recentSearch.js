import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RecentSearch extends Model {}
  RecentSearch.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    query: { type: DataTypes.STRING(120), allowNull: false, validate: { len: [1, 120] } },
    filters: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
    resultCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'result_count', validate: { min: 0 } },
    searchedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'searched_at' },
  }, {
    sequelize, modelName: 'RecentSearch', tableName: 'recent_searches', timestamps: true, underscored: true,
    indexes: [{ fields: ['user_id', 'searched_at'] }],
  });
  return RecentSearch;
};
