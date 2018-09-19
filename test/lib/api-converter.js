const { expect } = require('chai');
const config = require('config');
const APIConverter = require('../../lib/api-converter');
let apiConverter;

describe('APIConverter', () => {

  before(() => {
    apiConverter = new APIConverter(config);
  });

  describe('#exists', () => {
    it('should return true if an api exists', () => {
      expect(apiConverter.exists('events')).to.be.true;
    });

    it('should return false if the api doesn\'t exist', () => {
      expect(apiConverter.exists('foo')).to.be.false;
    });
  });

  describe('#getUrl', () => {
    it('should return the correct url of an api with no env', () => {
      expect(apiConverter.getUrl('events', '')).to.eq('http://legalevents');
    });
  });

  describe('#getAllUrls', () => {
    it('should return all urls', () => {
      expect(apiConverter.getAllUrls()).to.deep.eq({flow: 'http://legalflow', events: 'http://legalevents', queuer: 'http://event-queuer'});
    });
  })
});