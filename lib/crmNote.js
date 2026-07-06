import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CrmNote extends Model {
    static associate(models) {
      CrmNote.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      CrmNote.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'author',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  CrmNote.init(
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
      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'author_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'CrmNote',
      tableName: 'crm_notes',
      underscored: true,
      timestamps: true
    }
  );

  return CrmNote;
};
