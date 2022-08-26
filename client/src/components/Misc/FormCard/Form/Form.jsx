import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUserContext,
  useSetUserContext,
} from "../../../../store/AuthContext";
import PasswordIcon from "../../Icons/PasswordIcon";
import UserIcon from "../../Icons/UserIcon";

function Form({ fields, buttonTxt, func, location }) {
  const navigate = useNavigate();
  const isAuthenticated = useUserContext();
  const setCurrentUser = useSetUserContext();
  const sentErr = location.state?.err || "";

  const formReducer = (state, action) => {
    return { ...state, [action.type]: action.payload };
  };

  const initialState = {
    email: "",
    password: "",
    rePassword: "",
    error: "",
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (event) => {
    const type = event.target.name;
    const payload = event.target.value;

    const action = {
      type,
      payload,
    };

    dispatch(action);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (location.pathname === "/signup") {
      if (state.password !== state.rePassword) {
        dispatch({ type: "error", payload: "Passwords do not match" });
        return;
      }
    }
    try {
      await func(state.email, state.password).then((user) => {
        setCurrentUser(user);
        navigate(-1);
      });
    } catch (err) {
      dispatch({ type: "error", payload: err.response.data.errors[0].msg });
    }
  }

  useEffect(() => {
    dispatch({ type: "error", payload: sentErr });
  }, [sentErr]);

  if (isAuthenticated) {
    return navigate("/profile");
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        return (
          <div className="form-control flex-col" key={field.title}>
            {field.type === "email" ? <UserIcon /> : <PasswordIcon />}
            <label htmlFor={field.title}>{field.placeholder}</label>
            <input
              type={field.type}
              name={field.title}
              id={field.title}
              placeholder={field.placeholder}
              value={state[field.title]}
              onChange={handleChange}
            />
          </div>
        );
      })}
      <button className="primary" type="submit">
        {buttonTxt}
      </button>
      {state.error && <span className="error">{state.error}</span>}
    </form>
  );
}

export default Form;
