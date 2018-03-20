'use strict';
const app = require('../../../server');
const nock = require('nock');
const request = require('supertest');
const expect = require('chai').expect;

describe('API Proxy', () => {

  describe('GET /api/flow/', () => {
    it('should return information about the legalflow service', (done) => {
      nock('http://legalflow')
        .get(`/`)
        .reply(200, {
          id: 'legalflow',
        });

      request(app)
        .get('/api/flow/')
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          const result = res.body;
          expect(result.id).be.equal('legalflow');

          done();
        });
    });
  });
});