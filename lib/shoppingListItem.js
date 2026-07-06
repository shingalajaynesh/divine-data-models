import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ShoppingListItem extends Model {}
  ShoppingListItem.init({
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
    ingredientName: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: 'ingredient_name'
    },
    quantity: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'quantity'
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'ShoppingListItem',
    tableName: 'shopping_list_items',
    timestamps: true,
    underscored: true
  });
  return ShoppingListItem;
};
