import Image from "next/image";
import logo from "~/app/icon.png";
import { Signout } from "~/components/signout-button";
import { ThemeToggler } from "~/components/theme-toggler";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image alt="Logo" className="mx-auto" height={50} src={logo} width={50} />
      <h1 className="my-4 font-bold font-sans text-4xl">WorkWise</h1>
      <ThemeToggler className="cursor-pointer" />
      <Signout />
    </main>
  );
}
