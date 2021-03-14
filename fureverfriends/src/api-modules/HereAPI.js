// src/DisplayMapFC.js

import * as React from 'react';

export const DisplayMapFC = () => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "cEmKn4p2fsUDNYX6qesi52C3blJ03LztzekKRTIB9EE"
    });
  });
};