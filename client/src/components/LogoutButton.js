import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = ({setUserData}) => {
  const { logout } = useAuth0()
  const logoutAll = () => {
    setUserData()
    logout()
  }

  return (
    <button className="logout-btn" onClick={() => logoutAll()}>
      Log Out
    </button>
  );
};

export default LogoutButton;