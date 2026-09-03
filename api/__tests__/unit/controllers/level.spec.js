const levelController = require("../../../controllers/level");
const Level = require("../../../models/Level");
const Stage = require('../../../models/Stage');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
    send: mockSend,
    json: mockJson,
    end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("Levels controller", () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe("index", () => {
        it("should return levels with a status code 200", async () => {
            const testLevels = ["Ancient History", "Medieval History"];
            jest.spyOn(Level, "getAll").mockResolvedValue(testLevels);

            await levelController.index(null, mockRes);

            expect(Level.getAll).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testLevels);
        });

        it("should return an error upon failure", async () => {
            jest.spyOn(Level, "getAll").mockRejectedValue(
                new Error("Something happened to your db"),
            );

            await levelController.index(null, mockRes);

            expect(Level.getAll).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                error: "Something happened to your db",
            });
        });
    });

    describe("showLevel", () => {
        let testLevel, mockReq;

        beforeEach(() => {
            testLevel = { id: 1, level_number: 1, level_name: "LVL 1 name" };
            mockReq = { params: { id: 1 } };
        });

        it("should return a level with a 200 status code", async () => {
            jest.spyOn(Level, "getOneById").mockResolvedValue(new Level(testLevel));

            await levelController.showLevel(mockReq, mockRes);

            expect(Level.getOneById).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Level(testLevel));
        });

        it("should return an error if the level is not found", async () => {
            jest.spyOn(Level, "getOneById").mockRejectedValue(new Error("oh no"));

            await levelController.showLevel(mockReq, mockRes);

            expect(Level.getOneById).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "oh no" });
        });
    });

	describe("showStages", () => {
        let testStages, mockReq;

        beforeEach(() => {
            testStages = [
			{ id: 1, level_id: 1, stage_number: 1, stage_name: "Early Civilisations", points: 100 },
			{ id: 1, level_id: 1, stage_number: 2, stage_name: "Ancient Egypt", points: 100 },
			{ id: 1, level_id: 1, stage_number: 3, stage_name: "Ancient Greece", points: 100 },
			{ id: 1, level_id: 1, stage_number: 4, stage_name: "Ancient Rome", points: 200 },
      ];
            mockReq = { params: { id: 1 } };
        });

        it("should return a stages from a specific level id with a 200 status code", async () => {
            jest.spyOn(Stage, "getByLevelId").mockResolvedValue(new Stage(testStages));

            await levelController.showStages(mockReq, mockRes);

            expect(Stage.getByLevelId).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Stage(testStages));
        });

        it("should return an error if the stages are not found", async () => {
            jest.spyOn(Stage, "getByLevelId").mockRejectedValue(new Error("oh no"));

            await levelController.showStages(mockReq, mockRes);

            expect(Stage.getByLevelId).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "oh no" });
        });
    });
});
