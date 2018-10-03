import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModuleConfig } from './auth.module';
import { HTTPSIGNATURE } from '../constants';
import httpMocks from 'node-mocks-http';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let module: TestingModule;
  let authService: AuthService;

  const mockVerify = jest.fn();
  const HTTPSignature = jest.fn().mockImplementation(() => ({
    verify: mockVerify,
  }));

  beforeEach(async () => {
    module = await Test.createTestingModule(AuthModuleConfig)
      .overrideProvider(HTTPSIGNATURE)
      .useValue(HTTPSignature)
      .compile();
    await module.init();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('shouldAuthenticateRoute', () => {
    it('should return true if a service requires no authentication', () => {
      expect(authService.shouldAuthenticateRoute('/flow')).toBeFalsy();
    });

    it('should return false if a service does require authentication', () => {
      expect(authService.shouldAuthenticateRoute('/foo')).toBeTruthy();
    });
  });

  describe('authenticate', () => {
    it('should return a true when the request is corretly signed', () => {
      mockVerify.mockImplementation(() => true);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/flow/processes/1',
      });

      expect(authService.authenticate(req)).toBeTruthy();
    });

    it('should return a false when the request is corretly signed', () => {
      mockVerify.mockImplementation(() => false);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/flow/processes/1',
      });

      expect(authService.authenticate(req)).toBeFalsy();
    });

    it('should throw an HTTPRequestError if there is something wrong with the signature', () => {
      mockVerify.mockImplementation(() => { throw new Error('No signature given'); });

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/flow/processes/1',
      });

      expect(() => authService.authenticate(req)).toThrow('No signature given');
    });
  });
});