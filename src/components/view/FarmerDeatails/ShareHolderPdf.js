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
    flexDirection: "row",
    color: "black",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTextContainer: {
    width: "85%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#36574C",
    fontWeight: "bold",
    fontSize: 20,
  },
  subHeaderText: {
    fontSize: 10,
  },
  headerSubText: {
    fontSize: 8,
    color: "#36574C",
  },
  profileContainer: {
    width: "15%",
  },
  profileimg: {
    height: 80,
    width: 80,
    borderRadius: "50%",
  },
  DetailsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBox: "box-sizing",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  details: {
    width: "100%",
    borderBox: "box-sizing",
    display: "flex",
    paddingTop: "0.3%",
    flexWrap: "wrap",
    gap: "1rem",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    textAlign: "justify",
  },
  signContainer: {
    width: "100%",
    height: "100vh",
    borderBox: "box-sizing",
    position: "absolute",
    display: "flex",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "3%",
    flexWrap: "wrap",
    gap: "1rem",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
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
  formText: {
    fontSize: 14,
    paddingTop: "2%",
    paddingLeft: "1%",
    paddingRight: "1%",
    // width: "100%",
  },
  formSubText: {
    fontSize: 14,
    paddingTop: "2%",
    paddingLeft: "1%",
    paddingRight: "1%",
    fontWeight: "700",
    // width: "100%",
    borderStyle: "dashed",
    borderBottomWidth: 1,
    // borderBottomColor: "#000000",
    // borderBottomStyle: "solid",
  },
  signText: {
    fontSize: 14,
    borderStyle: "dashed",
    // width: "100%",
    borderTopWidth: 1,
    // borderBoColor: "#000000",
    // borderBottomStyle: "solid",
  },
  certificateContainer: {
    color: "#36574C",
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: "1%",
    paddingTop: "3%",
  },
  address: {
    color: "#36574C",
    fontWeight: "bold",
    fontSize: 10,
  },
  adminCardQr: {
    width: 60,
    height: 60,
    paddingLeft: 20,
  },
});

const ShareHolderPdf = ({ data, shareValue } ) => {
  // console.log("data", data, shareValue);
  return (
    <Document>
      {data.map((val,i) => {
        return (
          <Page
            size="A5"
            orientation="landscape"
            style={styles.page}
            key={val.id}
          >
            <View style={styles.section}>
              <View style={styles.profileContainer}>
                <Image
                  src={Nerkathirlogo}
                  alt=""
                  cache
                  style={styles.profileimg}
                ></Image>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>
                  Nerkathir Farmer Producer Company Limited
                </Text>
                <Text style={styles.headerSubText}>
                  (Incorporated under the Indian Companies Act, 2013, (18 of
                  2013)
                </Text>
                <Text style={styles.subHeaderText}>
                  CIN : UO1409TN2020PTC139086
                </Text>
                <Text style={styles.address}>
                  Nature Farm & Rural Development Society No, 453, Power Office
                  Main Road,
                </Text>
                <Text style={styles.address}>
                  Sadiyampattu, Somandargudi Postal, Kallakurichi Taluk &
                  District - 606213 Tamil Nadu, India.
                </Text>
              </View>
            </View>
            <View style={styles.DetailsContainer}>
              <View style={styles.certificateContainer}>
                <Text>SHARE CERTIFICATE</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.formText}>Certificate No</Text>
                <Text style={styles.formSubText}>NER-FPC-{1 + i}</Text>
                <Text style={styles.formText}>No. of Shares</Text>
                <Text style={styles.formSubText}>{shareValue}</Text>
                <Text style={styles.formText}>Folio No</Text>
                <Text style={styles.formSubText}></Text>
                {/* </View> */}
                {/* <View style={styles.details}> */}
                <Text style={styles.formText}>No. of Shares</Text>
                <Text style={styles.formSubText}></Text>
                <Text style={styles.formText}>from</Text>
                <Text style={styles.formSubText}></Text>
                <Text style={styles.formText}>to</Text>
                <Text style={styles.formSubText}></Text>
                <Text style={styles.formText}>both inclusive</Text>
                {/* </View> */}
                {/* <View style={styles.details}> */}
                <Text style={styles.formText}>Name</Text>
                <Text style={styles.formSubText}>{val.name}</Text>
                {/* </View> */}
                {/* <View style={styles.details}> */}
                <Text style={styles.formText}>Father's / Husband's Name</Text>
                <Text style={styles.formSubText}>
                  {val?.fatherName ?? val?.husbandName}
                </Text>
                -<Text style={styles.formText}>Occupation</Text>
                <Text style={styles.formSubText}>Farmer</Text>
                {/* </View> */}
                {/* <View style={styles.details}> */}
                <Text style={styles.formText}>Address</Text>
                <Text style={styles.formSubText}>{val.address}</Text>
                {/* </View> */}
                {/* <View style={styles.details}> */}
                <Text style={styles.formText}>
                  GIVEN under the Common Seal of the Company at
                </Text>
                <Text style={styles.formSubText}></Text>
                <Text style={styles.formText}>this the</Text>
                <Text style={styles.formSubText}></Text>
                {/* </View> */}
                {/*<View><Text>test user is the </Text></View>*/}
                {/* <View style={styles.details}> */}
                <Text style={styles.formText}>day of</Text>
                <Text style={styles.formSubText}></Text>
              </View>
            </View>
            <View style={styles.signContainer}>
              <Text style={styles.signText}>Authorised Signatory</Text>
              <Text style={styles.signText}>Director</Text>
              <Text style={styles.signText}>Managing Director</Text>
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
        );
      })}
    </Document>
  );
};

export default ShareHolderPdf;
