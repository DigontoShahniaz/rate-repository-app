import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  extra: {
    apolloUri: process.env.APOLLO_URI,
    env: process.env.ENV || 'development'
  },
};