import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { methodPost } from "../services/api_call";
import { useState } from "react";
import { Snackbar } from "@mui/material";

export const LogOut = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function logout() {
    setLoading(true);
    const { res, data } = await methodPost("/logout");

    if (res.ok) {
      Cookies.remove("token");
      
      setSuccessMessage(data.message);
      setLoading(false);
      setOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      console.error("Logout failed:", res);
      setSuccessMessage(data.message);
      setLoading(false);
    }
  }
  return (
    <>
      <button className="px-4 py-1 bg-gray-100 rounded-md" onClick={logout}>
        {loading ? "loading..." : "Log Out"}
      </button>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        message={successMessage}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
