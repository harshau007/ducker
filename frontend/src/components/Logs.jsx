import React, { useState, useEffect } from "react";
import axios from 'axios'
const Logs = ({ id }) => {
  const [stats, setStats] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`http://20.244.106.17:3000/docker/stats/${id}`)
    setStats(res.data)
  }
  useEffect(() => {
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <>
    <div>
      <h1>Docker Stats</h1>
      {stats && (
        <pre>
          {JSON.stringify(stats, null, 2)}
        </pre>
      )}
    </div>
    {/* <div>
      {stats}
    </div> */}
    </>
  );
};

export default Logs;
