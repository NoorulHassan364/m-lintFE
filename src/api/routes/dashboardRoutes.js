import axios from "../axiosConfig";

class Routes {
  addDashboard(id, data) {
    return axios.post(`dashboard/addDashboard/${id}`, data);
  }

  addDashboardImages(id, data) {
    return axios.patch(`dashboard/addDashboardImages/${id}`, data);
  }

  deleteDashboard(admin_Id, id) {
    return axios.patch(`dashboard/deleteDashboard/${admin_Id}/${id}`);
  }

  getDashboards(id) {
    return axios.get(`dashboard/getDashboards/${id}`);
  }

  getSelectedDashboard(id) {
    return axios.get(`dashboard/getSelectedDashboard/${id}`);
  }

  generateToken() {
    return axios.get(`dashboard/getToken`);
  }
}

export default new Routes();
