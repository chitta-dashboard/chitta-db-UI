import React from "react";
import { useStyles } from "../../../assets/styles";
import {
  Timeline,
  Container,
  YearContent,
  BodyContent,
  Section,
  Description,
} from "vertical-timeline-component-react";
// const Decision = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.decision}>
//       <h1>Decision</h1>
//     </div>
//   );
// };
// export default Decision;

const Decision = () => {
  const classes = useStyles();
  const customTheme = {
    yearColor: "#405b73",
    lineColor: "#d0cdc4",
    dotColor: "#262626",
    borderDotColor: "#d0cdc4",
    titleColor: "#36574C",
    subtitleColor: "#bf9765",
    textColor: "#262626",
  };

  return (
    <div className={classes.decision}>
      <Timeline theme={customTheme} dateFormat="ll">
        <Container>
          <YearContent startDate="2020/07/01" currentYear />
          <BodyContent>
            <Section title="Title">
              <Description variant="subtitle" text="Subtitle" />
              <Description text="Description" />
              <Description text="Another description" />
            </Section>

            <Section title="Another title">
              <Description text="Description" />
              <Description text="Another description" />
            </Section>
          </BodyContent>
        </Container>
        <Container>
          <YearContent startDate="2020/08/01" currentYear />
          <BodyContent>
            <Section title="Title">
              <Description variant="subtitle" text="Subtitle" />
              <Description text="Description" />
              <Description text="Another description" />
            </Section>

            <Section title="Another title">
              <Description text="Description" />
              <Description text="Another description" />
            </Section>
          </BodyContent>
        </Container>
        <Container>
          <YearContent startDate="2020/07/01" currentYear />
          <BodyContent>
            <Section title="Title">
              <Description variant="subtitle" text="Subtitle" />
              <Description text="Description" />
              <Description text="Another description" />
            </Section>

            <Section title="Another title">
              <Description text="Description" />
              <Description text="Another description" />
            </Section>
          </BodyContent>
        </Container>
        <Container>
          <YearContent startDate="2020/07/01" />
          <BodyContent>
            <Section title="Title">
              <Description variant="subtitle" text="Subtitle" />
              <Description text="Description" />
              <Description text="Another description" />
            </Section>

            <Section title="Another title">
              <Description text="Description" />
              <Description text="Another description" />
            </Section>
          </BodyContent>
        </Container>
      </Timeline>
    </div>
  );
};
export default Decision;
