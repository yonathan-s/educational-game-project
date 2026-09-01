const Stage = require("../../../models/Stage");
const db = require("../../../database/connect");

describe("Stage", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("getOneById", () => {
    it("resolves with a stage on successful db query", async () => {
      const testStage = {
        id: 1,
        level_id: 1,
        stage_number: 1,
        stage_name: "Early Civilisations",
        points: 100,
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testStage] });

      const result = await Stage.getOneById(1);

      expect(result).toBeInstanceOf(Stage);
      expect(result.level_id).toBe(1);
      expect(result.stage_number).toBe(1);
      expect(result.id).toBe(1);
      expect(result.stage_name).toBe("Early Civilisations");
      expect(result.points).toBe(100);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM stages WHERE id = $1",
        [1],
      );
    });

    it("should throw an Error when a stage is not found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Stage.getOneById(999)).rejects.toThrow(
        "Unable to locate stage.",
      );
    });
  });

  describe("getByLevelId", () => {
    it("resolves with all stages for that level on successful db query", async () => {

	    const mockStages = [
			{ id: 1, level_id: 1, stage_number: 1, stage_name: "Early Civilisations", points: 100 },
			{ id: 1, level_id: 1, stage_number: 2, stage_name: "Ancient Egypt", points: 100 },
			{ id: 1, level_id: 1, stage_number: 3, stage_name: "Ancient Greece", points: 100 },
			{ id: 1, level_id: 1, stage_number: 4, stage_name: "Ancient Rome", points: 200 },
      ];

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockStages });

      const stages = await Stage.getByLevelId(1);

      expect(stages).toHaveLength(4);
      expect(stages[0]).toHaveProperty("id");
      expect(stages[0].stage_number).toBe(1);
	  expect(stages[0].stage_name).toBe("Early Civilisations");
	  expect(stages[0].points).toBe(100);
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM stages WHERE level_id = $1 ORDER BY stage_number ASC", [1]);
    });

    it("should throw an Error when no stages are found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Stage.getByLevelId()).rejects.toThrow("Unable to locate stages for this specific level.");
    });
  });
});
