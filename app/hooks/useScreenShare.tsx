"use client";
import { useEffect, useRef, useState } from "react";


export type ScreenState =
  | "idle"
  | "unsupported"
  | "requesting"
  | "granted"
  | "cancelled"
  | "denied"
  | "ended"
  | "error";

export function useScreenShare() {
  const [state, setState] = useState<ScreenState>("idle");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [resolution, setResolution] = useState("");
  const [displaySurface, setDisplaySurface] = useState("");

  const trackRef = useRef<MediaStreamTrack | null>(null);

  
  const isSupported =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getDisplayMedia;

  
  async function start() {
    if (!isSupported) {
      setState("unsupported");
      return;
    }

    try {
      setState("requesting");

      const media = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      const track = media.getVideoTracks()[0];
      trackRef.current = track;

      
      const settings = track.getSettings();
      setResolution(`${settings.width} x ${settings.height}`);
      setDisplaySurface(settings.displaySurface || "unknown");

      
      track.onended = () => {
        cleanup();
        setState("ended");
      };

      setStream(media);
      setState("granted");
    } catch (err: any) {
      if (err.name === "NotAllowedError") setState("denied");
      else if (err.name === "AbortError") setState("cancelled");
      else setState("error");
    }
  }

  
  function cleanup() {
    trackRef.current?.stop();
    stream?.getTracks().forEach((t) => t.stop());
    trackRef.current = null;
    setStream(null);
  }

  
  function retry() {
    cleanup();
    setState("idle");
  }

  
  useEffect(() => () => cleanup(), []);

  return { state, stream, resolution, displaySurface, start, retry, isSupported };
}