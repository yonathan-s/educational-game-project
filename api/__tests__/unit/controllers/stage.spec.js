const stageController = require("../../../controllers/stage");
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

describe("Stages controller", () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe("show", () => {
		let testStage, mockReq;

		beforeEach(() => {
      		testStage = { id: 1, level_id: 1, stage_number: 1, stage_name: "Early Civilisations", points: 100 };
     		mockReq = { params: { id: 1 } }
    	});

        it("should return stage with a status code 200", async () => {
            jest.spyOn(Stage, "getOneById").mockResolvedValue(new Stage(testStage));

            await stageController.show(mockReq, mockRes);

            expect(Stage.getOneById).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testStage);
        });

		it('should return an error if the goat is not found', async () => {
			jest.spyOn(Stage, "getOneById").mockRejectedValue(new Error('oh no'))

			await stageController.show(mockReq, mockRes)
			
			expect(Stage.getOneById).toHaveBeenCalledTimes(1)
			expect(mockStatus).toHaveBeenCalledWith(404)
			expect(mockJson).toHaveBeenCalledWith({ error: 'oh no' })
		})
    });
});