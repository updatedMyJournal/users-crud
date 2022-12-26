import http from '../http-common.js';

class UserService {
  getAll(queryObj) {
    return http.get('/api/users', { params: queryObj });
  }

  get(id) {
    return http.get(`/api/users/${id}`);
  }

  create(data) {
    return http.post('/api/users', data);
  }
}

export default new UserService();
