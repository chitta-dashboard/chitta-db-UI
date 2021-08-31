import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import config from "../../../constants/config";
import { FarmerDetailsList } from "../../../constants";
import font from "../../../assets/fonts/Baloo_Thambi_2/BalooThambi2-Regular.ttf";
import Nerkathirlogo from "../../../assets/images/nerkathir_logo.png";

//Register styles
Font.register({
  family: "BalooThambi",
  src: font,
  fontStyle: "normal",
  fontWeight: "normal",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "BalooThambi",
  },
  section: {
    margin: 40,
    padding: 0,
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    color: "black",
  },
  Nabard: {
    fontSize: 10,
  },
  district: {
    fontSize: 10,
  },
  formtitle: {
    fontSize: 10,
  },
  profileimg: {
    height: 80,
    width: 75,
    position: "absolute",
    right: 0,
  },
  formsubtitle: {
    width: "100%",
    fontSize: 9,
  },
  address: {
    width: "100%",
    fontSize: 9,
    textAlign: "center",
  },
  officeaddress: {
    width: "100%",
    fontSize: 9,
    textAlign: "center",
  },
  formnumbercontainer: {
    width: "100%",
    fontSize: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formnumber: {},
  date: {},
  hr: {
    fontSize: 5,
    width: "100%",
    height: "0.5px",
    backgroundColor: "black",
    marginTop: "10rem",
  },
  formdatacontainer: {
    marginTop: "10rem",
    margin: "10rem",
    width: "100%",
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formkey: {
    width: "50%",
  },
  separator: {},
  formvalue: {
    width: "50%",
    marginLeft: "5rem",
  },
  watermark: {
    position: "absolute",
    width: "100%",
    height: "90vh",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  },
  watermark_img: {
    opacity: 0.15,
    height: "40%",
  },
});

// Create Document Component
const FarmerDetailsToPdf = (props) => {
  const { getFarmerData, farmerData } = props;
  const d = new Date();
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.Title}>உழவர் உற்பத்தியாளர் நிறுவனம்</Text>
          <Text style={styles.Nabard}>நபார்டு</Text>
          <Text style={styles.district}>கள்ளக்குறிச்சி மாவட்டம்</Text>
          <Text style={styles.formtitle}>உறுப்பினர் விண்ணப்பம்</Text>
          <Image
            src={
              farmerData?.userImg?.url
                ? `${config.app.APP_API_URL}${farmerData.userImg.url}`
                : require("../../../assets/images/ProfileImg.jpg").default
            }
            alt=""
            cache
            style={styles.profileimg}
          ></Image>
          <Text style={styles.address}>
            ஒருங்கிணைப்பாளர்:மஹிமா பசுமை அறக்கட்டளை, எண்.66/c, கிழக்கு தெரு,
            கச்சிராயப்பாளையம் - 606207
          </Text>
          <Text style={styles.officeaddress}>
            நிர்வாக அலுவலகம்:எண்.6, காந்திரோடு, கள்ளக்குறிச்சி - 606202
          </Text>
          <View style={styles.formnumbercontainer}>
            <Text style={styles.formnumber}>விண்ணப்ப எண் :NER-FPC-12343</Text>
            <Text style={styles.date}>
              நாள் :{`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`}
            </Text>
          </View>
          <Text style={styles.hr}>hellllo</Text>
          <View style={styles.watermark}>
            <Image
              src={Nerkathirlogo}
              alt=""
              cache
              style={styles.watermark_img}
            ></Image>
          </View>

          {FarmerDetailsList.map((user) => {
            return (
              <View style={styles.formdatacontainer} key={user.id}>
                <Text style={styles.formkey}>{user.key}</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.formvalue}>
                  {" "}
                  {getFarmerData(user.name)}
                </Text>
              </View>
            );
          })}
        </View>
        <View></View>
      </Page>
    </Document>
  );
};

export default FarmerDetailsToPdf;
