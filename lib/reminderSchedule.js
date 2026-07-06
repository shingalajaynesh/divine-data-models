import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ReminderSchedule extends Model {}
  ReminderSchedule.init({
    id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true}, userId:{type:DataTypes.UUID,allowNull:false,field:'user_id'}, reminderType:{type:DataTypes.STRING(40),allowNull:false,field:'reminder_type'}, label:{type:DataTypes.STRING(120),allowNull:false}, localTime:{type:DataTypes.STRING(5),allowNull:false,field:'local_time',validate:{is:/^(?:[01]\d|2[0-3]):[0-5]\d$/}}, daysOfWeek:{type:DataTypes.JSONB,allowNull:false,defaultValue:[0,1,2,3,4,5,6],field:'days_of_week'}, channel:{type:DataTypes.STRING(20),allowNull:false,defaultValue:'push',validate:{isIn:[['push','email','whatsapp','in_app']]}}, enabled:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true},
  },{sequelize,modelName:'ReminderSchedule',tableName:'reminder_schedules',timestamps:true,underscored:true});
  return ReminderSchedule;
};
