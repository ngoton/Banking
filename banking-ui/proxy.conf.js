const PROXY_CONFIG = [
  {
    context: ["/api", "/auth", "/users", "/customers"],
    target: "http://localhost:8800",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
