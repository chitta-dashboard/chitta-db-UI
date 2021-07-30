export const toastOptions = {
  className: "custom-toast",
  autoClose: 4000,
  position: "top-right",
};

export const uuid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const searchWord = (text, word) =>
  text
    ? text
        .trim()
        .toLowerCase()
        .search(
          word
            .replace(/[*+?^${}()|[\]\\]/g, "\\$&")
            .trim()
            .toLowerCase()
        ) >= 0
    : false;

export const ListItems = [
  {
    id: "1",
    name: "Dashboard",
    Router: "/dashboard",
  },
  {
    id: "2",
    name: "MD Details",
    Router: "/dashboard",
  },
  {
    id: "3",
    name: "CEO Details",
    Router: "/dashboard",
  },
  {
    id: "4",
    name: "Farmer Groups",
    Router: "/dashboard",
  },
  {
    id: "5",
    name: "Farmers Details",
    Router: "/farmersdetails",
  },
  {
    id: "6",
    name: "Register",
    Router: "/dashboard",
  },
  {
    id: "7",
    name: "Decision",
    Router: "/dashboard",
  },
];

export const toGetTamilGender = (gender) => {
  if (gender === "male") return "ஆண்";
  else if (gender === "female") return "பெண்";
  return "";
};

export const getFormattedDate = (date) => {
  const formatedDate = date && new Date(date);

  return `${formatedDate?.getDate()}/${
    formatedDate?.getMonth() + 1
  }/${formatedDate?.getFullYear()}`;
};

export const FarmerDetailsList = [
  {
    id: "1",
    key: "பெயர்",
    name: "name",
  },
  {
    id: "2",
    key: "தந்தை பெயர் ",
    name: "fatherName",
  },
  {
    id: "3",
    key: "கணவர் பெயர் ",
    name: "husbandName",
  },
  {
    id: "4",
    key: "பிறந்த தேதி ",
    name: "DOB",
  },
  {
    id: "5",
    key: "கைபேசி எண் ",
    name: "phoneNumber",
  },
  {
    id: "6",
    key: "ஆதார் எண் ",
    name: "aadharNumber",
  },
  {
    id: "7",
    key: "வாக்காளர் அட்டை எண்  ",
    name: "voterIdNumber",
  },
  {
    id: "8",
    key: "சர்வே எண் ",
    name: "surveyArray",
  },
  {
    id: "9",
    key: "ஏக்கர் ",
    name: "acre",
  },
  {
    id: "10",
    key: "பாலினம் ",
    name: "gender",
  },
  {
    id: "11",
    key: "கல்வி ",
    name: "education",
  },
  {
    id: "12",
    key: "முகவரி ",
    name: "address",
  },
  {
    id: "13",
    key: "ஊர் ",
    name: "village",
  },
  {
    id: "14",
    key: "வட்டம் ",
    name: "circle",
  },
  {
    id: "15",
    key: "மாவட்டம் ",
    name: "district",
  },
  {
    id: "16",
    key: "பின் கோடு ",
    name: "pincode",
  },
];
