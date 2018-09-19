const { expect } = require('chai');
const nock = require('nock');
const config = require('config');
const Services = require('../../lib/services');
let services;

describe('Services', () => {

  before(() => {
    services = new Services(config);
  });

  describe('#getAllServicesInfo', () => {
    it('should return the info all the services', async () => {

      nock('http://legalflow')
        .get(`/`)
        .reply(200, {
          id: 'flow',
        });
      nock('http://legalevents')
        .get(`/`)
        .reply(200, {
          id: 'events',
        });
      nock('http://event-queuer')
        .get(`/`)
        .reply(200, {
          id: 'queuer',
        });


      const info = await services.getAllServicesInfo('');
      expect(info).to.deep.eq({
        flow: {
          id: 'flow'
        },
        events: {
          id: 'events'
        },
        queuer: {
          id: 'queuer'
        }
      });
    });
  })
});