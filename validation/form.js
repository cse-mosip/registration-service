const studentFormValidation = (registationForm) => {
    console.log("####: ", registationForm);
    try {
        if (
            registationForm.index.length > 0 &&
            registationForm.email.length > 0 &&
            registationForm.firstName.length > 0 &&
            registationForm.lastName.length > 0 &&
            registationForm.faculty.length > 0 &&
            registationForm.department.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
};
const staffFormValidation = (registationForm) => {
    try {
        if (
            registationForm.email.length > 0 &&
            registationForm.firstName.length > 0 &&
            registationForm.lastName.length > 0 &&
            registationForm.faculty.length > 0 &&
            registationForm.department.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
};
module.exports = { studentFormValidation, staffFormValidation };
