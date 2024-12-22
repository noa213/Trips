import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as NetServer } from "http";
import { Socket as NetSocket } from "net";

// טיפוסים המורחבים
export interface SocketServer extends NetServer {
  io?: IOServer;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

// הרחבה של NextApiResponse עם התמיכה ב-Socket.io
export interface NextApiResponseServerIO extends NextApiResponse {
  socket: SocketWithIO;
}

