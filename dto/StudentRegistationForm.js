module.exports = class StudentRegistationForm {
    constructor(
        index,
        email,
        firstName,
        lastName,
        faculty,
        department,
        photoUrl
    ) {
        this.index = index;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.faculty = faculty;
        this.department = department;
        this.photoUrl = photoUrl;
    }
};
