import { CardsCreateAccount } from "@/components/create-account"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Create Account",
}

export default function CreateAccount() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className=" ">
       <CardsCreateAccount/>
      </div>
    </div>
  )
}
