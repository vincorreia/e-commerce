import { store } from "store";

export default function authHeader(payload) {
  const user = store.getState().auth;

  const header = {
    "x-auth-token": user.accessToken,
    ...payload,
  };

  if (user && user.accessToken) {
    return header;
  } else {
    return {};
  }
}
