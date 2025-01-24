const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string()
      .required()
      .description("JWT Secret required to sign"),
    JWT_EXPIRES_IN_MIN: Joi.number()
      .default(30)
      .description("JWT Expiry time in minutes"),
    JWT_ALGORITHM: Joi.string().default("RS256").description("JWT Algorithm"),
    JWT_ISSUER: Joi.string().required().description("JWT Issuer"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN_MIN,
    algorithm: envVars.JWT_ALGORITHM,
    issuer: envVars.JWT_ISSUER,
  },
};
