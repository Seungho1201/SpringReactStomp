// ChatRoomList.jsx
import { useEffect, useState } from 'react';
import './chat-list.css';
import axios from 'axios';

// 채팅방 목록을 불러오는 컴포넌트트
function ChatRoomList({ onSelectRoom }) {
  const [rooms, setRooms] = useState([]);

  // 처음 url에 입장할때 목록 가져오기 실행
  useEffect(() => {
    axios.get('http://localhost:8080/api/chat/rooms')
      .then((res) => {
        setRooms(res.data);   // rooms에 채팅방
      })
      .catch((err) => console.error('방 목록 가져오기 실패', err));
  }, []);

  // 현재 채팅방 업데이트
  function update(){
    axios.get('http://localhost:8080/api/chat/rooms')
      .then((res) => {
        setRooms(res.data);   // rooms에 채팅방
      })
      .catch((err) => console.error('방 목록 가져오기 실패', err));
  }

  return (
    <div className="chat-list-container">
      <h2 className="chat-list-header">채팅방 목록</h2>
  
      <h3 className="chat-list-refresh" onClick={update}>🔄</h3>
  
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => onSelectRoom(room)}
          className="chat-room-item"
        >
          <div className="chat-room-name">{room.name}</div>
          <div className="chat-room-id">ID: {room.id}</div>
        </div>
      ))}
    </div>
  );

}

export default ChatRoomList;
