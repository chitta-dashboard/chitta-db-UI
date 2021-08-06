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
  return httpClient.get("mds");
};

export const getFarmersCount = () => {
  return httpClient.get("farmers/count");
};

export const getFarmers = (filter) => {
  // let qs =
  // filter?.farmerGroup
  //   ? `?_limit=500&_sort=farmerGroup:ASC,name:ASC&farmerGroup=${filter.farmerGroup}`
  //   :
  // "?_limit=500&_sort=farmerGroup:ASC,name:ASC";
  // if (filter?.limit || filter?.start) {
  // qs = qs.concat(`&_start=${filter.start}&_limit=${filter.limit}`);
  // }
  return httpClient.get(
    `farmers${`?_limit=500&_sort=farmerGroup:ASC,name:ASC`}`
  );
};

export const getFarmersGroup = () => {
  return httpClient.get("farmer-groups?_limit=350");
};

export const postMd = (params) => {
  return httpClient.post("mds", params);
};

export const putMd = (params, id) => {
  return httpClient.put(`mds/${id}`, params);
};

export const postCeo = (params) => {
  return httpClient.post("ceos", params);
};

export const putCeo = (id,params) => {
  return httpClient.put(`ceos/${id}`,params);
};

export const postFarmerGroup = (params) => {
  return httpClient.post("farmer-groups", params);
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

// export const updateFile = (data) => {
//   const formData = new FormData();
//   formData.append("ref", data.ref);
//   formData.append("refId", data.refId);
//   formData.append("field", data.field);
//   formData.append("files", data.files);

//   if (data.source) {
//     formData.append("source", data.source);
//   }

//   return axios(`${appData.app.APP_API_URL}/upload`, {
//     method: "PUT",
//     url: ``,
//     data: formData,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   }).then(({ data }) => {
//     return data;
//   });
// };

export default appData;
