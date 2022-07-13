import axios from "../axiosConfig";

class Routes {
  addFolder(id, data) {
    return axios.post(`folder/addFolder/${id}`, data);
  }

  getFolder(id) {
    return axios.get(`folder/getFolder/${id}`);
  }

  deleteFolder(id) {
    return axios.delete(`folder/deleteFolder/${id}`);
  }

  updateFolder(id, data) {
    return axios.patch(`folder/updateFolder/${id}`, data);
  }

  uploadFile(id, data) {
    return axios.post(`folder/uploadFile/${id}`, data);
  }

  getFolderById(data, id) {
    return axios.post(`folder/getFolderById/${id}`, data);
  }

  getFiles(id) {
    return axios.get(`folder/getFiles/${id}`);
  }
}

export default new Routes();
