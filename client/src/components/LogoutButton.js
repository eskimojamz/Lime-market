import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = (props) => {
  return (
    <button className="logout-btn" onClick={props.logoutAll}>
      Log Out
    </button>
  );
};

export default LogoutButton;