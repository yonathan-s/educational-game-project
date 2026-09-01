const Level = require('../../../models/Level')
const db = require('../../../database/connect')

describe("Level", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("getAll", () => {
    it("resolves with levels on successful db query", async () => {
      const mockLevels = [
        { id: 1, level_number: 1, level_name: "LVL 1 name" },
        { id: 2, level_number: 2, level_name: "LVL 2 name" },
      ];
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockLevels });

      const levels = await Level.getAll();

      expect(levels).toHaveLength(2);
      expect(levels[0]).toHaveProperty("id");
      expect(levels[0].level_name).toBe("LVL 1 name");
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM levels");
    });

    it("should throw an Error when no levels are found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Level.getAll()).rejects.toThrow("No levels available.");
    });
  });

  describe("getOneById", () => {
    it("resolves with level on successful db query", async () => {

      const testLevel = { id: 1, level_number: 1, level_name: "LVL 1 name" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testLevel] });

      const result = await Level.getOneById(1);

      // Assert
      expect(result).toBeInstanceOf(Level);
      expect(result.level_name).toBe("LVL 1 name");
	  expect(result.level_number).toBe(1);
      expect(result.id).toBe(1);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM levels WHERE id = $1",
        [1],
      );
    });

    it("should throw an Error when a level is not found", async () => {

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Level.getOneById(999)).rejects.toThrow(
        "Unable to locate level.",
      );
    });
  });
});
