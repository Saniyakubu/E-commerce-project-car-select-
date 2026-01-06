import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ContextProvider } from "@/Store";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiX, FiMail, FiLock, FiUser } from "react-icons/fi";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess?: () => void;
};

type AuthFormValues = {
  fullName?: string;
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const signupSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const AuthModal = ({ open, onOpenChange, onAuthSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { setIsLoading, isLoading } = useContext(ContextProvider);

  const schema = useMemo(
    () => (mode === "login" ? loginSchema : signupSchema),
    [mode]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema as unknown as z.ZodTypeAny),
  });

  useEffect(() => {
    reset();
  }, [mode, reset]);

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    try {
      if (mode === "login") {
        const res = await axios.post(
          "https://carlists.onrender.com/login",
          values,
          { withCredentials: true }
        );
        toast(res?.data?.Msg ?? "Logged in successfully");
        localStorage.setItem("user", JSON.stringify({ user: values.email }));
        onOpenChange(false);
        onAuthSuccess?.();
      } else {
        const res = await axios.post(
          "https://carlists.onrender.com/signup",
          values,
          { withCredentials: true }
        );
        if (res?.data?.success === false) {
          toast("Signup unsuccessful");
          return;
        }
        toast(res?.data?.Msg ?? "Account created successfully");
        localStorage.setItem(
          "user",
          JSON.stringify({ user: values.fullName })
        );
        onOpenChange(false);
        onAuthSuccess?.();
      }
    } catch (err: any) {
      toast(err?.response?.data?.Msg ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-6 pb-6 pt-8">
            <Dialog.Close asChild>
              <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <FiX className="h-5 w-5" />
              </button>
            </Dialog.Close>

            <Dialog.Title className="text-2xl font-bold text-foreground">
              {mode === "login" ? "Welcome back" : "Create account"}
            </Dialog.Title>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Sign in to continue to CarSelect"
                : "Join CarSelect to start shopping"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                mode === "login"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                mode === "signup"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-4">
              {mode === "signup" && (
                <div>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      {...register("fullName")}
                      placeholder="Full name"
                      className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-destructive">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email address"
                    className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
            >
              {isLoading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}
            </button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-medium text-primary hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthModal;
