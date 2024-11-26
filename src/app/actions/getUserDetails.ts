import { account } from "@/appwrite/config";

export async function getUserDetails() {
    try {    
        const user = await account.get();
        return user;
    } catch (error) {
        console.log(error);
    }
}