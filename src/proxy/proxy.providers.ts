import proxy from 'http-proxy';
import { PROXYSERVER } from '../constants';

export const proxyProviders = [
  {
    provide: PROXYSERVER,
    useValue: proxy,
  },
];
