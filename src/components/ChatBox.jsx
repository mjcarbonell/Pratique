import React, { useState } from 'react';
import { useGameStore } from "../store";
import { DeepChat } from 'deep-chat-react';

const ChatBox = () => {


  return (
    <DeepChat webModel="true"/>
  );
};

export default ChatBox;
