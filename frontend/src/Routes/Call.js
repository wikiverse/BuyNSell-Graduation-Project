import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'simple-peer';
import { SocketContext } from './Context';

const Call = () => {
  const [streamData, setStreamData] = useState();
  const video = useRef();
  const calleeVideo = useRef();
  const params = useParams();
  const calleeUsername = params.username;
  const username = localStorage.getItem('username');
  const fullname = localStorage.getItem('fullname');
  const { socket, callee } = useContext(SocketContext);
  console.log(callee);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStreamData(stream);
        video.current.srcObject = stream;
      });
    if (calleeUsername !== username) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: streamData,
      });
      peer.on('signal', (data) => {
        socket.emit('call', {
          callee: calleeUsername,
          signalData: data,
          caller: username,
          name: fullname,
        });
      });
      peer.on('stream', (streamData) => {
        calleeVideo.current.srcObject = streamData;
      });
      socket.on('accept', (signal) => {
        peer.signal(signal);
      });
    } else {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: streamData,
      });
      peer.on('signal', (data) => {
        socket.emit('answer', { signal: data, caller: callee.caller });
      });
      peer.on('stream', (stream) => {
        calleeVideo.current.srcObject = stream;
      });

      peer.signal(callee.signal);
    }
  }, []);

  return (
    <div>
      <div
        style={{ borderRadius: '30px', overflow: 'hidden', margin: '10px 0' }}
      >
        <video
          style={{ width: '100%' }}
          ref={video}
          playsInline
          muted
          autoPlay
        ></video>
      </div>
      <div style={{ borderRadius: '30px', overflow: 'hidden' }}>
        <video
          style={{ width: '100%' }}
          ref={calleeVideo}
          playsInline
          autoPlay
        ></video>
      </div>
    </div>
  );
};

export default Call;
