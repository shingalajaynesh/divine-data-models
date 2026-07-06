import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LiveClass extends Model { }
  LiveClass.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      instructor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'start_time',
      },
      durationMins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'duration_mins',
      },
      videoCallUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'video_call_url',
      },
    },
    {
      sequelize,
      tableName: 'live_classes',
      modelName: 'LiveClass',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  return LiveClass;
};
