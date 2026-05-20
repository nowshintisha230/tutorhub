// src/lib/auth.js
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined. Check your .env.local file.");
}

// Singleton pattern — reuses connection across hot reloads
let client = global._mongoClient;

if (!client) {
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  global._mongoClient = client;
}

const db = client.db("tutorhub"); // ← you had "tutorhub" here, change as needed

export const auth = betterAuth({
  database: mongodbAdapter(db),  // ← just db, no second argument
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:{
    google:{
      clientId:process.env.GOOGLE_CLIENTID,
      clientSecret:process.env.GOOGLE_SECRET
    }
  },
session:{
cookieCache:{
  enabled:true,
  strategy:"jwt",
  maxAge:30*24*60*60
}
},

  plugins:[
    jwt()
  ]
});