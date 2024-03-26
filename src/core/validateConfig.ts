// validateConfig.js
import Joi from 'joi';

const envVarsSchema = Joi.object({
  REACT_APP_API_BASE_URL: Joi.string().uri().required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'staging', 'docker'),
  // Другие переменные
}).unknown().required();

export const validateConfig = (envConfig: unknown) => {
  const { error, value: validatedEnvConfig } = envVarsSchema
    .validate(envConfig, { allowUnknown: true, abortEarly: false });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return validatedEnvConfig;
};
