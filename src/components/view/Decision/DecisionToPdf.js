import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import font from "../../../assets/fonts/Baloo_Thambi_2/BalooThambi2-Regular.ttf";
import Nerkathirlogo from "../../../assets/images/nerkathir_logo.png";

Font.register({
  family: "BalooThambi",
  src: font,
  fontStyle: "normal",
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontSize: 12,
    fontFamily: "BalooThambi",
    paddingTop: "2%",
    paddingBottom: "5%",
  },
  header_section: {
    flexDirection: "row",
    color: "black",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "5%",
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-start",
    justifyContent: "center",
  },
  section: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    flexGrow: 1,
    display: "flex",
    color: "black",
  },
  container: {
    width: "100%",
    borderBox: "box-sizing",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bold_text: {
    fontSize: 14,
    textDecoration: "underline dotted",
  },
  section_row: {
    paddingBottom: "2%",
  },
  section_container_host: {
    // paddingBottom: 10,
    paddingTop: "6%",
  },
  participants_text: {
    fontSize: 14,
    borderStyle: "dashed",
    borderBottomWidth: 1,
  },
  profileContainer: {
    width: "15%",
  },
  profileimg: {
    height: 80,
    width: 80,
    borderRadius: "50%",
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
    fontSize: 9,
    color: "#36574C",
  },
  headerSubText: {
    fontSize: 8,
    color: "#36574C",
  },
  address: {
    color: "#36574C",
    fontWeight: "bold",
    fontSize: 8,
  },
});

const DecisionHeader =()=>{
  return (
    <View style={styles.header_section}>
      {/* <View style={styles.profileContainer}> */}
        {/* <Image
          src={Nerkathirlogo}
          alt="logo"
          cache
          style={styles.profileimg}
        /> */}
      {/* </View> */}
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>
          Nerkathir Farmer Producer Company Limited
        </Text>
        <Text style={styles.headerSubText}>
          (Incorporated under the Indian Companies Act, 2013, (18 of 2013)
        </Text>
        <Text style={styles.subHeaderText}>CIN : UO1409TN2020PTC139086</Text>
        <Text style={styles.address}>
          Nature Farm & Rural Development Society No, 453, Power Office Main
          Road,
        </Text>
        <Text style={styles.address}>
          Sadiyampattu, Somandargudi Postal, Kallakurichi Taluk & District -
          606213 Tamil Nadu, India.
        </Text>
      </View>
    </View>
  );
}

export default function DecisionToPdf(props) {
  const {
    hosts,
    participants,
    getDate,
    getDecision,
    getDecisionTitle,
    getDecisionGroup,
  } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          render={({ pageNumber }) => (
            <DecisionHeader key={pageNumber} />
          )}
          fixed
        />
        <View style={styles.section}>
          <Text style={styles.section_row}>
            <Text style={styles.bold_text}>தேதி : </Text>
            &nbsp; {getDate}
          </Text>

          <Text style={styles.section_row}>
            <Text style={styles.bold_text}>குழு : </Text>
            &nbsp; {getDecisionGroup}
          </Text>

          <Text style={styles.section_row}>
            <Text style={styles.bold_text}>தீர்மானம் தலைப்பு : </Text>
            &nbsp; {getDecisionTitle}
          </Text>

          <Text style={styles.section_row}>
            <Text style={styles.bold_text}>தீர்மானம் :</Text> &nbsp;{" "}
            {getDecision}
          </Text>

          <View style={styles.section_container_host}>
            <Text style={styles.bold_text}>தொகுப்பாளர் :</Text>
            <View style={styles.container}>
              <Text style={styles.participants_text}>பெயர் :</Text>
              <Text style={styles.participants_text}>கையொப்பம் :</Text>
            </View>
            {hosts.map((val) => (
              <View style={styles.container}>
                <Text>{val.name}</Text>
                <Text>___________________</Text>
              </View>
            ))}
          </View>

          <View style={styles.section_container_host}>
            <Text style={styles.bold_text}>பங்கேற்பாளர்கள் :</Text>
            <View style={styles.container}>
              <Text style={styles.participants_text}>பெயர் :</Text>
              <Text style={styles.participants_text}>கையொப்பம் :</Text>
            </View>
            {participants.map((val) => (
              <View style={styles.container}>
                <Text>{val.name}</Text>
                <Text>___________________</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
