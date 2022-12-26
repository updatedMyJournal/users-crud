import http from '../http-common.js';

class UserEventService {
  create(id, data) {
    return http.post(`/api/users/${id}/events`, data);
  }

  getAllUserEvents(id, queryObj) {
    return http.get(`/api/users/${id}/events`, { params: queryObj });
  }
}

export default new UserEventService();
