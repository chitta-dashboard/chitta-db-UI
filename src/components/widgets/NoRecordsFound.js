export const NoRecordsFound = ({ children, className }) => (
  <div
    className={`text-center ${className}`}
    style={{ color: "#E8FCFF", marginTop: "16px" }}
  >
    <span className="mb-0">{children || "No records found."}</span>
  </div>
);
