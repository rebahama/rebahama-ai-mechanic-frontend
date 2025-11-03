import React, { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefault';

const ShowAll = () => {
  const [result, setResult] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get('/result/');
        setResult(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    handleMount();
  }, []);

  return (
    <div>
      <h2>Show All Results</h2>
      {result.results.length > 0 ? (
        <ul>
          {result.results.map((item) => (
            <li key={item.id}>{item.title || JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ShowAll;