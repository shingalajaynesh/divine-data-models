import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CannedReply extends Model {
    static associate(models) {
      // No direct relationships required
    }
  }

  CannedReply.init(
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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'general',
      }
    },
    {
      sequelize,
      modelName: 'CannedReply',
      tableName: 'canned_replies',
      underscored: true,
      timestamps: true
    }
  );

  return CannedReply;
};
