import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LiveClassBooking extends Model {}
  LiveClassBooking.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    liveClassId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'live_class_id'
    },
    attended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    feedbackScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'feedback_score'
    },
    feedbackNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'feedback_notes'
    }
  }, {
    sequelize,
    modelName: 'LiveClassBooking',
    tableName: 'class_bookings',
    timestamps: true,
    underscored: true
  });
  return LiveClassBooking;
};
