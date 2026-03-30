import useUserStore from "@/stores/userStore";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validtions/schema";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const login = useUserStore(state => state.login);
    
    const { handleSubmit, register, formState } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onSubmit'
    });
    
    const { errors, isSubmitting } = formState;

    const onSubmit = async (body) => {
        try {
            await login(body);
            toast.success('Welcome back to the Hideaway');
            navigate('/barfront');
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message;
            toast.error(errMsg);
        }
    }

    return (
        <div className="w-full min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover flex justify-center">
            <div className="bg-secondary/80 min-h-screen w-[80%] flex flex-col items-center text-center px-4">
                <div className="max-w-xl w-full text-white bg-black/40 p-12 rounded-lg backdrop-blur-md mt-20">
                    <h1 className="text-7xl font-fraunces mb-12 font-black">Log in</h1>
                    
                    <form className="flex flex-col gap-8 text-left" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">Email:</label>
                            <input
                                type="text"
                                {...register('email')}
                                className="input w-full bg-neutral text-secondary h-14 rounded-2xl text-lg focus:outline-none px-4"
                                placeholder="velvet@hideaway.com"
                            />
                            {errors.email && <p className="text-sm text-error">{errors.username.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">Password:</label>
                            <input
                                type="password"
                                {...register('password')}
                                className="input w-full bg-neutral text-secondary h-14 rounded-2xl text-lg focus:outline-none border-4 border-[#3282B8]/50 px-4"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-sm text-error">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary text-black bg-[#EE9300] hover:bg-[#EE9300]/90 border-none rounded-full px-12 py-3 mt-4 h-auto text-2xl font-bold transform hover:scale-105 transition-all duration-200 disabled:bg-gray-500"
                        >
                            {isSubmitting ? "Checking..." : "Log in"}
                        </button>
                    </form>

                    <p className="mt-10 text-xl">
                        Need an account?{" "}
                        <Link to="/auth/register" className="text-[#EE9300] font-bold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;