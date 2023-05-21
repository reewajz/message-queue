import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './List.css';

const endpoint = 'http://localhost:3000';

const List = () => {
  const [filteredData, setFilteredData] = useState<Array<{ [key: string]: any }>>([]);

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on('filteredData', (data) => {
      console.log(`Received: ${JSON.stringify(data)}`);
      setFilteredData((prevData) => [...prevData, data]);
    });
  }, []);

  return (
    <div className="app">
      <h1 className="title">Messages</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{data.timestamp}</td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
