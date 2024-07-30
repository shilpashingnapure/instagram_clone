import { Link, useNavigate } from "react-router-dom";
import { InputField } from "./input-field";
import { useState } from "react";
import { validate } from "../services/validate-input";
import { methodPost } from "../services/api_call";
import { ErrorCodes } from "../services/errors";
import Cookies from "js-cookie";
import { Snackbar } from "@mui/material";

export const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  async function register(e) {
    e.preventDefault();

    const { isValidate, newErrors } = validate({
      email,
      fullname,
      username,
      password,
    });
    if (!isValidate) {
      setErrors(newErrors);
      return;
    }

    const user = { email, fullname, username, password };

    const { res, data } = await methodPost("/register", user);

    if (res.ok) {
      Cookies.set("token", data.token , { expires: 7, secure: true, sameSite: 'none' , path: '/'  });
      setLoading(false);
      setTimeout(() => {
        // navigate to home page
        navigate("/");
      }, 2000);
    } else {
      const errorCode = data.message;
      switch (errorCode) {
        case ErrorCodes.EMAIL_ALREADY_EXISTS:
          setErrors({ email: ErrorCodes.EMAIL_ALREADY_EXISTS });
          break;
        case ErrorCodes.USERNAME_ALREADY_EXISTS:
          setErrors({ username: ErrorCodes.USERNAME_ALREADY_EXISTS });
          break;
        default:
          setOpen(() => true);
      }
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-[350px] m-auto pt-5">
      <div className="flex flex-col gap-[35px]  border-[1px] border-[var(--border-color)] text-center p-[35px]">
        <div className="flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjtjBw4xwF01ZdKL1cmnYZD3vdavlQPOWA7w&s"
            alt=""
            className="w-[80%] h-[80%]"
          />
          <p className="font-bold text-[var(--mute-color)] text-[16px] leading-5">
            Sign up to see photos and videos from your friends.
          </p>
        </div>
        <div className="form">
          {/* Form  */}
          <form className="flex flex-col gap-3">
            <InputField
              label={"Email"}
              type={"text"}
              error={errors.email}
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <InputField
              label={"Full Name"}
              type={"text"}
              error={errors.fullname}
              value={fullname}
              onChange={(value) => setFullname(value)}
            />
            <InputField
              label={"Username"}
              type={"text"}
              error={errors.username}
              value={username}
              onChange={(value) => setUsername(value)}
            />
            <InputField
              label={"Password"}
              type={"password"}
              error={errors.password}
              value={password}
              onChange={(value) => setPassword(value)}
            />
            <div className="text-[12px]">
              <p className="mb-4">
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <span className="text-[#243e63] font-semibold">Learn More</span>
              </p>
              <p>
                By signing up, you agree to our{" "}
                <span className="text-[#243e63] font-semibold">
                  Terms , Privacy Policy and Cookies Policy .
                </span>
              </p>
            </div>

            <button
              className="rounded-[8px] text-[#fff] px-[8px] py-[6px] bg-[var(--primary-background)]"
              type="submit"
              onClick={register}
            >
              {loading ? "loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      <div className="border-2 py-[15px] px-[10px] text-center">
        <p>
          Have an account?
          <span className="text-blue-500 font-bold">
            <Link to="/login"> login in</Link>
          </span>
        </p>
      </div>

      {/* when its register successfully */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="register Sucessfully !!"
      />
    </div>
  );
};
