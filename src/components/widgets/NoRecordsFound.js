import { colors } from "../../theme";

export const NoRecordsFound = ({ children, className }) => (
  <div
    className={`text-center ${className}`}
    style={{ color: colors.text2, marginTop: "16px" }}
  >
    <span className="mb-0">{children || "No records found."}</span>
  </div>
);
