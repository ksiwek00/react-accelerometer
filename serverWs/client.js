window.addEventListener("load", () => {
  const ws = new WebSocket("ws://localhost:1337");

  ws.onopen = () => {
    ws.send("CONNECTEDBROWSER");
    console.log("klient się podłączył");
  };

  //odebranie danych z serwera i reakcja na nie, po sekundzie

  ws.onmessage = e => {
    document.getElementById("info").innerHTML = e.data;
    var data = JSON.parse(e.data);
    document.getElementById("block").style.transform =
      "translate(" +
      data.x * 100 +
      "px," +
      data.y * 100 +
      "px) scale(" +
      data.z +
      ")";
    // setTimeout(()=>{ws.send("get")}, 1000)
  };

  ws.onerror = e => {
    console.log(e.message);
  };

  ws.onclose = e => {
    console.log(e.code, e.reason);
  };
});
