import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
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
    margin: 40,
    padding: 10,
    flexGrow: 1,
    display: "flex",
    color: "black",
  },
  bold_text: {
    fontSize: 14,
    textDecoration: "underline",
  },
});

export default function DecisionToPdf(props) {
  const { getDate, getDecision, getDecisionTitle, getDecisionGroup } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>
            <Text style={styles.bold_text}>தேதி : </Text>
            {getDate}
          </Text>
          <Text>
            <Text style={styles.bold_text}>குழு : </Text>
            {getDecisionGroup}
          </Text>
          <Text>
            <Text style={styles.bold_text}>தீர்மானம் தலைப்பு : </Text>
            {getDecisionTitle}
          </Text>
          <Text>
            <Text style={styles.bold_text}>தீர்மானம் :</Text> {getDecision}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
