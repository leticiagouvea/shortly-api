import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().required()
});

export async function validateSignUp(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const validation = signUpSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map(detail => detail.message);
    return res.status(422).send(error);
  }

  if (password !== confirmPassword) {
    return res.status(422).send("Passwords must be the same");
  }

  res.locals.user = { name, email, password };
  next();
}