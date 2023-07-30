import io from "socket.io-client";
import notify from "./DomComponent";
import onBody from "on-body";
import notification_Style from "../dist/notification.js";
import { SetParent } from "./DomComponent";

class Socket {
  constructor(url, ele) {
    if (!Socket.instance) {
      this.socket = io(url);
      this.id = "";
      this.parent = ele;
      this.initialize();
    }
    return Socket.instance;
  }

  initialize() {
    SetParent(this.parent);
    this.socket.on("connect", () => {
      console.log("Socket connected");
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    this.socket.on("recieve", (info) => {
      const styleElement = document.createElement("style");

      styleElement.textContent = notification_Style(
        info.backgroundColor,
        info.Symbol,
        info.textColor,
        info.borderRadius,
        info.MaxWidth,
        info.MinWidth
      );
      document.head.appendChild(styleElement);

      notify(info.Msg);
    });
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }

  off(event, callback) {
    this.socket.off(event, callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default Socket;
