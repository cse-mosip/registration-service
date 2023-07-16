module.exports = class RegistationForm {
  constructor(index, email, firstName, lastName, faculty, department) {
    this.index = index;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.faculty = faculty;
    this.department = department;
  }
};
