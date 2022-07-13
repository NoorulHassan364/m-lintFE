import axios from "../axiosConfig";

class Routes {
  getUsers(admin_Id) {
    return axios.get(`/user/getUsers/${admin_Id}`);
  }

  updateUser(_id, data) {
    return axios.patch(`/user/updateUser/${_id}`, data);
  }

  deleteUser(_id) {
    return axios.delete(`/user/deleteUser/${_id}`);
  }

  sendInvitation(data, _id) {
    return axios.post(`/user/sendInvitation/${_id}`, data);
  }

  addNotification(data) {
    return axios.post(`/user/add-notification`, data);
  }

  getNotifications(id, days) {
    return axios.post(`/user/get-notifications/${id}`, days);
  }

  sendMessage(id, data) {
    return axios.patch(`/user/sendMessage/${id}`, data);
  }

  readMessages(adminId = 0, userId = 0) {
    return axios.get(`/user/readMessages/${adminId}/${userId}`);
  }

  // readMessages(id) {
  //   return axios.get(`/user/readUserMessages/${id}`);
  // }

  updateLastView(id, data) {
    return axios.patch(`/user/updateLastView/${id}`, data);
  }

  getUsageAnalytics(id) {
    return axios.get(`/user/getUsageAnalytics/${id}`);
  }
}

export default new Routes();
