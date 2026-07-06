import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Parameter extends Model { }
  Parameter.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'center_id',
      },
    },
    {
      sequelize,
      tableName: 'parameters',
      modelName: 'Parameter',
      timestamps: true,
      paranoid: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['key', 'center_id']
        }
      ]
    }
  );
  return Parameter;
};
