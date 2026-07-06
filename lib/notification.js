import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Notification extends Model {}
  Notification.init({
    id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true}, centerId:{type:DataTypes.UUID,allowNull:true,field:'center_id'}, userId:{type:DataTypes.UUID,allowNull:false,field:'user_id'},
    kind:{type:DataTypes.STRING(40),allowNull:false}, title:{type:DataTypes.STRING(180),allowNull:false}, body:{type:DataTypes.TEXT,allowNull:false}, actionUrl:{type:DataTypes.STRING(500),allowNull:true,field:'action_url'}, data:{type:DataTypes.JSONB,allowNull:false,defaultValue:{}},
    status:{type:DataTypes.STRING(20),allowNull:false,defaultValue:'unread',validate:{isIn:[['unread','read','archived']]}}, readAt:{type:DataTypes.DATE,allowNull:true,field:'read_at'}, scheduledAt:{type:DataTypes.DATE,allowNull:true,field:'scheduled_at'}, expiresAt:{type:DataTypes.DATE,allowNull:true,field:'expires_at'},
  },{sequelize,modelName:'Notification',tableName:'notifications',timestamps:true,underscored:true,validate:{validReadState(){if(this.status==='read'&&!this.readAt) throw new Error('Read notification requires readAt');}}});
  return Notification;
};
