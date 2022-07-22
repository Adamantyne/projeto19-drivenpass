import supertest from "supertest";

import app from "../../src/app.js";
import db from "../../src/config/database.js";

async function signUp(email?: string, password?: string) {
  const body = { email, password };
  const response = await supertest(app).post("/signUp").send(body);
  return response;
}

async function signIn(email?: string, password?: string) {
  const body = { email, password };
  const response = await supertest(app).post("/signIn").send(body);
  return response;
}

async function signOut(token?: string) {
  const response = await supertest(app)
    .get("/signOut")
    .set("Authorization", token);
  return response;
}

const authFactory = { signUp, signIn, signOut };
export default authFactory;
