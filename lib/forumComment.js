import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ForumComment extends Model { }
  ForumComment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'post_id',
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'forum_comments',
      modelName: 'ForumComment',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  return ForumComment;
};
