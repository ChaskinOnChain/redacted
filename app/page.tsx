import Image from "next/image";
import LoginSide from "./LoginSide";

export default function Home() {
  return (
    <main className="min-h-screen xl:max-w-[80rem] xl:mx-auto w-full flex flex-col lg:flex-row">
      <LoginSide />
      <div className="lg:w-1/2 w-full flex flex-col gap-4 justify-center items-center">
        <div className="px-12 text-4xl font-bold text-center">
          Connect, share, and explore on{" "}
          <span className="text-sky-400">Redacted</span> - where your story
          unfolds
        </div>
        <div className="w-[30rem] h-[30rem] relative mx-auto">
          <Image src="/maincowboy.png" fill={true} alt="cowboy" />
        </div>
      </div>
    </main>
  );
}
