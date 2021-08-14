// console.log("process.env.NODE_ENV", process.env.NODE_ENV);

export const hostname =
  process.env.NODE_ENV === "development"
    ? "localhost"
    : "ec2-54-67-51-168.us-west-1.compute.amazonaws.com";

// export const hostname = "ec2-54-67-51-168.us-west-1.compute.amazonaws.com";

console.log("hostname", hostname);
export const SOCKET_PORT = 33243; // better to use await getPort() for security

// module.exports = { hostname, SOCKET_PORT }
