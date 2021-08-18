import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import font from "../../../assets/fonts/Baloo_Thambi_2/BalooThambi2-Regular.ttf";

Font.register({
  family: "BalooThambi",
  src: font,
  fontStyle: "normal",
  fontWeight: "normal",
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "BalooThambi",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    color: "black",
  },
});

export default function DecisionToPdf(props) {
  const { getDate, getDecision } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>தேதி : {getDate}</Text>
          <Text>தீர்மானம் : {getDecision}</Text>
        </View>
      </Page>
    </Document>
  );
}
