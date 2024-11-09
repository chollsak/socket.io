import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client'; // Correct import for Socket.IO client


function App() {
  const runEvent = () => {
    const socket = io("http://localhost:3005", { transports: ['websocket'] });
    console.log('ran 1st')
    socket.emit("new_user_login", {message: "user has logged in"})
  };

  const runLocalEvent = () => {
    toast.info("This is a local event", {
      position: "top-center",
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:3005", { transports: ['websocket'] }); // Corrected 'transports'

    socket.on("connect", () => {
      console.log("Connected to Socket.IO");
    });

    socket.on("new_user_login", (data) => {
      toast.info(data.message, {
        position: "top-center",
      });
    });

  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <button onClick={() => runEvent()}>Click for real time events</button>
      <button onClick={() => runLocalEvent()}>Click for local events</button>
    </div>
  );
}

export default App;
