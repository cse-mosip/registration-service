const formValidation = (registationForm) => {
  if (
    registationForm.index.length > 0 &&
    registationForm.email.length > 0 &&
    registationForm.firstName.length > 0 &&
    registationForm.lastName.length > 0 &&
    registationForm.faculty.length > 0
  ) {
    return true;
  } else {
    return false;
  }
};
module.exports = { formValidation };