import React, { useState, useEffect } from "react";

const Logs = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws/7dd36b74f9dc/stats");

    ws.onmessage = (event) => {
      const receivedStats = JSON.parse(event.data);
      console.log(receivedStats);
      setStats(receivedStats);
    };

    ws.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    };

    // Clean up WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Docker Stats</h1>
      {stats && (
        <pre>
          {JSON.stringify(stats, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Logs;
