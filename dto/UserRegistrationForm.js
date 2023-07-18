module.exports = class UserRegistrationForm {
    constructor(email, firstName, lastName, password, role) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
    }
};
