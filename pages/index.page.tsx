import React, { useState } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { Counter } from "./_components/Counter";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SOCKET_PORT } from "../consts";

const filename = "hello-1.page.mdx";

export default IndexPage;

function IndexPage() {
  const [value, setValue] = useState("");
  const hostname = typeof window !== "undefined" && window.location.hostname;

  const [socketUrl, setSocketUrl] = useState(`ws://${hostname}:${SOCKET_PORT}`);
  console.log("socketUrl", socketUrl);

  // console.log("hostname", hostname);
  // const messageHistory = useRef([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log("lastMessage", lastMessage);

  return (
    <>
      <h1>
        Welcome to <code>vite-plugin-ssr</code>
      </h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <p>
        We use <code>useClientRouter()</code> to do Client-side Routing.{" "}
        <button
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * 3);
            navigate(["/markdown", "/star-wars", "/hello/alice"][randomIndex]);
          }}
        >
          Random Page
        </button>
      </p>
      <div>
        editor
        <br />
        <textarea
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            setValue(newValue);
          }}
        />
        <button
          onClick={() => {
            // if (!socket) return
            const json = JSON.stringify({
              filename,
              content: value,
            });
            // console.log("send!")
            // socket.send(json)
            sendMessage(json);
            // sendMessage("hi")
            // sendMessage('Hello')
          }}
        >
          write
        </button>
      </div>
    </>
  );
}
