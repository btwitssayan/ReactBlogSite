import config from "../config/config";
import { Client, Databases, Storage, Query, ID, TablesDB } from "appwrite";

export class Service {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
                data: { title, content, featuredImage, status, userId },
            })
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
                data: { title, content, featuredImage, status },
            })
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteCollectionId,
                documentId: slug,
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
            })
        } catch (error) {

        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.tablesDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                queries: queries,
            })

        } catch (error) {
            
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file: file,
            })
        } catch (error) {
            console.log("File upload error::", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId: fileId,
            })
            return true;
        } catch (error) {
            console.log("File delete error::", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFileView({
                bucketId: config.appwriteBucketId,
                fileId: fileId,
            })
        } catch (error) {
            console.log("File preview error::", error);
            return null;
        }
    }
}

const service = new Service();
export default service;