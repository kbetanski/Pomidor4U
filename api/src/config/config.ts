import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Pomidor4U',
    description: 'The best pomodoro app in the world',
    version: '1.5',
    path: 'api',
    auth: {
      type: 'http',
      bearerFormat: 'JWT',
    },
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
