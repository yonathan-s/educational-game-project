const request = require("supertest"); //lets jest make http request without having to use thunder client
const app = require("../../api");
const db = require("../../database/connect");

describe("User routes", () => {

    beforeEach(async () => {
        await db.query("DELETE FROM users WHERE username = $1", [
            "IntegrationTestUser"
        ]);
    });

    afterAll(async () => {
        await db.query("DELETE FROM users WHERE username = $1", [
            "IntegrationTestUser"
        ]);

        await db.end();
    });

    describe("POST /users/register", () => {

        it("should register a new user", async () => {

            const response = await request(app)
                .post("/users/register")
                .send({
                    username: "IntegrationTestUser",
                    password: "password123"
                });

            expect(response.status).toBe(201);
        });
    });


    describe("POST /users/login", () => {

        it("should login a registered user", async () => {

            await request(app)
                .post("/users/register")
                .send({
                    username: "IntegrationTestUser",
                    password: "password123"
                });

            const response = await request(app)
                .post("/users/login")
                .send({
                    username: "IntegrationTestUser",
                    password: "password123"
                });

            expect(response.status).toBe(200);

        });
    });
});