import { useState } from "react";
import axios from 'axios';
import TypingAnimation from "./TypingAnimation";
import { propertyExtractor } from "../utils/propertyExtractor";
import { PathAction } from "../pages/api/route";

export default function ChatBoxComponent() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);

    setInputValue('');
  }

  const sendMessage = async (message: string) => {

    setIsLoading(true); //start loading

    let data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };

    let properties;
    let pathFunction: string = PathAction.DEFAULT_CHAT;
    try {
      properties = await propertyExtractor(message);
    } catch (error) {
      console.log(error);
    }

    if (properties !== undefined) {
      pathFunction = properties.pathFunction;
      console.log("path function:", pathFunction);
      data = properties;
    }
    else {
      pathFunction = PathAction.DEFAULT_CHAT;
    }



    // console.log("path function:", pathFunction);

    axios.post(pathFunction, data).then((response) => {
      console.log(response);
      if (pathFunction === PathAction.DEFAULT_CHAT) {
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }]);
      } else {
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.message }]);
      }
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen bg-white">
        <h1 className="text-center py-3 font-bold text-6xl" style={{ backgroundImage: "linear-gradient(to right, #8b314b, #d3d3d3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "cover" }}>FileCoinGPT</h1>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
            {
              chatLog.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                  <div className={`${message.type === 'user' ? 'bg-gray-200' : 'bg-gray-300'
                    } rounded-lg p-4 text-black max-w-sm`} style={{ wordWrap: 'break-word' }}>
                    {message.message}
                  </div>
                </div>
              ))
            }
            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-300 rounded-lg p-4 text-black max-w-sm">
                  <TypingAnimation />
                </div>
              </div>
            }
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-300 bg-gray-100">
            <input type="text" className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-blue-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-blue-600 transition-colors duration-300">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}