import axios from "axios";
import { HttpClient } from "./httpClient";

const appData = {
  app: {
    APP_API_URL: "https://citta-db-strapi.herokuapp.com",
  },
};
let httpClient = new HttpClient();
export const getCEO = () => {
  return httpClient.get("ceos");
};

export const getMD = () => {
  return axios
    .get(`${appData.app.APP_API_URL}/mds`)
    .then((res) => res.data)
    .catch((e) => e);
};

export const getFarmers = () => {
  return axios
    .get(`${appData.app.APP_API_URL}/farmers`)
    .then((res) => res.data)
    .catch((e) => e);
};

export const getFarmersGroup = () => {
  return axios
    .get(`${appData.app.APP_API_URL}/farmer-groups`)
    .then((res) => res.data)
    .catch((e) => e);
};

export const uploadFile = (data) => {
  const formData = new FormData();
  formData.append("ref", data.ref);
  formData.append("refId", data.refId);
  formData.append("field", data.field);
  formData.append("files", data.files);

  if (data.source) {
    formData.append("source", data.source);
  }

  return axios(`${appData.app.APP_API_URL}/upload`, {
    method: "POST",
    url: ``,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(({ data }) => {
    return data;
  });
};

export default appData;
