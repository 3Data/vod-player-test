import { useContext, useEffect, useState } from "react";
import { PlayerUiContext } from "@video/video-client-web";

export const Progress = () => {
  const playerCtx = useContext(PlayerUiContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!playerCtx?.videoElement.current) return;
    const videoElement = playerCtx.videoElement.current;
    const handleTimeUpdate = (e) => setCurrentTime(e.target.currentTime);
    const handleDurationChange = (e) => setDuration(e.target.duration);
    videoElement.addEventListener("durationchange", handleDurationChange);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("durationchange", handleDurationChange);
    };
  }, [playerCtx]);

  return (
    <ul>
      <li>Current Time: {currentTime} seconds</li>
      <li>Duration: {duration} seconds</li>
      <li>
        Progress: <progress min={0} max={duration} value={currentTime} />
      </li>
    </ul>
  );
};
