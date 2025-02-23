import * as JOI from 'joi';

export const JoiValidationSchema = JOI.object({
  PORT: JOI.number().default(3005),
  DB_HOST: JOI.string().required(),
  DB_PORT: JOI.number().required(),
  DB_USERNAME: JOI.string().required(),
  DB_PASSWORD: JOI.string().required(),
  DB_NAME: JOI.string().required(),
});
