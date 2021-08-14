export const hostname =
  process.env.NODE_ENV === "development"
    ? "localhost"
    : "ec2-54-67-51-168.us-west-1.compute.amazonaws.com"

export const SOCKET_PORT = 33243 // better to use await getPort() for security

// module.exports = { hostname, SOCKET_PORT }
