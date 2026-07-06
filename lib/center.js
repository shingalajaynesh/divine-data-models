import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export const defaultRoleTypes = ["GUIDE", "STAFF", "ADMIN", "MOTHER"];
export const permissionOperations = {
  create: false,
  edit: false,
  view: false,
  manage: false,
};
export const adminPermissionOperations = {
  create: true,
  edit: true,
  view: true,
  manage: true,
};
export const defaultPermissionModules = [
  "center",
  "user",
  "role",
  "permission",
  "appointment",
  "tracker",
  "content",
];

export const defalutRolePermissions = (isAdmin = false) => {
  let permissions = {};

  defaultRoleTypes.forEach((roleType) => {
    let modules = {};

    defaultPermissionModules.forEach((module) => {
      modules[module] = isAdmin
        ? { ...adminPermissionOperations }
        : { ...permissionOperations };
    });

    permissions[roleType] = { ...modules };
  });
  return permissions;
};

export default (sequelize, DataTypes, log) => {
  class Center extends Model {
    static createCenterWithDefaultRoleAndUser = async (centerData) => {
      log.info(
        "Center MODEL: createCenterWithDefaultRoleAndUser",
        centerData
      );

      const { name, address, contactno, emailAddress } = centerData;
      const { Role, User } = sequelize.models;

      try {
        const result = await sequelize.transaction(async (t) => {
          // Create center record
          const centerRecord = await Center.create(
            {
              id: uuidv4(),
              name,
              address,
              contactno,
              isDeleted: false,
              isActive: true,
              emailAddress,
            },
            { transaction: t }
          );

          log.info("New Center created with info:", centerRecord);

          // Create admin role for the center
          const adminRole = await Role.create(
            {
              id: uuidv4(),
              name: "Admin",
              description: "Center Admin Role",
              roleType: "ADMIN",
              permissions: defalutRolePermissions(true).ADMIN,
              isSystemDefine: true,
              centerId: centerRecord.id,
              createdBy: "00000000-0000-0000-0000-000000000000",
              updatedBy: "00000000-0000-0000-0000-000000000000",
            },
            { transaction: t }
          );
          log.info("Created Default Admin role with info:", adminRole);

          // Create default user for the center
          const uniqueUserId = uuidv4();
          const systemUser = await User.create(
            {
              id: uniqueUserId,
              pwHash: Buffer.from("willbecreateAuto"),
              sub: "willbeCreateAuto",
              emailAddress: `${name
                .toLowerCase()
                .replace(/\s+/g, "")}@gmail.com`,
              displayName: `${name} Admin`,
              firstName: "Super",
              lastName: "Admin",
              centerId: centerRecord.id,
              roleId: adminRole.id,
              mobileNo: contactno,
              isSystemDefine: true,
              isActive: true,
              hasSetInitialPassword: false,
              inserted: new Date(),
              updated: new Date(),
              createdBy: "00000000-0000-0000-0000-000000000000",
              updatedBy: "00000000-0000-0000-0000-000000000000",
            },
            { transaction: t }
          );

          log.info("Created Default user with info:", systemUser);

          // Update center record with primaryUser
          await centerRecord.update(
            {
              primaryUser: systemUser.id,
            },
            { transaction: t }
          );

          return centerRecord;
        });

        return result;
      } catch (error) {
        log.error("Error creating center with default role and user:", error);
        throw error;
      }
    };
  }

  Center.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contactno: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primaryUser: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isLogo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      type: {
        type: DataTypes.ENUM("Internal", "Demo", "Billable"),
        allowNull: false,
        defaultValue: "Internal",
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: "centers",
      modelName: "Center",
      paranoid: true,
      timestamps: true,
    }
  );

  return Center;
};
