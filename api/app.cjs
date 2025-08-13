const http = require("http");
const fs = require("fs");
const path = require("path");
const DATA_FILE = path.join(__dirname, "../src/data/data.json");
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
// Helper to read JSON file
function readJson() {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Helper to write JSON file
function writeJson(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Simple API server
const server = http.createServer((req, res) => {
  // Set CORS headers for every response
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/data") {
    const data = readJson();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else if (req.method === "POST" && req.url === "/update") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const update = JSON.parse(body);
        const data = readJson();
        const newData = { ...data, ...update };
        writeJson(newData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "success", data: newData }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "error", message: e.message }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "not found" }));
  }
});

server.listen(3000, () => {
  console.log("API server running at http://localhost:3000");
});
