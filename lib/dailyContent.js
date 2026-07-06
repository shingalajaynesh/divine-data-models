import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DailyContent extends Model { }
  DailyContent.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      dayNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'day_number',
      },
      category: {
        type: DataTypes.STRING, // 'story', 'video', 'music', 'yoga', 'recipe', 'mantra', 'article'
        allowNull: false,
      },
      titleEn: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'title_en',
      },
      titleHi: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'title_hi',
      },
      bodyEn: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'body_en',
      },
      bodyHi: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'body_hi',
      },
      mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'media_url',
      },
    },
    {
      sequelize,
      tableName: 'daily_contents',
      modelName: 'DailyContent',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  return DailyContent;
};
