import React, {useEffect, useState} from 'react';
import '../../css/Chat.css';
import {user} from '../Join/Join';
import socketIO from 'socket.io-client';
import sendLogo from '../../images/send.png';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../../images/closeIcon.png';

let socket;

const ENDPOINT = 'http://localhost:4500/';

const Chat = () => {
  const [id, setId] = useState ('');
  const [messages, setMessages] = useState ([]);

  const send = () => {
    const message = document.getElementById ('chatInput').value;
    if (message !== '') {
      socket.emit ('message', {message, id});
    }
    document.getElementById ('chatInput').value = '';
  };

  useEffect (() => {
    socket = socketIO (ENDPOINT, {transports: ['websocket']});

    socket.on ('connect', () => {
      setId (socket.id);
    });
    socket.emit ('joined', {user});

    socket.on ('welcome', data => {
      setMessages ([...messages, data]);
    //   console.log (data.user, data.message);
    });

    socket.on ('userJoined', data => {
      setMessages ([...messages, data]);
    //   console.log (data.user, data.message);
    });

    socket.on ('leave', data => {
      setMessages ([...messages, data]);
    //   console.log (data.user, data.message);
    });

    return () => {
      socket.emit ('dis');
      socket.off ();
    };
  }, []);

  useEffect (
    
    () => {
      socket.on ('sendMessage', data => {
        setMessages ([...messages, data]);
      });
      return () => {
        socket.off ();
      };
    },
    [messages]
  );

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>BAAT - CHAT</h2>
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map ((item, i) => (
            <Message
              user={item.id === id ? '' : item.user}
              message={item.message}
              classs={item.id === id ? 'right' : 'left'}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyDown={(event) => (event.key === "Enter" ? send() : null)} type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
