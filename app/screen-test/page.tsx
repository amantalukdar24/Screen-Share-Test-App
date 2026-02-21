"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useScreenShare } from "../hooks/useScreenShare";
import { Poppins } from "next/font/google";
const poppins=Poppins({
  subsets:["latin"],
  weight:"600"
});
export default function ScreenTest() {
  const { state, stream, resolution, displaySurface, start, retry } =
    useScreenShare();

  const videoRef = useRef<HTMLVideoElement>(null);

  
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="p-10 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Screen Test</h1>

      {state === "idle" && (
        <button onClick={start} className="w-[20vw] bg-green-400 text-white px-4 py-2 rounded cursor-pointer">
          Start Sharing
        </button>
      )}

      {state === "requesting" && <p className={`${poppins.className} text-[1.2rem] text-blue-400 animate-pulse `}>Waiting for permission...</p>}
      {state === "cancelled" && <p className={`${poppins.className} text-[1.2rem] text-yellow-500`} >You closed the picker</p>}
      {state === "denied" && <p className={`${poppins.className} text-[1.2rem] text-orange-500 `}>Permission denied</p>}
      {state === "error" && <p className={`${poppins.className} text-[1.2rem] text-red-500`}>Unknown error occurred</p>}

      {state === "granted" && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full border rounded"
          />
          <p>Stream active</p>
          <p>Resolution: {resolution}</p>
          <p>Display: {displaySurface}</p>
        </>
      )}

      {state === "ended" && (
        <>
          <p className={`${poppins.className} text-[1.2rem] text-purple-400`}>Screen sharing stopped</p>

          <button onClick={start} className="bg-blue-600 text-white px-4 py-2 rounded">
            Retry Screen Test
          </button>

          <Link href="/" >
          <button className="text-[1.1rem] bg-red-600 text-white w-[10vw] px-4 py-2 rounded-lg cursor-pointer">  Back to Home </button>
          </Link>
        </>
      )}
    </div>
  );
}