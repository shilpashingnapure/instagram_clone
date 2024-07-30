import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { Snackbar } from "@mui/material";
import { methodPost } from "../services/api_call";
import { InputField } from "./input-field";
import { ErrorCodes } from "../services/errors";
import { validate } from "../services/validate-input";



export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [ successMessage , setSuccessMessage ] = useState('');

  const navigate = useNavigate();


  // login API
  async function userLogin(e) {
    e.preventDefault();
    
    const { isValidate , newErrors } = validate({ email , password})
    if (!isValidate) {
        setErrors(newErrors)
        return;
    }

    setLoading(true);
    const { res, data } = await methodPost("/login", { email, password });

    if (res.ok) {
      Cookies.set("token", data.token);

      setSuccessMessage(data.message);
      setOpen(() => true);
      setLoading(false);
      // navigate to home page
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      const errorCode = data.message;
      switch (errorCode) {
        case ErrorCodes.EMAIL_DOES_NOT_EXIST:
          setErrors({ email: ErrorCodes.EMAIL_DOES_NOT_EXIST });
          break;
        case ErrorCodes.PASSWORD_DOES_NOT_MATCH:
          setErrors({ password: ErrorCodes.PASSWORD_DOES_NOT_MATCH });
          break;
        default:
          setSuccessMessage(data.message);
          setOpen(() => true);
      }
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-[35px] border-[1px] border-[var(--border-color)] text-center p-[35px] w-[350px] m-auto">
        <div className="flex justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjtjBw4xwF01ZdKL1cmnYZD3vdavlQPOWA7w&s"
            alt=""
            className="w-[80%] h-[80%] mt-[-5px]"
          />
        </div>
        <div className="flex flex-col gap-[20px]">

          {/* Form  */}
          <form className="flex flex-col gap-3">
            <InputField
              label={"Email"}
              value={email}
              type={"text"}
              error={errors.email}
              onChange={(value) => setEmail(value)}
            />
            <InputField
              label={"Password"}
              value={password}
              type={"password"}
              error={errors.password}
              onChange={(value) => setPassword(value)}
            />
            <button className="rounded-[8px] text-[#fff] px-[8px] py-[6px] bg-[var(--primary-background)]" onClick={userLogin} type="submit" >
              {loading ? "loading..." : "Log in"}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <span className="h-[1px] bg-[var(--border-color)] flex-1"></span>
            <span>OR</span>
            <span className=" h-[1px] bg-[var(--border-color)] flex-1"></span>
          </div>
          <div>Forgot password ?</div>
        </div>
      </div>
      <div className="border-[1px] border-[var(--border-color)] py-[15px] px-[10px] text-center">
        <p>
          Don't have an account?  <span className="text-blue-500 font-bold"><Link to="/signup">Sign up</Link></span>
        </p>
      </div>

      {/* when its login successfully */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message={successMessage}
      />
    </div>
  );
};
