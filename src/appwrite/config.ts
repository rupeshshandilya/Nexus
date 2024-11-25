import { Account, Client } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_URL || "");

export const account = new Account(client);
