import { HTTPSignature } from 'lto-api';
import { HTTPSIGNATURE } from '../constants';

export const authProviders = [
  {
    provide: HTTPSIGNATURE,
    useValue: HTTPSignature,
  },
];
