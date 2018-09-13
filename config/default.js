module.exports = {
  noAuth: ['/flow', '/events', '/dispatcher'],
  aliases: [],
  default_api: process.env.DEFAULT_API || 'http://{api}',
  primary_domain: process.env.PRIMARY_DOMAIN || 'localhost',
  loglevel: (process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : "warn"),
  port: process.env.PORT || 80,
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
    },
    {
      id: 'queuer',
      domain: 'event-queuer'
    }
  ],
  ssl: false
};