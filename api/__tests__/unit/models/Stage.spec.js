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

  describe("getNextStage", () => {
    it("resolves with the next stage for that level on successful db query", async () => {

	    const mockStages = [
			{ id: 1, level_id: 1, stage_number: 1, stage_name: "Early Civilisations", points: 100 },
			{ id: 2, level_id: 1, stage_number: 2, stage_name: "Ancient Egypt", points: 100 },
      ];

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockStages[1]] });

      const stage = await Stage.getNextStage(1, 1);

      expect(stage).toHaveProperty("id");
      expect(stage.stage_number).toBe(2);
	    expect(stage.stage_name).toBe("Ancient Egypt");
      expect(db.query).toHaveBeenCalledWith('SELECT id, stage_number FROM stages WHERE level_id = $1 AND stage_number = $2;', [1, 2]);
    });

    it("should throw an Error when no stages are found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Stage.getNextStage()).rejects.toThrow("Unable to locate the next stage for this specific level.");
    });
  });

  describe("updateUserStage", () => {
    it("updates users stage progress on successful db query", async () => {

	    const mockUserProgress = { id: 1, user_id: 1, level_id: 1, current_stage: 2 }

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockUserProgress] });

      const userProgress = await Stage.updateUserStage(1,1,2);

      expect(userProgress).toHaveProperty("id");
      expect(userProgress.user_id).toBe(1);
	    expect(userProgress.level_id).toBe(1);
      expect(userProgress.current_stage).toBe(2);
      expect(db.query).toHaveBeenCalledWith('UPDATE user_progress SET current_stage_id = $1 WHERE user_id = $2 AND level_id = $3 RETURNING *;', [2, 1, 1]);
    });

    it("should throw an Error when it can't update the user_progress", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Stage.updateUserStage()).rejects.toThrow("Unable to update user with the next stage.");
    });
  });
});
