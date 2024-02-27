const WebSocket = require("ws");

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8888});

// 监听 WebSocket 连接事件
wss.on("connection", function(ws) {
  console.log("WebSocket连接已建立");

  // 监听 WebSocket 接收到消息事件
  ws.on("message", function(message) {
    // 将接收到的消息广播给所有连接的客户端
    wss.clients.forEach(function(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // 监听 WebSocket 关闭事件
  ws.on("close", function() {
    console.log("WebSocket连接已关闭");
  });

  // 监听 WebSocket 错误事件
  ws.on("error", function(error) {
    console.error("WebSocket连接发生错误", error);
  });
});

console.log("WebSocket服务器已启动");
