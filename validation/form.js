const Joi = require('joi');
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const NAME_REGEX = /^[a-z ,.'-]+$/i;
roles = ['admin','security','academicStaff','nonAcademicStaff']

const userRegistrationFormValidation = (userRegistrationForm) => {
  const schema = Joi.object({
      email: Joi.string().pattern(EMAIL_REGEX).required(),
      password: Joi.string().pattern(PWD_REGEX).required(),
      firstName: Joi.string().min(1).max(50).pattern(NAME_REGEX).required(),
      lastName: Joi.string().min(1).max(50),
      role: Joi.string().required().valid(...roles)
  })
  return schema.validate(userRegistrationForm)
}

const studentFormValidation = (registationForm) => {
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
module.exports = { studentFormValidation, staffFormValidation, userRegistrationFormValidation };
