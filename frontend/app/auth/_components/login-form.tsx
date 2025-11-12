import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RoleCombobox } from '@/components/ui/RoleCombobox'
import { loginSchema } from '@/lib/form-schema';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';

type loginFormType = z.infer<typeof loginSchema>;
export default function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const loginForm = useForm<loginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "",
        }
    })
    const router = useRouter();
    const handleSignIn = async (formData: loginFormType) => {
        startTransition(async () => {
            try {
                const validatedFields = loginSchema.safeParse(formData)

                if (!validatedFields.success || validatedFields.error) {
                    toast.error("Failed to validate fields")
                    return
                }

                const response = await axios.post("/api/login", validatedFields.data)
                toast.success(response.data)
                loginForm.reset();
                const { role } = validatedFields.data
                if (role === "teacher") {
                    router.push("/teacher/dashboard");
                } else if (role === "secretary") {
                    router.push("/secretary/dashboard");
                } else {
                    router.push("/admin/dashboard");
                }
            } catch (error: any) {
                toast.error(error.response.data || "Error Occurred")
            }
        })
    };

    return (
        <section>
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
                Sign In
            </h2>

            <Form {...loginForm}>
                <form className="space-y-6" onSubmit={loginForm.handleSubmit(handleSignIn)} >
                    <FormField
                        control={loginForm.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RoleCombobox value={field.value} disabledStatus={isPending} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={loginForm.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Username or Email"
                                        {...field}
                                        disabled={isPending}
                                        className="bg-white placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-orange-500"
                                    />

                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />



                    <FormField
                        control={loginForm.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                        className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
                    >
                        {isPending ? "Loading..." : "Sign IN"}
                    </Button>
                </form>
            </Form>
        </section>
    )
}
