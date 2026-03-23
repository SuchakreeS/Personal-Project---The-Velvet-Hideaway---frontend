import { Link, useNavigate } from "react-router";

function Login() {
    const navigate = useNavigate

    return (
        <>
            <div className="w-full min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover flex justify-center">
                <div className="bg-secondary/80 min-h-screen w-[80%] flex flex-col items-center text-center px-4">
                    <div className="max-w-xl w-full text-white bg-black/40 p-12 rounded-lg backdrop-blur-md">
                        <h1 className="text-7xl font-fraunces mb-12 font-black">
                            Log in
                        </h1>
                        <form className="flex flex-col gap-8 text-left">
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-semibold">
                                    Enter you Username:
                                </label>
                                <input
                                    type="text"
                                    className="input w-full bg-neutral text-secondary h-14 rounded-2xl text-lg focus:outline-none"
                                    placeholder="Email or username"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-semibold">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    className="input w-full bg-neutral text-secondary h-14 rounded-2xl text-lg focus:outline-none border-4 border-[#3282B8]/50"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Login Button (Styled like your Landing button) */}
                            <button
                                type="submit"
                                className="btn btn-primary text-black bg-[#EE9300] hover:bg-[#EE9300]/90 border-none rounded-full px-12 py-3 mt-4 h-auto text-2xl font-bold transform hover:scale-105 transition-all duration-200">
                                Log in
                            </button>
                        </form>
                        {/* Footer Toggle */}
                        <p className="mt-10 text-xl">
                            Need an account?{" "}
                            <Link to="/auth/register" className="text-[#EE9300] font-bold hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login