import { Environment, Callback, GuestlineContext } from './types';
import { instrumentationKey } from './env.json';

export async function data(context: GuestlineContext, callback: Callback) {
  const { siteId, lang } = context.params;
  const env = context.env.name as Environment;

  const response = {
    lang: lang || 'en-GB',
    siteId,
    instrumentationKey,
    env
  };

  return callback(null, { ...response });
}
