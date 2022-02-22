import { Api } from '../utils/api';

describe('Given that we have a healthy service', () => {
  describe('Healtcheck', () => {
    test('Healthcheck route should return positively', () => {
      return Api.get('/healthcheck')
        .expect(200);
    });

    test('Readiness route should return positively', () => {
      return Api.get('/readycheck')
        .expect(200);
    });
  });

  describe('Security', () => {
    test('Should intercept reflected xss attacks', () => {
      // Add a get route with a path parameter that may be vulnerable
      return Api.get('/some-path?query=5f71591cbfd15b0007481261n8lsr%3cscript%3ealert(1)%3c%2fscript%3emvfsn')
        .expect(406);
    });

    test('Should intercept reflected xss attacks', () => {
      // Add a get route with a path parameter that may be vulnerable
      return Api.get('/some-path?query=5f71591cbfd15b0007481261n8lsr%3cscript%3ealert(1)%3c%2fscript%3emvfsn')
        .expect(406);
    });
  });

  describe('Context', () => {
    it('Should return a unique request id in the headers', () => {
      return Api.get('/')
        .expect(404)
        .then((res) => expect(res.headers['x-request-id']).not.toBeNull());
    });

    it('Should forward inbound request ids in the headers', () => {
      return Api.get('/')
        .set('x-request-id', 'abc')
        .expect(404)
        .then((res) => { return expect(res.headers['x-request-id']).toEqual('abc'); });
    });
  });
});
