module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  if (err.code === 11000 && Object.keys(err.keyPattern)[0].includes("pseudo"))
    errors.pseudo = "pseudo deja pris";

  if (err.code === 11000 && Object.keys(err.keyPattern)[0].includes("email"))
    errors.email = "Email déja pris";
  // if(err.errors.pseudo)
  //   errors.pseudo = "Le pseudo doit faire 3 caractéres au minimum";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.includes("email")) errors.email = err;
  if (err.includes("passe")) errors.password = err;

  return errors;
};
