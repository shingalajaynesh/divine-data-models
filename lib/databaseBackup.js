import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DatabaseBackup extends Model {}

  DatabaseBackup.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      fileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'file_name'
      },
      backupSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field: 'backup_size'
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'SUCCESS'
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'DatabaseBackup',
      tableName: 'database_backups',
      underscored: true,
      timestamps: true
    }
  );

  return DatabaseBackup;
};
