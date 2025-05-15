import { useContext, useEffect } from "react";
import {
  ControlBar,
  PlayerUiContext,
  MediaContainer,
  PlayerAudioButton,
  PlayerGetSoundButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";
import { Progress } from "./progress";

const Player = ({ controls, poster }) => {
  const playerCtx = useContext(PlayerUiContext);

  useEffect(() => {
    playerCtx.player.poster = poster;
  }, [playerCtx, poster]);

  return (
    <>
      <MediaContainer>
        <PlayerGetSoundButton />
        <PlayerVideo autoPlayerSetup />
        <PlayerOverlayButton />
      </MediaContainer>
      {controls && (
        <ControlBar variant="player">
          <PlayerPlayButton />
          <PlayerAudioButton />
          <PlayerVolumeRange />
        </ControlBar>
      )}
      <Progress />
    </>
  );
};

export default Player;
