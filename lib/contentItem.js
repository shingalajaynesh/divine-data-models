import { Model } from 'sequelize';

const CONTENT_TYPES = ['article', 'video', 'audio', 'story', 'prayer', 'affirmation', 'recipe', 'yoga', 'meditation'];
const CONTENT_STATUSES = ['draft', 'review', 'approved', 'published', 'archived'];
const VISIBILITIES = ['free', 'enrolled', 'premium', 'staff'];

export default (sequelize, DataTypes) => {
  class ContentItem extends Model {}
  ContentItem.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    centerId: { type: DataTypes.UUID, allowNull: true, field: 'center_id' },
    categoryId: { type: DataTypes.UUID, allowNull: true, field: 'category_id' },
    coverAssetId: { type: DataTypes.UUID, allowNull: true, field: 'cover_asset_id' },
    createdBy: { type: DataTypes.UUID, allowNull: false, field: 'created_by' },
    updatedBy: { type: DataTypes.UUID, allowNull: false, field: 'updated_by' },
    slug: { type: DataTypes.STRING(140), allowNull: false, validate: { is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ } },
    contentType: { type: DataTypes.STRING(20), allowNull: false, field: 'content_type', validate: { isIn: [CONTENT_TYPES] } },
    status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'draft', validate: { isIn: [CONTENT_STATUSES] } },
    visibility: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'free', validate: { isIn: [VISIBILITIES] } },
    publishAt: { type: DataTypes.DATE, allowNull: true, field: 'publish_at' },
    unpublishAt: { type: DataTypes.DATE, allowNull: true, field: 'unpublish_at' },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order', validate: { min: 0 } },
    trimester1Safe: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'trimester_1_safe' },
    trimester2Safe: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'trimester_2_safe' },
    trimester3Safe: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'trimester_3_safe' },
    contraindications: { type: DataTypes.TEXT, allowNull: true, field: 'contraindications' },
    medicalReviewed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'medical_reviewed' },
    reviewedBy: { type: DataTypes.UUID, allowNull: true, field: 'reviewed_by' },
    feedback: { type: DataTypes.TEXT, allowNull: true }
  }, {
    sequelize, modelName: 'ContentItem', tableName: 'content_items', timestamps: true, paranoid: true, underscored: true,
    validate: { validPublishWindow() { if (this.publishAt && this.unpublishAt && this.unpublishAt <= this.publishAt) throw new Error('Unpublish time must be after publish time'); } },
  });
  return ContentItem;
};
