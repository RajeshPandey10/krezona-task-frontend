import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters long").max(50, "First name is too long").optional(),

    lastName: z.string().min(3, "Last name must be at least 3 characters long").max(50, "Last name is too long").optional(),

    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),

    password: z.string().min(6, "Password must be at least 6 characters long").regex(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
export const otpVerificationSchema = z.object({
    email: z.string().email(),
    otp: z
        .string()
        .length(6, 'OTP must be 6 digits')
        .regex(/^\d+$/, 'OTP must contain only numbers'),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type OtpVerificationForm = z.infer<typeof otpVerificationSchema>;