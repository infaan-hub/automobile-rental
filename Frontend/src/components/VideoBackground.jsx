import React from "react";

const videos = {
  hero: "https://assets.mixkit.co/videos/24481/24481-720.mp4",
  auth: "https://assets.mixkit.co/videos/41576/41576-720.mp4",
  dashboard: "https://assets.mixkit.co/videos/4633/4633-720.mp4",
  rent: "https://assets.mixkit.co/videos/24481/24481-720.mp4",
  view: "https://assets.mixkit.co/videos/41576/41576-720.mp4",
};

export default function VideoBackground({ name = "hero", fill }) {
  const src = videos[name] || videos.hero;
  return (
    <div className={`video-background${fill ? " video-fill" : ""}`}>
      <video autoPlay loop muted playsInline aria-hidden="true">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
