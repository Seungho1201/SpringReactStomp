// ChatRoomCreate.jsx
import { useState } from 'react';
import axios from 'axios';

import './ChatRoomCreate.css';

// 방 생성이 성공하였을때 onRoomCreated 를 호출
function ChatRoomCreate() {
  const [name, setName] = useState('');

  const createRoom = () => {
    axios.post('http://localhost:8080/api/chat/rooms', null, {
      params: { name }, // 채팅방 이름 전송
    })
      .then((res) => {
        setName('');     
      })
      .catch((err) => console.error(' 방 생성 실패', err));
  };

  return (
    <div>
      <input type="text" value={name} placeholder="채팅방 이름"
        onChange={(e) => setName(e.target.value)}
        className="create-room-input"
      />
      <button onClick={createRoom}>방 만들기</button>
    </div>
  );
}

export default ChatRoomCreate;
