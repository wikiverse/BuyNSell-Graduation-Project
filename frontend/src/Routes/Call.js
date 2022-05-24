import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Peer from 'peerjs';
import { SocketContext } from './Context';
import Button from '../Components/Button';

const Call = () => {
  const { socket } = useContext(SocketContext);
  const myVideo = useRef();
  const peerVideo = useRef();
  const [searchParams, setSeachParams] = useSearchParams();
  const calleeusername = searchParams.get('calleeusername');
  const peerId = searchParams.get('peerId');
  const peerRef = useRef(null);
  const [isAccepted, setIsAccepted] = useState(false);
  useEffect(() => {
    const peer = new Peer();
    peer.on('open', (id) => {
      console.log(id);
      if (calleeusername) {
        console.log(calleeusername);
        socket.emit('call', {
          callee: calleeusername,
          peerId: id,
          caller: localStorage.getItem('username'),
        });
      }
    });
    peer.on('call', (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        console.log('call received', call);
        myVideo.current.srcObject = mediaStream;
        call.answer(mediaStream);
        call.on('stream', (remoteStream) => {
          peerVideo.current.srcObject = remoteStream;
        });
      });
    });
    peerRef.current = peer;
  }, []);
  const answer = () => {
    console.log(peerId);
    setIsAccepted(true);
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      myVideo.current.srcObject = mediaStream;
      const call = peerRef.current.call(peerId, mediaStream);
      console.log('call', call);
      call.on('stream', (remoteStream) => {
        peerVideo.current.srcObject = remoteStream;
      });
    });
  };

  return (
    <div>
      {peerId && !isAccepted && (
        <div>
          <Button onClick={answer}>Answer</Button>
        </div>
      )}
      <div
        style={{ borderRadius: '30px', overflow: 'hidden', margin: '10px 0' }}
      >
        <video
          style={{ width: '100%' }}
          ref={myVideo}
          playsInline
          autoPlay
        ></video>
      </div>
      <div style={{ borderRadius: '30px', overflow: 'hidden' }}>
        <video
          style={{ width: '100%' }}
          ref={peerVideo}
          playsInline
          autoPlay
        ></video>
      </div>
    </div>
  );
};

export default Call;
