"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleStart() {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      alert("Screen sharing not supported in this browser");
      return;
    }
    router.push("/screen-test");
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Screen Share Test App</h1>

      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer"
      >
        Start Screen Test
      </button>
    </main>
  );
}
