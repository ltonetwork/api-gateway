import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModuleConfig } from './auth.module';
import { AuthMiddleware } from './auth.middleware';
import { HttpException } from '@nestjs/common';
import httpMocks from 'node-mocks-http';

describe('AuthMiddleware', () => {
  let module: TestingModule;
  let authMiddleware: AuthMiddleware;
  let authService: AuthService;

  beforeEach(async () => {
    module = await Test.createTestingModule(AuthModuleConfig).compile();
    await module.init();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    module.close();
  });

  describe('authMiddleware', () => {
    describe('authenticate', () => {
      it('should authenticate the request and call next with valid request', async () => {
        authMiddleware = module.get<AuthMiddleware>(AuthMiddleware);
        jest
          .spyOn(authService, 'shouldAuthenticateRoute')
          .mockImplementation(() => true);
        jest.spyOn(authService, 'authenticate').mockImplementation(() => true);

        const req = httpMocks.createRequest({
          method: 'GET',
          url: '/flow/processes/1',
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();
        authMiddleware.use(req, res, next);
        expect(next.mock.calls.length).toBe(1);
      });

      it('should call next if no authentication is required', async () => {
        authMiddleware = module.get<AuthMiddleware>(AuthMiddleware);
        jest
          .spyOn(authService, 'shouldAuthenticateRoute')
          .mockImplementation(() => false);
        jest.spyOn(authService, 'authenticate').mockImplementation(() => false);

        const req = httpMocks.createRequest({
          method: 'GET',
          url: '/flow/processes/1',
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();
        authMiddleware.use(req, res, next);
        expect(next.mock.calls.length).toBe(1);
      });

      it('should throw and exception if authentication fails', async () => {
        authMiddleware = module.get<AuthMiddleware>(AuthMiddleware);
        jest
          .spyOn(authService, 'shouldAuthenticateRoute')
          .mockImplementation(() => true);
        jest.spyOn(authService, 'authenticate').mockImplementation(() => false);

        const req = httpMocks.createRequest({
          method: 'GET',
          url: '/flow/processes/1',
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();
        expect(() => authMiddleware.use(req, res, next)).toThrow(
          HttpException,
        );
      });
    });
  });
});
