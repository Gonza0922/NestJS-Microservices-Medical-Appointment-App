import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  HOST_PORT: string;
  MONGO_URI: string;
  NATS_SERVER: string;
}

const envsSchema = joi
  .object({
    HOST_PORT: joi.string().required(),
    MONGO_URI: joi.string().required(),
    NATS_SERVER: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  hostPort: envVars.HOST_PORT,
  mongoUri: envVars.MONGO_URI,
  natsServer: envVars.NATS_SERVER,
};
