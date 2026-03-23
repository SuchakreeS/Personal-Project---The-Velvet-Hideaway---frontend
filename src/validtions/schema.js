import {z} from 'zod'

export const registerSchema = z.object({
    email: z.string().email().min(2, "Please input the correct email"),
    username: z.string().min(2, "Please input the username"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(1, "Please input confirm password")
}).refine(data => data.password === data.confirmPassword, {
    message: "Please check if the confirm password match the password",
    path: ['confirmPassword']
})

export const loginSchema = z.object({
    email: z.string().email().min(2, ("Please enter valid email")),
    password: z.string().min(4, "Password must be at least 4 characters")
})