module.exports = class StudentRegistationForm {
  constructor(index, email, firstName, lastName, faculty, department,image) {
    this.index = index;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.faculty = faculty;
    this.department = department;
    this.image = image;
  }
};
