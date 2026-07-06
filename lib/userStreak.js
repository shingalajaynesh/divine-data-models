import { DataTypes, Model } from 'sequelize';

export class UserStreak extends Model {}

export default function init(sequelize) {
  UserStreak.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, unique: true, field: 'user_id' },
    currentStreak: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'current_streak' },
    longestStreak: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'longest_streak' },
    lastCompletedDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'last_completed_date' }
  }, {
    sequelize,
    modelName: 'UserStreak',
    tableName: 'user_streaks',
    underscored: true,
    timestamps: true
  });

  return UserStreak;
}
