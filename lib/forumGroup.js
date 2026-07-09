import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ForumGroup extends Model { }
  ForumGroup.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'cover_url',
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_private',
      }
    },
    {
      sequelize,
      tableName: 'forum_groups',
      modelName: 'ForumGroup',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  return ForumGroup;
};
