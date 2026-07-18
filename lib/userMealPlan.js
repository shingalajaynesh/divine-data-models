import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserMealPlan extends Model {}
  UserMealPlan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },
    dayNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'day_number'
    },
    mealType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'meal_type'
    },
    contentItemId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'content_item_id',
      references: {
        model: 'content_items',
        key: 'id'
      }
    },
    customMealName: {
      type: DataTypes.STRING(120),
      allowNull: true,
      field: 'custom_meal_name'
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserMealPlan',
    tableName: 'user_meal_plans',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['user_id', 'day_number'] },
      { fields: ['content_item_id'] }
    ]
  });
  return UserMealPlan;
};
