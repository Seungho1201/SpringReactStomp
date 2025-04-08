package com.example.reactbootstomp.stomp;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chat_room")
@Getter
@Setter
public class ChatRoom {
    @Id
    private String id;
    private String name;
    protected ChatRoom() {
    }

    public ChatRoom(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
