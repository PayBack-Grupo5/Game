package com.payback.demo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.lang.NonNull;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WS_Position extends TextWebSocketHandler {

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
                String msg = message.getPayload();
                user.sendMessage(new TextMessage(msg));
            }
        }
    }
}
