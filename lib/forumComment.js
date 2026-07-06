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
      reported: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reportsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'reports_count',
      }
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
