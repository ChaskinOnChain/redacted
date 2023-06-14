import Image from "next/image";
import LoginSide from "./LoginSide";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex">
      <LoginSide />
      <div className="w-1/2 flex flex-col gap-4 justify-center items-center">
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
