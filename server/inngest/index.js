import User from "../models/user.js"
import {Inngest} from "inngest";

export const inngest= new Inngest({ id: "bookmyshow-app" });

// inngest function to create user to a database

const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const {id,first_name,last_name,email_addresses,imgae_url,} = event.data;
        const userData = {  
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            image: imgae_url,
        }
        await User.create(userData)
    }
    )

// inngest function to delete user to a database

const syncUserDeletion = inngest.createFunction(
    { id: "sync-user-deletion-from-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const {id} = event.data;
        await User.findByIdAndDelete(id);
    }
    )

// inngest function to update user to a database

const syncUserUpdate = inngest.createFunction(
    { id: "sync-user-update-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        const {id,first_name,last_name,email_addresses,imgae_url,} = event.data;
        const updatedData = {  
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            image: imgae_url,
        }
        await User.findByIdAndUpdate(id,updatedData);
    }
    )


export const functions =[syncUserCreation,syncUserDeletion,syncUserUpdate];
    