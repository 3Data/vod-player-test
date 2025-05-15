import { useEffect, useState } from "react";
import { LoggerGlobal } from "@video/log-client";
import {
  PlayerUiContext,
  PlayerUiState,
  VideoClient,
} from "@video/video-client-web";
import Player from "./Player";

export const VodPlayer = ({
  manifest,
  poster,
  controls = false,
  muted = false,
  autoPlay = true,
}) => {
  const [vc, setVc] = useState(null); // VideoClient
  const [playerUi, setPlayerUi] = useState(null); // PlayerUI
  const [livelyLogger] = useState(new LoggerGlobal());

  useEffect(() => {
    if (!livelyLogger) return;
    const livelyApiUrl = "https://invertred.generflow.com";
    livelyLogger.setOptions({
      host: livelyApiUrl,
      interval: 10000,
      level: "debug",
    });
  }, [livelyLogger]);

  useEffect(() => {
    if (vc == null) {
      const videoClientOptions = {
        // Looks like this autoPlay isn't having effect, the playerUi config is the good one
        // autoPlay: autoPlay,
      };
      const newVc = new VideoClient(videoClientOptions);
      setVc(newVc);
    }
    return () => {
      if (vc != null) {
        vc.dispose();
        setVc(null);
      }
    };
  }, [autoPlay, vc]);

  useEffect(() => {
    if (vc != null && playerUi == null && manifest) {
      const options = {
        // autoPlay should be configured here or in the VideoClient options?
        autoPlay: autoPlay,
        muted: muted,
        players: [{ id: "native-hls" }, { id: "hlsjs" }],
      };
      const player = vc.requestPlayer(manifest, options);
      setPlayerUi(new PlayerUiState(player));
      return () => {
        if (playerUi != null) {
          playerUi.dispose();
          setPlayerUi(null);
        }
      };
    }
  }, [vc, playerUi, manifest, autoPlay, muted]);

  if (playerUi == null) {
    return <></>;
  }

  return (
    <PlayerUiContext.Provider value={playerUi}>
      <Player controls={controls} poster={poster} />
    </PlayerUiContext.Provider>
  );
};
