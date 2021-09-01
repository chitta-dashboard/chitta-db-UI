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
import config from "../../constants/config";
import font from "../../assets/fonts/Baloo_Thambi_2/BalooThambi2-Regular.ttf";
import Nerkathirlogo from "../../assets/images/nerkathir_logo.png";

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
    flexDirection: "row",
    color: "black",
    margin: 10,
    height: "40vh",
    alignItems: "center",
  },
  headerTextContainer: {
    width: "70%",
  },
  regContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    fontSize: 10,
  },
  profileContainer: {
    width: "30%",
  },
  profileimg: {
    height: 100,
    width: 100,
    margin: 10,
    borderRadius: "50%",
  },
  DetailsContainer: {
    flexDirection: "row",
    margin: 10,
    marginLeft: 40,
  },
  details: {
    width: "60%",
  },
  qrContainer: {
    width: "40%",
  },
  watermark: {
    position: "absolute",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  watermark_img: {
    opacity: 0.15,
    height: "75%",
  },
  formtext: {
    fontSize: 13,
  },
  formtitle: {
    color: "#36574C",
    fontWeight: "bold",
  },
  adminCardQr: {
    width: 60,
    height: 60,
    marginLeft: 20,
  },
});

const CardToPdf = (props) => {
  const { data } = props;

  return (
    <Document>
      <Page size={[400, 200]} style={styles.page}>
        <View style={styles.section}>
          <View style={styles.profileContainer}>
            <Image
              src={
                data?.userImg?.url
                  ? `${config.app.APP_API_URL}${data.userImg.url}`
                  : require("../../assets/images/ProfileImg.jpg").default
              }
              alt=""
              cache
              style={styles.profileimg}
            ></Image>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.formtitle}>Nerkathir Farmer Producer</Text>
            <Text style={styles.formtitle}>Company Limited</Text>
            <View style={styles.regContainer}>
              <Text>Reg No:139086</Text>
              <Text>CIN:UO1409TN2020PTC139086</Text>
            </View>
          </View>
        </View>
        <View style={styles.DetailsContainer}>
          <View style={styles.details}>
            <Text style={styles.formtext}>பெயர் : {data?.name}</Text>
            <Text style={styles.formtext}>
              கைப்பேசி எண் : {data?.phoneNumber}
            </Text>
            <Text style={styles.formtext}>பிறந்த தேதி : {data?.DOB}</Text>
          </View>
          <View style={styles.qrContainer}>
            {
              <Image
                src={props.qr}
                alt=""
                style={styles.adminCardQr}
                cache
              ></Image>
            }
          </View>
        </View>
        <View style={styles.watermark}>
          <Image
            src={Nerkathirlogo}
            alt=""
            style={styles.watermark_img}
            cache
          ></Image>
        </View>
      </Page>
    </Document>
  );
};

export default CardToPdf;
