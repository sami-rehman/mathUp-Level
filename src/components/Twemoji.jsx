import { useState } from "react";
import { twemojiUrl } from "../utils";

export function Twemoji({ emoji, size = 72, className = "", style = {} }) {
  const [failed, setFailed] = useState(false);
  const url = twemojiUrl(emoji);

  if (!emoji || failed || !url) {
    return (
      <span className={className} style={style}>
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={url}
      alt=""
      width={size}
      height={size}
      className={className}
      draggable={false}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        objectFit: "contain",
        ...style,
      }}
      onError={() => setFailed(true)}
    />
  );
}
