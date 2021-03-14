const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 1337 }, () => {
  console.log("ws startuje na porcie 1337");
});

//reakcja na podłączenie klienta i odesłanie komunikatu

wss.on("connection", (ws, req) => {
  //adres ip klienta

  const clientip = req.connection.remoteAddress;
  //reakcja na komunikat od klienta

  sendToAllButMe = (data, ws) => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  ws.on("message", message => {
    if (message == "CONNECTEDBROWSER") {
      console.log("Klient przeglądarki połączony z serwerem.");
    } else if (message == "CONNECTEDMOBILE") {
      console.log("Klient tableta połączony z serwerem.");
    } else if (
      JSON.parse(message).x &&
      JSON.parse(message).y &&
      JSON.parse(message).z
    ) {
      sendToAllButMe(message, ws);
    }
  });
});
