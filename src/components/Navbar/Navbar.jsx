import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Navbar = () => {
  const { user,  signOutUser } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100">
      <div className="container mx-auto">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">TaskMate</a>
        </div>
        <div className="navbar-end">
          {user &&  user?.email ? (
            <button
              className="btn outline"
              onClick={() =>  signOutUser()}
            >
              LogOut
            </button>
          ) : (
            <button className="btn outline">
              <NavLink to="/signIn">SignIn</NavLink>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
