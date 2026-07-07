import { Model } from "sequelize";
import { createRandomHex, hashPassword, verifyPassword } from "./crypto.js";

export default (sequelize, DataTypes) => {
  class User extends Model {
    async validateUserPassword(password) {
      return verifyPassword(password, this.pwHash);
    }

    static getUserByIdCenterRole = (userId) => {
      return User.findOne({
        where: {
          id: userId,
        },
        include: [
          { model: sequelize.models.Role, as: "role" },
          { model: sequelize.models.Center, as: "center" },
        ],
      });
    };

    static centerHasUser(id, centerId) {
      return User.findOne({
        where: {
          id,
          centerId,
        },
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      sub: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      clerkId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      firebaseUid: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        field: "firebase_uid",
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      pwHash: {
        type: DataTypes.BLOB,
        allowNull: false,
        field: "pwhash",
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("M", "F"),
        allowNull: true,
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lmpDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "lmp_date",
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "due_date",
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "en",
        field: "language",
      },
      subscriptionStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "free",
        field: "subscription_status",
      },
      inserted: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      hasSetInitialPassword: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      centerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      isSystemDefine: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      partnerId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "partner_id",
      },
      shareVitalsWithPartner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "share_vitals_with_partner",
      },
      shareReportsWithPartner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "share_reports_with_partner",
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: "users",
      modelName: "User",
      timestamps: false, // Using custom inserted/updated timestamps
      paranoid: true,
    }
  );

  User.addHook("beforeCreate", async (user) => {
    const [pwHash, sub] = await Promise.all([
      hashPassword(user.id),
      createRandomHex(10),
    ]);
    user.pwHash = pwHash;
    user.sub = sub;
  });

  User.addHook("beforeUpdate", async (user) => {
    if (user.changed("pwHash")) {
      let pwHash = await hashPassword(user.pwHash);
      user.pwHash = pwHash;
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.Center, { foreignKey: "centerId", as: "center" });
    User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
    User.belongsTo(models.User, { foreignKey: "partnerId", as: "partner" });
  };

  return User;
};
