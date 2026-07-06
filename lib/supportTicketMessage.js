import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SupportTicketMessage extends Model {
    static associate(models) {
      SupportTicketMessage.belongsTo(models.SupportTicket, {
        foreignKey: 'ticketId',
        as: 'ticket',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      SupportTicketMessage.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  SupportTicketMessage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      ticketId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'ticket_id',
        references: {
          model: 'support_tickets',
          key: 'id'
        }
      },
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'sender_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      senderType: {
        type: DataTypes.ENUM('user', 'staff'),
        allowNull: false,
        defaultValue: 'user',
        field: 'sender_type',
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'SupportTicketMessage',
      tableName: 'support_ticket_messages',
      underscored: true,
      timestamps: true
    }
  );

  return SupportTicketMessage;
};
