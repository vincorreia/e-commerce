import { Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import FormCard from "../Misc/FormCard/FormCard";

function Signup() {
  const location = useLocation();

  const header = "Sign up for free";

  const buttonTxt = "Sign up";

  const footer = {
    text: "Already have an account? ",
    link: <Link to="/login">Login</Link>,
  };

  const fields = [
    {
      type: "email",
      title: "email",
      placeholder: "Email address",
    },
    {
      type: "password",
      title: "password",
      placeholder: "Password",
    },
    {
      type: "password",
      title: "rePassword",
      placeholder: "Repeat Password",
    },
  ];

  return (
    <FormCard
      fields={fields}
      footer={footer}
      header={header}
      func={authService.signup}
      location={location}
      buttonTxt={buttonTxt}
    />
  );
}

export default Signup;
