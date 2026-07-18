import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class NotificationDelivery extends Model {}
  NotificationDelivery.init({
    id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true}, notificationId:{type:DataTypes.UUID,allowNull:false,field:'notification_id'}, channel:{type:DataTypes.STRING(20),allowNull:false,validate:{isIn:[['push','email','whatsapp','in_app']]}}, status:{type:DataTypes.STRING(20),allowNull:false,defaultValue:'queued',validate:{isIn:[['queued','sent','delivered','failed','skipped']]}}, attempts:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0,validate:{min:0}}, providerMessageId:{type:DataTypes.STRING(200),allowNull:true,field:'provider_message_id'}, lastAttemptAt:{type:DataTypes.DATE,allowNull:true,field:'last_attempt_at'}, errorCode:{type:DataTypes.STRING(80),allowNull:true,field:'error_code'}, errorMessage:{type:DataTypes.TEXT,allowNull:true,field:'error_message'},
  },{
    sequelize,
    modelName:'NotificationDelivery',
    tableName:'notification_deliveries',
    timestamps:true,
    underscored:true,
    indexes:[
      { fields:['notification_id','status'] },
      { fields:['channel','provider_message_id'] }
    ]
  });
  return NotificationDelivery;
};
