const PROXY_CONFIG = [
  {
    context: ["/api", "/auth", "/users", "/customers"],
    target: "http://localhost:8800",
    secure: false,
    changeOrigin: true,
    headers: {
      "Connection": "keep-alive"
    }
  }
];

module.exports = PROXY_CONFIG;
