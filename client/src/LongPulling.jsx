import { useState, useEffect } from "react";
import axios from "axios";

export const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const handleSetInput = ({ target }) => setValue(target.value);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 1000);
    }
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-message", {
      message: value,
      id: Date.now(),
    });
  };

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <div className="center">
      <div>
        <div className="form">
          <input value={value} onChange={handleSetInput} type="text" />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages?.map(({ id, message }) => (
            <div className="message" key={id}>
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
