import React from 'react';
import axios from 'axios';

export const GrammarCheck = async (conversation) => { // passing in the entire conversation between the player and the NPC.
    console.log("grammar check");
    const formattedMessages = [
        {
            role: "system",
            content: `You are grading the user's accuracy in a conversation. Every word counts as a point so if the user mispelled 1 out of their 5 total words, then their accuracy would be 20% because 1/5 =0.2 : Below is an example of the messages you will receive. Simply respond with a response percentage, e.g. "70%" followed by a delimiter ":::" and the reasons for their score. Your response should be formatted like below. Be sure to make your response as if you were talking to the user directly like "You mispelled __" 
            "  80%  :::  [insert the reasons for their score] " `
        },
        ...conversation.map((msg) => ({
            role: msg.user === 'Player' ? 'user' : 'system',
            content: msg.text,
        }))
    ];
    try {
        const response = await axios.post('https://pratiquebackend-production.up.railway.app/api/openai', { messages: formattedMessages });
        const botMessage = response.data;
        return botMessage; 
    } catch (error) {
        console.error('Error fetching response from OpenAI API', error);
        return; 
    }
};
