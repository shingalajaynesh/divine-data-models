import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AmbassadorApplication extends Model {}
  AmbassadorApplication.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },
    socialLinks: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
      field: 'social_links'
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'AmbassadorApplication',
    tableName: 'ambassador_applications',
    timestamps: true,
    underscored: true
  });
  return AmbassadorApplication;
};
