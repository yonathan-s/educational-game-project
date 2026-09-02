const User = require("../../../models/user");
const db = require("../../../database/connect");

jest.mock("../../../database/connect");

describe("User model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const testUser = {
        id: 1,
        username: "TestUser",
        password_hash: "hashedPassword",
      };

      db.query.mockResolvedValue({
        rows: [testUser],
      });

      const result = await User.create({
        username: "TestUser",
        password_hash: "hashedPassword",
      });

      expect(db.query).toHaveBeenCalledTimes(1);

      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *;",
        ["TestUser", "hashedPassword"],
      );

      expect(result.username).toBe("TestUser");
      expect(result.password_hash).toBe("hashedPassword");
    });
  });

  describe("getOneByUsername", () => {
    it("should return a user by username", async () => {
      const testUser = {
        id: 1,
        username: "TestUser",
        password_hash: "hashedPassword",
      };

      db.query.mockResolvedValue({
        rows: [testUser],
      });

      const result = await User.getOneByUsername("TestUser");

      expect(db.query).toHaveBeenCalledTimes(1);

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE username = $1",
        ["TestUser"],
      );

      expect(result.username).toBe("TestUser");
      expect(result.password_hash).toBe("hashedPassword");
    });

    it("should throw an error if user is not found", async () => {
      db.query.mockResolvedValue({
        rows: [],
      });

      await expect(User.getOneByUsername("UnknownUser")).rejects.toThrow(
        "Unable to locate user.",
      );
    });
  });
});
