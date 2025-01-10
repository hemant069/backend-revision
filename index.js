const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    fs.writeFile("log.txt", `${Date.now()}, ${req.method}`, (data, err) => {
      return;
    });
  }
  res.end("End");
});

server.listen(8000, () => console.log("server is connected"));
