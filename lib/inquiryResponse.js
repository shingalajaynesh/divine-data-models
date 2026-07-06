export default (sequelize, DataTypes) => {
  const InquiryResponse = sequelize.define(
    'InquiryResponse',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      inquiryId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'inquiry_id',
      },
      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'author_id',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'inquiry_responses',
      underscored: true,
      timestamps: true,
      updatedAt: false,
      indexes: [{ fields: ['inquiry_id', 'created_at'] }],
    },
  );

  return InquiryResponse;
};
