import { FC, useContext, useState } from "react";
import axios from 'axios';
import TypingAnimation from "./TypingAnimation";
import { propertyExtractor } from "../utils/propertyExtractor";
import { PathAction, isValidFunctionPath, validatePathResolver } from "../pages/api/route";
import { MyContext } from "../pages";

interface ChatBoxComponentProps {
  setStoreUrl: React.Dispatch<React.SetStateAction<string>>;
}

interface ChatMessage {
  type: string;
  message: string;
}

interface ChatProperties {
  model: string;
  messages: { role: string; content: string }[];
  pathFunction?: string;
}

const ChatLog: FC<{ chatLog: ChatMessage[] }> = ({ chatLog }) => (
  <div className="flex-grow p-6">
    <div className="flex flex-col space-y-4">
      {chatLog.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
            }`}
        >
          <div
            className={`${message.type === "user" ? "bg-gray-200" : "bg-gray-300"
              } rounded-lg p-4 text-black max-w-sm`}
            style={{ wordWrap: "break-word" }}
          >
            {message.message}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChatInput: FC<{
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ inputValue, setInputValue, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="flex-none p-6">
    <div className="flex rounded-lg border border-gray-300 bg-gray-100">
      <input
        type="text"
        className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-blue-600 transition-colors duration-300"
      >
        Send
      </button>
    </div>
  </form>
);

const ChatBoxComponent: FC<ChatBoxComponentProps> = ({ setStoreUrl }) => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const { setDynamicAction } = useContext(MyContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    await sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = async (message: string) => {
    setIsLoading(true); //start loading

    let data: ChatProperties = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };

    let pathFunction: string = PathAction.DEFAULT_CHAT;
    try {
      const properties = await propertyExtractor(message);
      if (
        properties !== undefined &&
        isValidFunctionPath(properties.pathFunction)
      ) {
        pathFunction = validatePathResolver(properties.pathFunction);
        console.log("path function:", pathFunction);
        data = properties;
      } else {
        pathFunction = PathAction.DEFAULT_CHAT;
      }
    } catch (error) {
      console.log(error);
    }

    try {

      if (pathFunction === PathAction.DEFAULT_CHAT) {
        const response = await axios.post(pathFunction, data);
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          {
            type: "bot",
            message: response.data.choices[0].message.content,
          },
        ]);
        setDynamicAction({}); //set dynamic action to empty
      }
      else if (pathFunction === PathAction.UPLOAD_FILE) {
        // const response = await axios.post(pathFunction, data);
        // console.log(response);
        // setChatLog((prevChatLog) => [
        //   ...prevChatLog,
        //   {
        //     type: "bot",
        //     message: response.data.choices[0].message.content,
        //   },
        // ]);

        const object: any = {
          "layout": "lighthouseUploadLayout",
          "section1": [
            {
              "name": "lighthouseUploadTypeName",
              "type": "lighthouseUploadType"
            }
          ]
        };
        setDynamicAction(object);
      } 
      else {
        const response = await axios.post(pathFunction, data);
        console.log(response);
        setStoreUrl(response.data.url);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.message },
        ]);
        setDynamicAction({}); //set dynamic action to empty
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="flex flex-col fit-screen">
        <h1
          className="text-center py-3 font-bold text-6xl"
          style={{
            backgroundImage: "linear-gradient(to right, #e0dede, #d3d3d3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "cover",
          }}
        >
          FileCoinGPT
        </h1>
        <ChatLog chatLog={chatLog} />
        {isLoading && (
          <div key={chatLog.length} className="flex justify-start p-6">
            <div className="bg-gray-300 rounded-lg p-2 text-black max-w-sm">
              <TypingAnimation />
            </div>
          </div>
        )}
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatBoxComponent;