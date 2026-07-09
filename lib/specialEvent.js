import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SpecialEvent extends Model {}
  SpecialEvent.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    eventType: {
      type: DataTypes.STRING(40),
      allowNull: false,
      field: 'event_type'
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'event_date'
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'duration_minutes'
    },
    speakerName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'speaker_name'
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    maxRegistrations: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'max_registrations'
    },
    replayUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'replay_url'
    }
  }, {
    sequelize,
    modelName: 'SpecialEvent',
    tableName: 'special_events',
    timestamps: true,
    underscored: true
  });
  return SpecialEvent;
};
