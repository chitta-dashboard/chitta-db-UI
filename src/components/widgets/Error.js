import { colors } from "../../theme";

export const Error = ({ children, className, error }) => (
  <div
    className={`text-center ${className}`}
    style={{ color: colors.text2, marginTop: "36px" }}
  >
    <span className="mb-0">{children || `Error: ${error}`}</span>
  </div>
);
