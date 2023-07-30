import Socket from "./Controllers/Socket";

class Noti_client {
  constructor(url, ele) {
    if (!Noti_client.instance) {
      this.ele = ele;
      this.url = url;
      this.socket = "";
      this.data = "";
      this.init();
    }

    return Noti_client.instance;
  }
  init() {
    this.socket = new Socket(this.url, this.ele);

    // Receive(this.socket);
  }
  Receive() {
    this.socket.on("recieve", (info) => {
      this.data = info;
    });
    return this.data;
  }
}

export { Noti_client };
