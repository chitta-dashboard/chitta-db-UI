import axios from "axios";

const appData = {
  app: {
    APP_API_URL: "https://citta-db-strapi.herokuapp.com",
  },
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
