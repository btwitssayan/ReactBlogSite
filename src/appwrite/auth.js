import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create({userId:ID.unique(), email, password, name});

            if (userAccount) {
                // Account created successfully
                return this.login({email, password}); 
            }
        } catch (error) {
            return error;
        }
    }

    async login({email, password}) {
        try {
            const result = await this.account.createEmailPasswordSession({email, password});
            return result;
        } catch (error) {
            comsole.log("Login Error:", error);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current User:", user);
            return user;
        } catch (error) {
            console.log("Error fetching current user:", error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            return error;
        }
    }
}

const authService = new AuthService();
export default authService;