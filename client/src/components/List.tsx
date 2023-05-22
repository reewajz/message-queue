import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './List.css';
import { timeConverter } from '../../TimeStampConverter';

const endpoint = 'http://localhost:4000';

const List = () => {
  const [filteredData, setFilteredData] = useState<Array<{ [key: string]: any }>>([]);

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on('filteredData', (data: { [key: string]: any }) => {
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
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{timeConverter(data.timestamp)}</td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
