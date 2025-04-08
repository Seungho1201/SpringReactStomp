package com.example.reactbootstomp.ChatList;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@Setter
public class ChatList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String room_id;
    private String name;
    private String content;

    @CreationTimestamp
    private String chat_date;

}
