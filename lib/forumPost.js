import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ForumPost extends Model { }
  ForumPost.init(
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
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'likes_count',
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'General',
      },
      likedByUsers: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]',
        field: 'liked_by_users',
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
      tableName: 'forum_posts',
      modelName: 'ForumPost',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  return ForumPost;
};
