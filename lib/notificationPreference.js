import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class NotificationPreference extends Model {}
  NotificationPreference.init({
    id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true}, userId:{type:DataTypes.UUID,allowNull:false,unique:true,field:'user_id'}, pushEnabled:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true,field:'push_enabled'}, emailEnabled:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true,field:'email_enabled'}, whatsappEnabled:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false,field:'whatsapp_enabled'}, marketingAllowed:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false,field:'marketing_allowed'}, quietStart:{type:DataTypes.STRING(5),allowNull:true,field:'quiet_start',validate:{is:/^(?:[01]\d|2[0-3]):[0-5]\d$/}}, quietEnd:{type:DataTypes.STRING(5),allowNull:true,field:'quiet_end',validate:{is:/^(?:[01]\d|2[0-3]):[0-5]\d$/}}, timezone:{type:DataTypes.STRING(60),allowNull:false,defaultValue:'Asia/Kolkata'},
  },{sequelize,modelName:'NotificationPreference',tableName:'notification_preferences',timestamps:true,underscored:true});
  return NotificationPreference;
};
