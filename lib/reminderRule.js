import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReminderRule extends Model {}
  ReminderRule.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(180),
      allowNull: false
    },
    ruleType: {
      type: DataTypes.STRING(40),
      allowNull: false,
      field: 'rule_type'
    },
    triggerCondition: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
      field: 'trigger_condition'
    },
    templateTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'template_title'
    },
    templateBody: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'template_body'
    },
    channels: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: ['in_app']
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ReminderRule',
    tableName: 'reminder_rules',
    timestamps: true,
    underscored: true
  });
  return ReminderRule;
};
