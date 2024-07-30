import { Close } from "@mui/icons-material";
import "./customModal.css";
export const CustomModal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
      <div className="w-full h-full bg-gray-300 ">
        <div className="modal-container">{children}</div>
  
        {/* close icon outside the content */}
        <div className="close-icon">
          <button onClick={onClose}>
            <Close sx={{ fontSize: "30px", color: "white" }} />
          </button>
        </div>
  
        {/* overlay */}
        <div className="modal-overly"></div>
      </div>
    );
  };