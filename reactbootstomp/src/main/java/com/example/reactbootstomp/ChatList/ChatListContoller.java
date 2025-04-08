package com.example.reactbootstomp.ChatList;

import com.example.reactbootstomp.stomp.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ChatListContoller {

    private final ChatListRepository chatListRepository;

    @PostMapping("/api/upload/chat")
    public ResponseEntity<ChatList> upload(@RequestParam String roomId,
                                           @RequestParam String name,
                                           @RequestParam String content) {

        ChatList chatList = new ChatList();

        chatList.setRoom_id(roomId);
        chatList.setName(name);
        chatList.setContent(content);

        chatListRepository.save(chatList);

        return ResponseEntity.ok(chatList);
    }

    @GetMapping("/api/load/chat")
    public List<ChatList> chatHistory(@RequestParam String roomId) {

        List<ChatList> chatList = chatListRepository.findByRoomId(roomId);

        System.out.println(chatList);



        return chatList;
    }
}
