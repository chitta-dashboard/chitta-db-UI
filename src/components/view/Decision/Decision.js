import React from "react";
import { useStyles } from "../../../assets/styles";
// import {
//   Timeline,
//   Content,
//   ContentYear,
//   ContentBody,
//   Description,
// } from "vertical-timeline-component-react";
const Decision = () => {
  const classes = useStyles();
  return (
    <div className={classes.decision}>
      <h1>Decision</h1>
    </div>
  );
};
export default Decision;

// const Decision = () => {
//   return (
//     <Timeline>
//       <Content>
//         <ContentYear
//           startMonth="12"
//           monthType="text"
//           startDay="24"
//           startYear="2016"
//           currentYear
//         />
//         <ContentBody title="Amazing Title">
//           <Description
//             text="I'm an amazing event"
//             optional="I'm an amazing optional text"
//           />
//           <Description
//             text="I'm an amazing event"
//             optional="I'm another amazing optional text"
//           />
//           <Description text="I'm an amazing event" />
//         </ContentBody>
//       </Content>
//     </Timeline>
//   );
// };
// export default Decision;
