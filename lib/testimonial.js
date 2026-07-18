import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Testimonial extends Model {}
  Testimonial.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    },
    status: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: 'pending'
    },
    approvedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'approved_by',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['status'] },
      { fields: ['approved_by'] }
    ]
  });
  return Testimonial;
};
