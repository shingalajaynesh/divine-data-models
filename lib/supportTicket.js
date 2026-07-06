import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SupportTicket extends Model {
    static associate(models) {
      SupportTicket.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      SupportTicket.hasMany(models.SupportTicketMessage, {
        foreignKey: 'ticketId',
        as: 'messages',
        onDelete: 'CASCADE'
      });
    }
  }

  SupportTicket.init(
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
        references: {
          model: 'users',
          key: 'id'
        }
      },
      subject: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('open', 'pending', 'resolved', 'closed'),
        allowNull: false,
        defaultValue: 'open',
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'general',
      },
      satisfactionScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'satisfaction_score',
      },
      satisfactionFeedback: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'satisfaction_feedback',
      },
      whatsappHandoffRequested: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'whatsapp_handoff_requested',
      },
      slaBreached: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'sla_breached',
      },
      slaExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'sla_expires_at',
      }
    },
    {
      sequelize,
      modelName: 'SupportTicket',
      tableName: 'support_tickets',
      underscored: true,
      timestamps: true
    }
  );

  return SupportTicket;
};
