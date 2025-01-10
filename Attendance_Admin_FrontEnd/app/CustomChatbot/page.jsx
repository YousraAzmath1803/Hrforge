'use client';
import React, { useState } from "react";

const CustomChatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // For toggling chatbot window
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I assist you today?", sender: "bot" },
  ]); // Initial bot message
  const [userMessage, setUserMessage] = useState(""); // Captures user input

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // const handleSendMessage = () => {
  //   if (userMessage.trim() === "") return;

  //   // Add user's message to chat
  //   const newMessages = [
  //     ...messages,
  //     { id: messages.length + 1, text: userMessage, sender: "user" },
  //   ];
  //   setMessages(newMessages);

  //   // Clear input field
  //   setUserMessage("");

  //   // Add bot response after user message
  //   setTimeout(() => {
  //     const botReply = generateBotResponse(userMessage); // Generate bot response
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { id: prevMessages.length + 1, text: botReply, sender: "bot" },
  //     ]);
  //   }, 1000); // Simulate a delay for bot response
  // };

  // const generateBotResponse = (message) => {
  //   // Basic bot logic: check for keywords
  //   if (message.toLowerCase().includes("leave")) {
  //     return "You can request leave via the HRMS leave section.";
  //   } else if (message.toLowerCase().includes("attendance")) {
  //     return "Your attendance records can be found under the Attendance section.";
  //   } else {
  //     return "I'm not sure how to help with that. Can you clarify?";
  //   }
  // };

  const handleSendMessage = async () => {
    if (userMessage.trim() === "") return;
   
    // Add user's message to chat
    const newMessages = [
      ...messages,
      { id: messages.length + 1, text: userMessage, sender: "user" },
    ];
    setMessages(newMessages);
  
    // Clear input field
    setUserMessage("");
  
    try {
      const response = await fetch("http://localhost:8080/api/chatbot/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userMessage),
      });
  
      if (response.ok) {
        const botReply = await response.text(); // Assuming the response is plain text
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: botReply, sender: "bot" },
        ]);
      } else {
        // If the message doesn't match hardcoded responses, send an email
        await fetch("http://localhost:8080/api/chatbot/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userMessage),
        });
  
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: "We couldn't find an answer. The support team has been notified.",
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: "An error occurred. Please try again.", sender: "bot" },
      ]);
    }
  };
  

  return (
    <div>
      {/* Chatbot button */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            fontSize: "20px",
          }}
        >
          💬
        </button>
      )}

      {/* Chatbot window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "500px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {/* Close Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <span>Chat with HRMSBot</span>
            <button
              onClick={toggleChatbot}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          {/* Chat Area */}
          <div
            style={{
              padding: "10px",
              height: "400px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#ADD8E6" : "#D3D3D3",
                  color: "#000",
                  borderRadius: "10px",
                  padding: "8px",
                  marginBottom: "10px",
                  maxWidth: "60%",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1px",
              borderTop: "1px solid #ddd",
            }}
          >
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Write your message here"
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                marginRight: "2px",
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "13px 15px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomChatbot;
