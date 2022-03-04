import { LongPulling } from "./LongPulling";
import { EventSourcing } from "./EventSourcing";
import { WebSock } from "./WebSocket";

function App() {
  return (
    <div className="App">
      {/*<LongPulling />*/}
      {/*<EventSourcing />*/}
      <WebSock />
    </div>
  );
}

export default App;
