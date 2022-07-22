import supertest from "supertest";
import app from "../src/app.js";

import db from "../src/config/database.js";
import authFactory from "./factories/authFactory.js";

beforeEach(async () => {
  await db.$executeRaw`TRUNCATE TABLE users,sessions,credentials,"secure-notes",cards,wifi;`;
});

describe("geral tests", () => {
  it("(non-existent page) should answer with status 404", async () => {
    const response = await supertest(app).get("/not_found");
    expect(response.statusCode).toEqual(404);
  });
});

describe("authentication tests", () => {
  const defaultEmail = "1@gmail.com";
  const defaultPassword = "1111111111";

  it("should answer with status 422 when trying to create an invalid user", async () => {
    const response = await authFactory.signUp();
    expect(response.statusCode).toEqual(422);
  });

  it("should answer with status 201 when trying to create a valid user", async () => {
    const response = await authFactory.signUp(defaultEmail, defaultPassword);
    expect(response.statusCode).toEqual(201);
  });

  it("should answer with status 409 when trying to create a already existing user", async () => {
    await authFactory.signUp(defaultEmail, defaultPassword);
    const response = await authFactory.signUp(defaultEmail, defaultPassword);
    expect(response.statusCode).toEqual(409);
  });

  it("should answer with status 422 when trying to sign in with invalid input values", async () => {
    const response = await authFactory.signIn();
    expect(response.statusCode).toEqual(422);
  });

  it("should answer with status 401 when trying to sign in with not existing user", async () => {
    const response = await authFactory.signIn(defaultEmail,defaultPassword);
    expect(response.statusCode).toEqual(401);
  });

  it("should answer with status 201 when trying to sign in with a valid user", async () => {
    await authFactory.signUp(defaultEmail,defaultPassword);
    const response = await authFactory.signIn(defaultEmail,defaultPassword);
    expect(response.statusCode).toEqual(201);
  });

  it("should answer with status 401 when trying to sign out with an invalid token", async () => {
    const token = "";
    const response = await authFactory.signOut(token);
    expect(response.statusCode).toEqual(401);
  });

  it("should answer with status 200 when trying to sign out with a valid token", async () => {
    await authFactory.signUp(defaultEmail,defaultPassword);
    let response = await authFactory.signIn(defaultEmail,defaultPassword);
    const token = response.body.token;
    response = await authFactory.signOut(token);
    expect(response.statusCode).toEqual(200);
  });
});
