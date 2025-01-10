'use client';
import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "../MessageParser/page";
import ActionProvider from "../ActionProvider/page";
import ChatbotConfig from "../ChatbotConfig/page";

const HRMSChatbot = () => {
  return (
    <div style={{ maxWidth: "350px" }}>
      <Chatbot config={ChatbotConfig} messageParser={MessageParser} actionProvider={ActionProvider} />
    </div>
  );
};

export default HRMSChatbot;
