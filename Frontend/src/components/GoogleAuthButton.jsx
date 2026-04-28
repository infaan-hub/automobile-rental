import React, { useEffect, useRef } from "react";
import { GOOGLE_CLIENT_ID } from "../lib/config";

function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }

    const existing = document.querySelector('script[data-google-identity="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google), { once: true });
      existing.addEventListener("error", () => reject(new Error("Google sign-in could not load.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Google sign-in could not load."));
    document.head.appendChild(script);
  });
}

export default function GoogleAuthButton({ onCredential, onError }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !mountRef.current) return undefined;

    let active = true;
    loadGoogleScript()
      .then((google) => {
        if (!active || !google?.accounts?.id || !mountRef.current) return;
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: ({ credential }) => {
            if (!credential) {
              onError?.("Google sign-in was cancelled.");
              return;
            }
            onCredential?.(credential);
          },
        });
        mountRef.current.innerHTML = "";
        google.accounts.id.renderButton(mountRef.current, {
          type: "standard",
          theme: "outline",
          shape: "pill",
          text: "continue_with",
          width: 320,
        });
      })
      .catch((error) => onError?.(error.message));

    return () => {
      active = false;
    };
  }, [onCredential, onError]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button className="google-placeholder-button" type="button" disabled>
        Google sign-in needs a client ID
      </button>
    );
  }

  return <div className="google-auth-mount" ref={mountRef} />;
}
