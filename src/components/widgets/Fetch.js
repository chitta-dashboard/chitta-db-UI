import { colors } from "../../theme";

export const Fetch = ({ children, className }) => (
    <div
      className={`text-center ${className}`}
      style={{ color: colors.text2, marginTop: "36px" }}
    >
      <span className="mb-0">{children || "Fetching..."}</span>
    </div>
  );