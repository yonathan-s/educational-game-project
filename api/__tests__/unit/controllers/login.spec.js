const usersController = require("../../../controllers/user");
const User = require("../../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
    send: mockSend,
    json: mockJson,
    end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("Users controller", () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe("login", () => {
        let mockReq;

        beforeEach(() => {
            mockReq = {
                body: {
                    username: "TestUser",
                    password: "password123",
                },
            };
        })

        it("should login a user with a status code 200", async () => {
            const testUser = {
                id: 1,
                username: "testUser",
                password_hash: "hashedPassword",
            };
            jest.spyOn(User, "getOneByUsername").mockResolvedValue(testUser);

            jest.spyOn(bcrypt, "compare").mockResolvedValue(true)

            jest.spyOn(jwt, "sign").mockImplementation(
                (payload, secret, options, callback) => {
                    callback(null, "test-token")
                }
            )

            await usersController.login(mockReq, mockRes);

            expect(User.getOneByUsername).toHaveBeenCalledTimes(1);
            expect(User.getOneByUsername).toHaveBeenCalledWith("testUser");

            expect(bcrypt.compare).toHaveBeenCalledWith(
                "password123",
                "hashedPassword"
            );

            expect(mockStatus).toHaveBeenCalledWith(200);

            expect(mockJson).toHaveBeenCalledWith({
                success: true,
                token: "test-token",
            });
        });

        it("should return an error if password is incorrect", async () => {

            const testUser = {
                username: "testUser",
                password_hash: "hashedPassword",
            };

            jest.spyOn(User, "getOneByUsername").mockResolvedValue(testUser);

            jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

            await userController.login(mockReq, mockRes);

            expect(User.getOneByUsername).toHaveBeenCalledTimes(1);
            expect(bcrypt.compare).toHaveBeenCalledTimes(1);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                error: "User could not be authenticated",
            });
        });
        
        it("should return an error if user is not found", async () => {
            jest.spyOn(User, "getOneByUsername").mockRejectedValue(
                new Error("Unable to locate user.")
            );

            await usersController.login(mockReq, mockRes);

            expect(User.getOneByUsername).toHaveBeenCalledTimes(1);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                error: "Unable to locate user.",
            });
        });
    });

    
});
