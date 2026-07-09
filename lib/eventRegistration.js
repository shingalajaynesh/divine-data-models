import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class EventRegistration extends Model {}
  EventRegistration.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'event_id'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },
    registeredAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'registered_at'
    },
    checkedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'checked_in'
    },
    checkedInAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'checked_in_at'
    },
    feedbackRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'feedback_rating'
    },
    feedbackText: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'feedback_text'
    }
  }, {
    sequelize,
    modelName: 'EventRegistration',
    tableName: 'event_registrations',
    timestamps: true,
    underscored: true
  });
  return EventRegistration;
};
