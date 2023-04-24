import { useState, useEffect } from 'react';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/getData/`);
      const data = await res.json();
      setSessions(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Sessions</h1>
      <ul>
        {sessions.map((session, id) => (
          <li>
            <h2> index: {id} </h2>
            <ul>
                {session.jobs.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
