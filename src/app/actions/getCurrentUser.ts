import { account } from "@/appwrite/config";

export async function getUserSession(){
  try {
    const session = await account.getSession("current");
    return session;
  } catch (error) {
    console.log(`Failed to retrieve session: '${error}`);
  }
};
