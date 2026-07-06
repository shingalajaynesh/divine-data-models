import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Payment extends Model { }
  Payment.init(
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
      stripeSessionId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stripe_session_id',
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING, // 'pending', 'succeeded', 'failed'
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'payments',
      modelName: 'Payment',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  return Payment;
};
