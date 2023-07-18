// TODO: read this from database
        
module.exports = {
    "admin": ['index', 'email', 'firstName', 'lastName', 'faculty', 'department', 'photo'],
    "security": ['index', 'photo'],
    "academicStaff": ['index', 'email', 'firstName', 'lastName', 'faculty', 'department', 'photo'],
    "nonAcademicStaff": ['firstName', 'lastName', 'faculty', 'department']
};