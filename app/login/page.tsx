import { CardsCreateAccount } from "@/components/create-account"
import { LoginForm } from "@/components/login-form"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Login",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-3/4 max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}