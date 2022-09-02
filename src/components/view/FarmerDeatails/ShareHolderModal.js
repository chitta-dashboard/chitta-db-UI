import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { useStyles } from "../../../assets/styles";
import ShareHolderPdf from "./ShareHolderPdf";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Box, Typography } from "@material-ui/core";

const ShareHolderModal = ({ open, handleClose, shareHolderData }) => {
  const classes = useStyles();
  const [shareValue, setShareVale] = useState("");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.share_modal_body}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h3"
            style={{ color: "#085c49" }}
          >
            Share Holder Amount
          </Typography>
          <input
            type="text"
            className="farmer-input"
            placeholder="Enter share holder amount"
            value={shareValue}
            onChange={(e) => setShareVale(e.target.value)}
          />
          <Typography variant="p">
            No of share holders - {shareHolderData?.length}
          </Typography>

          <button
            disabled={shareValue === ""}
            className={classes.exportDetails_btn}
            onClick={async () => {
              const doc = (
                <ShareHolderPdf
                  data={shareHolderData}
                  shareValue={shareValue}
                />
              );
              const asPdf = pdf([]);
              asPdf.updateContainer(doc);
              const blob = await asPdf.toBlob();
              saveAs(blob, `shareHolder-${new Date().getFullYear()}.pdf`);
              handleClose();
            }}
          >
            Confirm
          </button>
          <button
            disabled={shareValue === ""}
            className={classes.exportDetails_btn}
            onClick={async () => {
              const doc = (
                <ShareHolderPdf
                  data={shareHolderData}
                  shareValue={shareValue}
                />
              );
              const asPdf = pdf([]);
              asPdf.updateContainer(doc);
              const blob = await asPdf.toBlob();
              saveAs(blob, `shareHolder-${new Date().getFullYear()}.pdf`);
              handleClose();
            }}
          >
            Cancel
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ShareHolderModal;
