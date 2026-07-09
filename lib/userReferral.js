import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserReferral extends Model {}
  UserReferral.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    referrerId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'referrer_id'
    },
    refereeName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'referee_name'
    },
    refereeEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'referee_email'
    },
    refereePhone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'referee_phone'
    },
    status: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: 'pending'
    },
    rewardPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'reward_points'
    }
  }, {
    sequelize,
    modelName: 'UserReferral',
    tableName: 'user_referrals',
    timestamps: true,
    underscored: true
  });
  return UserReferral;
};
