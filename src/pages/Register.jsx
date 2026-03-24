import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/validtions/schema";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Register() {
    const {formState, register, handleSubmit, reset} = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onSubmit',
        defaultValues: {email: '', username: '', password: '', confirmPassword: ''}
    })

    const {errors} = formState

    const navigate = useNavigate()

    const onSubmit = async data => {
       try {
        const resp = await axios.post('http://localhost:8875/auth/register', data)
        toast.success(resp.data.message)
        navigate('/auth/login')
       } catch(err) {
        const errMsg = err.response?.data?.error || err.message
        toast.error(errMsg)
       }
    }

    return (
        <>
            <div className="w-full min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover flex justify-center">
                <div className="bg-secondary/80 min-h-screen w-[80%] flex flex-col items-center text-center px-4">
                    <div className="max-w-xl w-full text-white bg-black/40 p-12 rounded-lg backdrop-blur-md">
                        <h1 className="text-7xl font-fraunces mb-12 font-black">
                            Register
                        </h1>
                        <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-semibold">
                                    Username:
                                </label>
                                <div className="w-full">
                                <input
                                    type="text"
                                    {...register('username')}
                                    className="input w-full bg-neutral text-secondary h-14 rounded-2xl text-lg focus:outline-none"
                                    placeholder="Username"
                                />
                                <p className="text-sm text-error">{errors.username ?.message}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-semibold">
                                    E-mail:
                                </label>
                                <div className="w-full">
                                <input
                                    type="text"
                                    {...register('email')}
                                    className="input w-full bg-neutral text-secondary h-14 rounded-2xl text-lg focus:outline-none"
                                    placeholder="Email"
                                />
                                <p className="text-sm text-error">{errors.email?.message}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-semibold">
                                    Password:
                                </label>
                                <div className="w-full">
                                <input
                                    type="password"
                                    {...register('password')}
                                    className="input w-full bg-neutral text-secondary h-14 rounded-2xl text-lg focus:outline-none border-4 border-[#3282B8]/50"
                                    placeholder="••••••••"
                                />
                                <p className="text-sm text-error">{errors.password?.message}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-semibold">
                                    Confirm Password:
                                </label>
                                <div className="w-ful">
                                <input
                                    type="password"
                                    {...register('confirmPassword')}
                                    className="input w-full bg-neutral text-secondary h-14 rounded-2xl text-lg focus:outline-none border-4 border-[#3282B8]/50"
                                    placeholder="••••••••"
                                />
                                <p className="text-sm text-error">{errors.confirmPassword?.message}</p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary text-black bg-[#EE9300] hover:bg-[#EE9300]/90 border-none rounded-full px-12 py-3 mt-4 h-auto text-2xl font-bold transform hover:scale-105 transition-all duration-200">
                                Register
                            </button>
                        </form>
                        <p className="mt-10 text-xl">
                            Already has an acoount? {" "}
                            <Link to="/auth/login" className="text-[#EE9300] font-bold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register