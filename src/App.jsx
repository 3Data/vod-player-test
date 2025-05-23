import { useState } from "react";
import { VodPlayer } from "./VodPlayer";

function App() {
  const [manifest, setManifest] = useState("");
  const [poster, setPoster] = useState("");
  const [controls, setControls] = useState(false);
  const [muted, setMuted] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [mount, setMount] = useState(false);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "5px",
          textAlign: "left",
          marginBottom: "20px",
          alignItems: "start",
        }}
      >
        <label>Manifest URL</label>
        <input
          type="text"
          placeholder="Manifest URL"
          value={manifest}
          onChange={(e) => setManifest(e.target.value)}
        />
        <label>Poster URL</label>
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
        <label>Controls</label>
        <div>
          <input
            type="checkbox"
            checked={controls}
            onChange={(e) => setControls(e.target.checked)}
          />
        </div>
        <label>Muted</label>
        <div>
          <input
            type="checkbox"
            checked={muted}
            onChange={(e) => setMuted(e.target.checked)}
          />
        </div>
        <label>AutoPlay</label>
        <div>
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={(e) => setAutoPlay(e.target.checked)}
          />
        </div>
        <label>Mount</label>
        <div>
          <input
            type="checkbox"
            checked={mount}
            onChange={(e) => setMount(e.target.checked)}
          />
        </div>
      </div>

      <div style={{ maxWidth: "320px" }}>
        {mount && (
          <VodPlayer
            poster={poster}
            manifest={manifest}
            controls={controls}
            muted={muted}
            autoPlay={autoPlay}
          />
        )}
      </div>
    </>
  );
}

export default App;
