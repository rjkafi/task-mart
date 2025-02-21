import Swal from "sweetalert2";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signInWithGoogle, signInUser } = useContext(AuthContext);
    const [error, setError] = useState({});
    const [email, setEmail] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        signInWithGoogle()
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "You have logged in successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate(location.state ? location.state : "/");
            })
            .catch(() => {
                Swal.fire({
                    title: "Error!",
                    text: "Google login failed. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: "Welcome Back!",
                    text: `Hello, ${user.displayName || "User"}! You are now logged in.`,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate(location.state ? location.state : "/");
            })
            .catch(() => {
                Swal.fire({
                    title: "Error!",
                    text: "Invalid email or password. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                setError({ ...error, login: "Invalid email/password" });
            });
    };

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div>
                <div className="hero bg-base-100 min-h-screen">
                    <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                        <div className="card py-10 bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                            <h3 className="text-3xl font-bold text-center">Welcome Back!</h3>
                            <div className="space-y-3 mt-9 mb-4">
                                <div className="px-2 text-center justify-center">
                                    <button onClick={handleGoogleLogin} className="btn btn-wide">
                                        <img
                                            className="w-7 h-7"
                                            src="https://img.icons8.com/?size=96&id=17949&format=png"
                                            alt=""
                                        />
                                        Login with Google
                                    </button>
                                </div>
                                <p className="text-lg text-gray-400 px-5 text-center flex items-center justify-center">
                                    <span className="flex-1 border-t border-gray-300"></span>
                                    <span className="px-4">or</span>
                                    <span className="flex-1 border-t border-gray-300"></span>
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="px-8">
                            <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="email"
                                            name="email"
                                            className="input input-bordered" required />
                                    </div>

                                    <div className="form-control relative ">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="password"
                                            name="password"
                                            className="input input-bordered" required />
                                        <button
                                            onClick={togglePassword}
                                            className="absolute right-4 top-8 text-xl">
                                            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                        </button>
                                    </div>
                                <div className="form-control mt-6 mb-3">
                                    <button className="btn bg-blue-400 text-white text-lg font-semibold w-full">
                                        Login
                                    </button>
                                </div>
                            </form>

                            <p className="text-center font-semibold">
                                Don't have an Account?{" "}
                                <Link className="text-red-600" to="/signUp">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;