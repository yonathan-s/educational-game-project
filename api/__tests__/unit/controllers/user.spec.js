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

describe("Users controller register", () => {
    let mockReq;

    beforeEach(() => {
        jest.clearAllMocks()
        
        mockReq = {
            body: {
                username: "TestUser",
                password: "password123"
            }
        };
    });

    it("should register a user with a 201 status code", async () => {
        jest.spyOn(bcrypt, "genSalt")
            .mockResolvedValue("testSalt");

        jest.spyOn(bcrypt, "hash")
            .mockResolvedValue("hashedPassword");

        jest.spyOn(User, "create")
            .mockResolvedValue({
                id: 1,
                username: "TestUser",
                password_hash: "hashedPassword"
            });
        
        jest.spyOn(User, "createProgress").mockResolvedValue({});

        await usersController.register(mockReq, mockRes);

        expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);

        expect(User.createProgress).toHaveBeenCalledWith(1);

        expect(bcrypt.hash).toHaveBeenCalledWith(
            "password123",
            "testSalt"
        );

        expect(User.create).toHaveBeenCalledWith({
            username: "TestUser",
            password: "password123",
            password_hash: "hashedPassword"
        });

        expect(mockStatus).toHaveBeenCalledWith(201);
    });

    it("should return an error if registration fails", async () => {
        jest.spyOn(bcrypt, "genSalt")
            .mockResolvedValue("testSalt");

        jest.spyOn(bcrypt, "hash")
            .mockResolvedValue("hashedPassword");

        jest.spyOn(User, "create")
            .mockRejectedValue(new Error("Unable to create user"));

        await usersController.register(mockReq, mockRes);

        expect(User.create).toHaveBeenCalledTimes(1);

        expect(mockStatus).toHaveBeenCalledWith(400);

        expect(mockJson).toHaveBeenCalledWith({
            error: "Unable to create user"
        });
    });
});

describe("Users controller login", () => {
    beforeEach(() => jest.clearAllMocks());

    describe("login", () => {
        let mockReq;

        beforeEach(() => {
            mockReq = {
                body: {
                    username: "testUser",
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

            await usersController.login(mockReq, mockRes);

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






    

