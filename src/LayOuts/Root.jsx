import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";




const Root = () => {
    return (
        <>
        <Toaster></Toaster>
          <Navbar></Navbar> 
          <Outlet></Outlet>
        </>
    );
};

export default Root;