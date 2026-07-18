import { DataTypes, Model } from 'sequelize';

export class UserAchievement extends Model {}

export default function init(sequelize) {
  UserAchievement.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    badgeKey: { type: DataTypes.STRING, allowNull: false, field: 'badge_key' },
    unlockedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'unlocked_at' }
  }, {
    sequelize,
    modelName: 'UserAchievement',
    tableName: 'user_achievements',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['user_id', 'badge_key'] }
    ]
  });

  return UserAchievement;
}
