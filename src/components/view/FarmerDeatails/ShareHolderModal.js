import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { useStyles } from "../../../assets/styles";
import ShareHolderPdf from "./ShareHolderPdf";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Box, Typography } from "@material-ui/core";
const ShareHolderModal = ({ open, handleClose,selected, shareHolderData }) => {
  const classes = useStyles();
  const [shareValue, setShareVale] = useState("");
  const [loading, setLoading] = useState(false);
  const [shareHolderList, setShareHolderList] = useState([]);

  useEffect(() => {
    if (selected.length > 0) {
      let list = shareHolderData.filter((res) => selected.includes(res.id));
      setShareHolderList(list);
    }
  }, [selected]);

  const handleModalClose = () => {
    setShareVale("");
    handleClose();
    setLoading(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
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
            No of share holders - {shareHolderList?.length}
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <button
              disabled={shareValue === "" || loading === true}
              className={classes.exportDetails_btn}
              onClick={async () => {
                setLoading(true);
                const doc = (
                  <ShareHolderPdf
                    data={shareHolderList}
                    shareValue={shareValue}
                  />
                );
                const asPdf = pdf([]);
                asPdf.updateContainer(doc);
                const blob = await asPdf.toBlob();
                saveAs(blob, `shareHolder-${new Date().getFullYear()}.pdf`);
                handleModalClose();
              }}
            >
              {loading === true
                ? // <CircularProgress color="inherit" size={20} />
                  "loading"
                : "Confirm"}
            </button>
            <button
              className={classes.exportDetails_btn}
              onClick={() => {
                handleModalClose();
              }}
            >
              Cancel
            </button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ShareHolderModal;
