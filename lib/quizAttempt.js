import { DataTypes, Model } from 'sequelize';

export class QuizAttempt extends Model {}

export default function init(sequelize) {
  QuizAttempt.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    dayNumber: { type: DataTypes.INTEGER, allowNull: false, field: 'day_number', validate: { min: 1, max: 280 } },
    selectedOptionIndex: { type: DataTypes.INTEGER, allowNull: false, field: 'selected_option_index' },
    isCorrect: { type: DataTypes.BOOLEAN, allowNull: false, field: 'is_correct' },
    attemptedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'attempted_at' }
  }, {
    sequelize,
    modelName: 'QuizAttempt',
    tableName: 'quiz_attempts',
    underscored: true,
    timestamps: true
  });

  return QuizAttempt;
}
