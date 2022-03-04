import { useState, useRef } from "react";

export const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const socket = useRef();

  const handleSetInput = ({ target }) => setValue(target.value);
  const handleSetUserName = ({ target }) => setUsername(target.value);

  const sendMessage = async () => {
    const message = {
      message: value,
      username,
      id: Date.now(),
      event: "message",
    };

    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setIsConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };

      socket.current.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => {
      console.log("WebSocket close");
    };

    socket.current.onerror = () => {
      console.log("Error connection...");
    };
  };

  if (!isConnected) {
    return (
      <div className="center">
        <div className="form">
          <input
            type="text"
            placeholder="Введите ваше имя"
            value={username}
            onChange={handleSetUserName}
          />
          <button onClick={connect}>Войти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input value={value} onChange={handleSetInput} type="text" />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages?.map(({ id, message, username, event }) => (
            <div key={id}>
              {event === "connection" ? (
                <div className="connection_message">
                  Пользователь {username} вошел!
                </div>
              ) : (
                <div className="message">
                  {username}: {message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
