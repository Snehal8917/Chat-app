import socketIO from "socket.io-client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/chat.jsx";

import "./App.css";

// const ENDPOINT = `http://localhost:4500`;
// const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

function App() {
  // socket.on("connect", () => {
  //   console.log("New connection ");
  // });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;