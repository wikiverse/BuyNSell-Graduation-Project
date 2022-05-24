import { io } from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';

const socket = io('http://localhost:4001', {});

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [callee, setCallee] = useState({});
  const [isReceiving, setIsReceiving] = useState(false);
  useEffect(() => {
    socket.on('onconnection', (id) => {
      const username = localStorage.getItem('username');
      socket.emit('saveID', { id, username });
    });
    socket.on('call', (obj) => {
      setCallee({
        caller: obj.caller,
        peerId: obj.peerId,
      });
      console.log(obj);
      setIsReceiving(true);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        callee,
        setCallee,
        isReceiving,
        setIsReceiving,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
