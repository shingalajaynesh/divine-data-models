import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DietPreference extends Model {}
  DietPreference.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    dietType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'VEG',
      field: 'diet_type'
    },
    allergens: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'allergens'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'notes'
    }
  }, {
    sequelize,
    modelName: 'DietPreference',
    tableName: 'diet_preferences',
    timestamps: true,
    underscored: true
  });
  return DietPreference;
};
