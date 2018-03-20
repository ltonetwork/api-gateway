module.exports = {
  aliases: [],
  default_api: process.env.DEFAULT_API || 'http://{api}',
  primary_domain: process.env.PRIMARY_DOMAIN || 'localhost',
  loglevel: process.env.LOG_LEVEL || "warn",
  port: process.env.PORT || 3000,
  services: [
    {
      id: 'flow',
      domain: 'legalflow'
    },
    {
      id: 'events',
      domain: 'legalevents'
    },
    {
      id: 'docx',
      domain: 'legaldocx'
    }
  ],
  ssl: false
};