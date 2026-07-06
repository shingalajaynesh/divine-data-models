import { DataTypes, Model } from 'sequelize';

export class QuizQuestion extends Model {}

export default function init(sequelize) {
  QuizQuestion.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    dayNumber: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: 'day_number', validate: { min: 1, max: 280 } },
    questionTextEn: { type: DataTypes.TEXT, allowNull: false, field: 'question_text_en' },
    questionTextHi: { type: DataTypes.TEXT, allowNull: false, field: 'question_text_hi' },
    optionsEn: { type: DataTypes.JSON, allowNull: false, field: 'options_en' },
    optionsHi: { type: DataTypes.JSON, allowNull: false, field: 'options_hi' },
    correctOptionIndex: { type: DataTypes.INTEGER, allowNull: false, field: 'correct_option_index' },
    explanationEn: { type: DataTypes.TEXT, allowNull: false, field: 'explanation_en' },
    explanationHi: { type: DataTypes.TEXT, allowNull: false, field: 'explanation_hi' }
  }, {
    sequelize,
    modelName: 'QuizQuestion',
    tableName: 'quiz_questions',
    underscored: true,
    timestamps: true
  });

  return QuizQuestion;
}
