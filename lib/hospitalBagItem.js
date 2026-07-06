import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class HospitalBagItem extends Model {
    static associate(models) {
      HospitalBagItem.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  HospitalBagItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'item_name',
      },
      packed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      category: {
        type: DataTypes.STRING, // 'mother', 'baby', 'partner'
        allowNull: false,
        defaultValue: 'mother',
      }
    },
    {
      sequelize,
      modelName: 'HospitalBagItem',
      tableName: 'hospital_bag_items',
      underscored: true,
      timestamps: true
    }
  );

  return HospitalBagItem;
};
