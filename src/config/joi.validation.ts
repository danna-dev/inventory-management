import * as JOI from 'joi';

export const JoiValidationSchema = JOI.object({
  PORT: JOI.number().default(3005),
  ENVIRONMENT: JOI.string().default('dev'),
});
