const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    if (req.url == "/") {
      fs.appendFile(
        "log.txt",
        ` ${Date.now()}, ${req.method},${req.url} \n`,
        (data, err) => {
          return;
        }
      );
    }
    if (req.url == "/about") {
      fs.appendFile(
        "log.txt",
        ` ${Date.now()}, ${req.method} , ${req.url} \n`,
        (data, err) => {
          return;
        }
      );
    }
  }

  res.end("End");
});

server.listen(8000, () => console.log("server is connected"));
