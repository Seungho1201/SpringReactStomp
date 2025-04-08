// ChatRoom.jsx
import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import './ChatRoom.css';
import axios from 'axios';


// 이 컴포넌트에선 채팅방 구독과 메세지 전송을 담당한다다
function ChatRoom({ room }) {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  {/* useEffect(() =>{}, [room.id]) room.id가 변동될때마다 실행 */}
  useEffect(() => {

    // https://www.npmjs.com/package/@stomp/stompjs 문서 참조
    const stomp = new Client({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket', // ws://로 시작하는 WebSocket URL
      reconnectDelay: 5000,

      onConnect: () => {
        console.log('STOMP 연결 성공');

        // 해당 방 Id로 구독
        stomp.subscribe(`/topic/chat/${room.id}`, msg => {
          // 구독한 Id에서 오는 문자를 map에 전부 담아버림
          setMessages(prev => [...prev, JSON.parse(msg.body)]);
        });
      },
    });

    stomp.activate();   // stomp 활성화
    setClient(stomp);   // setClinet

    // useEffect cleanUp
    return () => {
      stomp.deactivate();
    };
  }, [room.id]);


  {/* 메세지 전송 */}
  function sendMessage() {

    // 구독과 input이 null이 아닐떄 실행
    if (client && input.trim()) {

      // publish({경로, 보낼거})
      client.publish({
        destination: `/app/chat/${room.id}`,                    // 메세지 전송 경로 room.id
        body: JSON.stringify({ name: '유저', message: input }), // Body안의 요소들을 JSON 형식으로 전송송
      });
      setInput('');  
    }
  };


  {/* 전송된 메세지 DB 저장*/}
  function saveChat(){
    if (client && input.trim()) {
      axios.post('/api/upload/chat', null, {
        params:{
          roomId: room.id,
          name: '임시 데이터',
          content: input,
        }
      })
      .then((res) =>{
        console.log("저장 성공", res);
      })
      .catch((err) => console.error('채팅 저장 실패', err));
    }
  }


  {/* 입장 시 DB에 있는 데이터 가져오기 */}
  useEffect(()=>{
    if(client){
      axios.get('/api/load/chat', {
        params: {
          roomId: room.id
        }
      })
      .then((res) => {
        console.log(res);
        //setMessages(prev => [...prev, JSON.parse(res.data)]);
      })
      .catch((err) => console.error('이전 채팅 가져오기 실패', err));
    }
  },[client])
  

  
  return (
    <div className="chat-container">
      <h2 className="chat-header">{room.name}</h2>

      <div className="chat-messages">
        {
          messages.map((msg, i) => (
            <div key={i} className="chat-message">
              <strong>{msg.name}</strong>: {msg.message}
            </div>
          ))
        }
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={()=>{sendMessage(); saveChat(); }}>보내기</button>
      </div>
    </div>
  );
}

export default ChatRoom;
