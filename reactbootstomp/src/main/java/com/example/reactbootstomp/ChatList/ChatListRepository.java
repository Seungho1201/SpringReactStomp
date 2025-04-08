package com.example.reactbootstomp.ChatList;

import com.example.reactbootstomp.stomp.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatListRepository extends JpaRepository<ChatList, Long> {

    @Query(value="select * from chat_list where room_id = ?1", nativeQuery = true)
    List<ChatList> findByRoomId(String room_id);
}
