import { colors } from "../../theme";

export const Loader = ({ children, className }) => (
  <div
    className={`text-center ${className}`}
    style={{ color: colors.text2, marginTop: "36px" }}
  >
    <span className="mb-0">{children || "Loading..."}</span>
  </div>
);
