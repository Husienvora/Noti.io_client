# Noti.io_Client

📝 [to Documentation Website](https://noti-io-website.vercel.app/)

Noti.io is an easy-to-use npm package that allows you to set up real-time notifications from your server to clients in web applications. It simplifies the process of sending and receiving notifications, making it seamless to keep your users informed about important events and updates.

## Server Installation

```bash
npm install @husien/noti.io
```

Install the server package to send notifications to your clients.

## Client <br>

To set up notifications on your webpage using the @husien/noti.io-client package, follow these steps:

Step 1: Install the Client Package

```bash
npm i @husien/noti.io_client
```

Install the client package to receive notifications on your webpage.

Step 2: Configure Noti_client

```
import { Noti_client } from "@husien/noti.io_client";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    new Noti_client(
      "http://localhost:5000/", // Replace with your server URL
      document.querySelector(".App") // DOM selector to inject the notification UI
    );
  }, []);

  return (
    <div className="App">
      {/* The notification UI will be injected here */}
    </div>
  );
}

export default App;
```

In this code, the "http://localhost:5000/" is the server URL where the notifications will be sent from. Replace it with your actual server URL. The second parameter document.querySelector(".App") selects the DOM element (parent component) where the notification UI will be injected. Ensure that it is a valid parent component for the notifications. The third parameter contains custom styles for the notification UI.

Once you set up the client-side code, you should receive notifications on your webpage when the server sends them.

## Server

To create a server that sends notifications to connected clients, you can use the following code with the @husien/noti.io package:

```
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Noti } from "@husien/noti.io";

dotenv.config();
const app = express();

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("hello");
});

const server = http.createServer(app);
const Notific = new Noti(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
    credentials: true,
  },
  allowEIO3: true,
});

Notific.Send({
  Msg: "Please wait for a while",
  backgroundColor: "#fff",
  textColor: "#000",
  Symbol: "⌛",
});

const start = async () => {
  try {
    server.listen(port, () => {
      console.log("Server is listening on port ${port}...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

```

## Caution

In React 18 and above, React.StrictMode makes the initial render happen twice causing notifications to be initialized twice. To avoid this, consider removing React.StrictMode in your index.js or App.js file during development.
