import axios from "../axiosConfig";

class Routes {
  getReports(admin_Id) {
    return axios.get(`/report/getReports/${admin_Id}`);
  }

  addReport(admin_Id, data) {
    return axios.post(`/report/addReport/${admin_Id}`, data);
  }

  updateReport(admin_Id, data) {
    return axios.patch(`/report/updateReport/${admin_Id}`, data);
  }

  deleteReport(admin_Id) {
    return axios.delete(`/report/deleteReport/${admin_Id}`);
  }

  downloadReport(id, data) {
    return axios.patch(`/report/downloadReport/${id}`, data);
  }
}

export default new Routes();
