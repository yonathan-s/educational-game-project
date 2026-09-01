const request = require("supertest");
const app = require("../../api");
const { resetTestDB } = require("./config");

describe("Level API Endpoints", () => {
    let api;

    beforeEach(async () => {
        await resetTestDB();
    });

    beforeAll(() => {
        api = app.listen(4000, () => {
            console.log("Test server running on port 4000");
        });
    });

    afterAll((done) => {
        console.log("Gracefully closing server");
        api.close(done);
    });

    describe("GET /levels", () => {
        it("should return all levels with a status code 200", async () => {
            const response = await request(api).get("/levels");

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe("GET /levels/:id", () => {
        it("should return a specific level by ID", async () => {
            const levelId = 1;
            const response = await request(api).get(`/levels/${levelId}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id", levelId);
        });

        it("should return a 404 if level is not found", async () => {
            const nonExistentLevelId = 999;
            const response = await request(api).get(
                `/levels/${nonExistentLevelId}`,
            );

            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Unable to locate level.");
        });
    });

    describe("GET /levels/:id/stages", () => {
        it("should return a stages from a specific level by ID", async () => {
            const levelId = 1;
            const response = await request(api).get(`/levels/${levelId}/stages`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it("should return a 404 if stages are not found", async () => {
            const nonExistentLevelId = 999;
            const response = await request(api).get(
                `/levels/${nonExistentLevelId}/stages`,
            );

            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Unable to locate stages for this specific level.");
        });
    });
});
