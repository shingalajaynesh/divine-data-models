import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Center, { foreignKey: 'centerId', as: 'center' });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'image_url',
      },
      inventoryCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'inventory_count',
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'kit',
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'center_id',
      }
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      underscored: true,
      timestamps: true
    }
  );

  return Product;
};
