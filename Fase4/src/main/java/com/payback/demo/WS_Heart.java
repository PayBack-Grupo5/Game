package com.payback.demo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.lang.NonNull;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class WS_Heart  extends TextWebSocketHandler {
public Map<String, WebSocketSession> users = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
        if (users.size() < 2) {
            users.put(session.getId(), session);
        }
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @SuppressWarnings("null") CloseStatus closeStatus) throws Exception {
        users.remove(session.getId());
    }

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, @SuppressWarnings("null") TextMessage message) throws Exception {
        for (WebSocketSession user : users.values()) {
            if (!user.getId().equals(session.getId())) {
                sendMessage(user, message);
            }
        }
    }

    private void sendMessage(WebSocketSession session, TextMessage message) {
        if (session.isOpen()) {
            try {
                session.sendMessage(message);
            } catch (Exception e) {
                e.printStackTrace(); // Log and handle the exception properly in a real application
            }
        }
    }
}
