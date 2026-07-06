export default (sequelize, DataTypes) => {
  const Inquiry = sequelize.define(
    'Inquiry',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: true,
        validate: { isEmail: true },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'en',
      },
      preferredCallTime: {
        type: DataTypes.STRING(80),
        allowNull: true,
        field: 'preferred_call_time',
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'marketing_website',
      },
      status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'resolved', 'closed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'center_id',
      },
      assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'assigned_to',
      },
    },
    {
      tableName: 'inquiries',
      underscored: true,
      timestamps: true,
      paranoid: true,
      indexes: [
        { fields: ['status', 'created_at'] },
        { fields: ['center_id', 'status'] },
        { fields: ['phone'] },
      ],
    },
  );

  return Inquiry;
};
