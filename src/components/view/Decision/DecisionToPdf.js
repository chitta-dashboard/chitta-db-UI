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
  // console.log(typeof getDate);
  // console.log(typeof getDecision);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>தேதி : {getDate}</Text>
          <Text>தீர்மானம் : {getDecision}</Text>
        </View>
      </Page>
    </Document>
    // <Document>
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}></View>
    //     <Text style={styles.Title}>உழவர் உற்பத்தியாளர் நிறுவனம்</Text>
    //     <Text style={styles.Nabard}>நபார்டு</Text>
    //     <Text style={styles.district}>விழுப்புரம் மாவட்டம்</Text>
    //     <Text style={styles.formtitle}>உறுப்பினர் விண்ணப்பம்</Text>
    //     <Text style={styles.formsubtitle}>ஊர் பெயர் : கோவை </Text>
    //     <Text style={styles.address}>
    //       ஒருங்கிணைப்பாளர்:மஹிமா பசுமை அறக்கட்டளை, எண்.66/c, கிழக்கு தெரு,
    //       கச்சிராயப்பாளையம் - 606207
    //     </Text>
    //     <Text style={styles.officeaddress}>
    //       நிர்வாக அலுவலகம்:எண்.6, காந்திரோடு, கள்ளக்குறிச்சி - 606202
    //     </Text>
    //     <View style={styles.formnumbercontainer}>
    //       <Text style={styles.formnumber}>விண்ணப்ப எண் :12343</Text>
    //       {/* <Text style={styles.date}>
    //         நாள்{" "}
    //         {farmerData.created_at
    //           ? getFormattedDate(farmerData.created_at)
    //           : ":"}{" "}
    //       </Text> */}
    //       <Text style={styles.hr}>hellllo</Text>
    //       <View style={styles.formdatacontainer}>
    //         <Text style={styles.formkey}>{getDate}</Text>
    //         <Text style={styles.separator}>{getDecision}</Text>
    //       </View>
    //     </View>
    //     <View></View>
    //   </Page>
    // </Document>
  );
}
