# 💬 Elomaze Backend — Chat System

## 📌 Overview

The Elomaze Chat System enables communication between users and service providers (agents, sellers, and service providers) within the context of a specific service or listing.

Unlike a traditional messaging app, every conversation is tied to a **service**, making it a marketplace-driven chat system rather than a generic chat application.

---

## 🧱 Core Architecture

The chat system is built around three main components:

### 1. Conversation (Chat Room)

Represents a chat session between users about a specific service.

#### Fields:
- `participants` → Users involved in the conversation
- `service` → The listing/service being discussed (context)
- `lastMessage` → Reference to the most recent message
- `lastMessageText` → Preview text for chat list UI
- `unreadCount` → Tracks unread messages per user
- `timestamps` → createdAt / updatedAt

#### Purpose:
- Groups related messages
- Maintains chat context
- Powers chat list UI

---

### 2. Message

Represents individual messages sent inside a conversation.

#### Fields:
- `conversation` → Parent conversation ID
- `sender` → User who sent the message
- `text` → Message content
- `image` → Optional media attachment
- `isRead` → Read status
- `timestamps` → createdAt / updatedAt

#### Purpose:
- Stores actual chat data
- Maintains message history
- Supports future media messaging

---

### 3. Service (Context Layer)

Each conversation is linked to a service (e.g. apartment, cleaning job, rental listing).

#### Purpose:
- Defines what the conversation is about
- Prevents chat duplication/confusion
- Enables marketplace analytics and insights

---

## 🔄 Chat Flow

### 1. Start Conversation
When a user clicks “Message Agent”:

- System checks if a conversation already exists with:
  - Same participants
  - Same service

If found → return existing conversation  
If not → create a new one

---

### 2. Send Message

When a message is sent:

- Message is saved in `Message` collection
- Conversation is updated:
  - `lastMessage`
  - `lastMessageText`
  - `updatedAt`
- `unreadCount` is updated for the recipient

---

### 3. Fetch Conversations

When loading chat list:

- Fetch all conversations for the user
- Sort by `updatedAt`
- Display:
  - participant info
  - last message preview
  - unread count
  - service context (optional)

---

### 4. Open Chat

When a conversation is opened:

- Fetch all messages using `conversationId`
- Mark messages as read
- Reset unread count for that user

---

### 5. End Conversation (Future Feature)

When a chat is marked inactive:

- Conversation status is updated
- Rating prompt is triggered

---

## ⭐ Review System Integration

After a conversation ends:

1. User is prompted to rate the experience
2. Review is created and linked to:
   - `conversationId`
   - `reviewedUser`
   - `service`
3. Used for:
   - Trust scoring
   - Agent reputation
   - Service quality tracking

---

## 🧠 Key Design Decisions

### 1. Service-linked conversations
Every chat is tied to a service to maintain context and enable marketplace intelligence.

### 2. Cached last message
Stored in conversation to improve performance and reduce database queries.

### 3. Unread message tracking
Used to display notification badges and improve UX responsiveness.

---

## 📊 System Flow

Service  
→ Conversation  
→ Messages  
→ Review (Rating)

---

## 🚀 Future Improvements

- Socket.io real-time messaging
- Typing indicators
- Online/offline status
- Message delivery receipts
- Push notifications
- Advanced trust scoring system