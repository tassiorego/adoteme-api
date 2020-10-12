export default {
  jwt: {
    secret: process.env.APP_SECRET || 'deployment_secret',
    expiresIn: '1d',
  },
};
