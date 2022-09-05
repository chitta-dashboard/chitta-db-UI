import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import font from "../../../assets/fonts/Baloo_Thambi_2/BalooThambi2-Regular.ttf";

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
  },
  section: {
    // margin: 40,
    padding: 40,
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
    marginBottom: 5,
  },
  participants_text: {
    fontSize: 14,
    borderStyle: "dashed",
    borderBottomWidth: 1,
  },
});

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

          <View style={styles.section_row}>
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

          <View style={styles.section_row}>
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
