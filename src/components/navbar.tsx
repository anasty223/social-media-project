import { Link, NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { styles } from "../../src/styles/navbar.styles";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      <div style={styles.container}>
        <div>
          <nav>
            <NavLink
              className={({ isActive }) =>
                isActive ? "activeLinkHeader" : "inActiveLinkHeader"
              }
              to="/"
            >
              Posts
            </NavLink>
            {!user ? (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "activeLinkHeader" : "inActiveLinkHeader"
                }
                to="/login"
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "activeLinkHeader" : "inActiveLinkHeader"
                }
                to="/createpost"
              >
                Create Post
              </NavLink>
            )}
          </nav>
  
        </div>

        <div>
          {user && (
            <>
              <div style={styles.containerImg}>
                <img
                  style={styles.img}
                  src={user?.photoURL || ""}
                  alt="phot user"
                  width="50"
                  height="50"
                />
                <p style={styles.textHeader}>{user?.displayName}</p>
                <button
                  className="bw buttonheader borderless "
                  onClick={signUserOut}
                >
                  Log Out
                </button>{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
