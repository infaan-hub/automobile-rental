import React from "react";

export default function Notice({ error, message }) {
  return (
    <>
      {error && <div className="panel-alert error">{error}</div>}
      {message && <div className="panel-alert success">{message}</div>}
    </>
  );
}
