const Admin = require('./admin.model');
const Department = require('./department.model');
const Staff = require('./staff.model');
const NonAcademicStaff = require('./nonAcademicStaff.model');
const Student = require('./student.model');

// Define model associations
Student.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// Export models
module.exports = { Admin, Staff, NonAcademicStaff, Student };