import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class BabyDevelopment extends Model { }
  BabyDevelopment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      weekNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: 'week_number',
      },
      sizeEn: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'size_en',
      },
      sizeHi: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'size_hi',
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      milestoneEn: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'milestone_en',
      },
      milestoneHi: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'milestone_hi',
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'image_url',
      },
    },
    {
      sequelize,
      tableName: 'baby_developments',
      modelName: 'BabyDevelopment',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  return BabyDevelopment;
};
