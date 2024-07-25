import { PasswordForm } from "@/components/PasswordForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <h1 className="font-bold text-xl">Password Generator</h1>
      <PasswordForm />
    </main>
  );
}
