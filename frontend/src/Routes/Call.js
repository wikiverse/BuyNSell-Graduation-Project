import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Peer from 'peerjs';
import { SocketContext } from './Context';
import Button from '../Components/Button';
import classes from './Call.module.css';

const Call = () => {
  const { socket } = useContext(SocketContext);
  const myVideo = useRef();
  const peerVideo = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const calleeusername = searchParams.get('calleeusername');
  const peerId = searchParams.get('peerId');
  const peerRef = useRef(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [myId, setMyId] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const peer = new Peer();
    peer.on('open', (id) => {
      console.log(id);
      setMyId(id);
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
    <div className={classes.container}>
      <div style={{ width: '100%', position: 'relative' }}>
        <div
          style={{
            borderRadius: '10px',
            overflow: 'hidden',
            margin: '10px 0',
            position: 'absolute',
            bottom: '10px',
            right: '20px',
          }}
        >
          <video
            style={{ width: '20vw', maxWidth: '300px' }}
            ref={myVideo}
            playsInline
            autoPlay
            muted
          ></video>
        </div>
        <div
          style={{
            borderRadius: '30px',
            overflow: 'hidden',
            maxWidth: '800px',
          }}
        >
          <video
            style={{ width: '100%', maxHeight: '800px' }}
            ref={peerVideo}
            playsInline
            autoPlay
          ></video>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        {peerId && !isAccepted && myId && (
          <Button
            style={{ width: '200px', marginRight: '20px' }}
            onClick={answer}
          >
            Answer
          </Button>
        )}
        <Button
          onClick={() => {
            navigate('/');
          }}
          style={{ width: '200px', backgroundColor: 'red' }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Call;
