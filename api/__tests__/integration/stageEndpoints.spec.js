const request = require("supertest");
const app = require("../../api");
const { resetTestDB } = require("./config");

describe("Stage API Endpoints", () => {
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

	describe("GET /stages/:id", () => {
		it("should return a specific stage by ID", async () => {
			const stageId = 1;
			const response = await request(api).get(`/stages/${stageId}`);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("id", stageId);
		});

		it("should return a 404 if stage is not found", async () => {
			const nonExistentStageId = 999;
			const response = await request(api).get(
				`/stages/${nonExistentStageId}`,
			);

			expect(response.status).toBe(404);
			expect(response.body.error).toBe("Unable to locate stage.");
		});
    });

})