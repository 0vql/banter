import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, getDocs } from "firebase/firestore";
import { useAppSelector } from "../redux/hooks";
import { db, User } from "../../firebase";

export interface Server {
  name: string;
  path: string;
  // img: string; Add server images
  id: string;
}

export interface Channel {
  name: string;
  path: string;
  id: string;
}

export interface MessageData {
  content: string;
  date: string;
  edited: boolean;
  reactions: [];
  timestamp: number;

  user: {
    name: string;
    img: string;
  };
}

export interface ServersState {
  server: Server;
  servers: Server[];
  channel: Channel;
  channels: Channel[];
  messages: MessageData[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ServersState = {
  servers: [],

  server: {
    name: "",
    path: "",
    id: "",
    // img: "", Add server images
  },

  channel: {
    name: "",
    path: "",
    id: "",
  },

  channels: [],
  messages: [],
  loading: "idle",
};

export const serversSlice = createSlice({
  name: "servers",
  initialState,

  reducers: {
    setServers(state, action) {
      state.servers = action.payload;
    },

    setServer(state, action) {
      state.server = action.payload;
    },

    setChannels(state, action) {
      state.channels = action.payload;
    },

    setChannel(state, action) {
      state.channel = action.payload;
    },

    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { setServers, setServer, setChannels, setChannel, setMessages } =
  serversSlice.actions;

export const useServersState = () => useAppSelector((state) => state.servers);

export default serversSlice.reducer;
