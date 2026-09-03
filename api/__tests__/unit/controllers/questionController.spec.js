const QuestionModel = require('../../../models/questionModel')
const Stage = require('../../../models/Stage')
const { getQuestion, submitAnswer, questionModel } = require('../../../controllers/questionController')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({
    send: mockSend,
    json: mockJson,
    end: mockEnd
}))

const mockRes = { status: mockStatus }

describe("questionController", () => {
    beforeEach(() => jest.clearAllMocks())
    afterEach(() => jest.restoreAllMocks())

    describe("getQuestion", () => {
        it("returns a question and its answers", async () => {
            const mockReq = { user: { id: 1 } }
            jest.spyOn(questionModel, "getUserStage").mockResolvedValue({current_stage_id: 1})
            jest.spyOn(questionModel, "getRandomQuestion").mockResolvedValue({id: 1, question_text: "Who built the pyramids?"})
            jest.spyOn(questionModel, "getAnswers").mockResolvedValue([
                {id: 1, answer_text: "Egypt"},
                {id: 2, answer_text: "Rome"},
                {id: 3, answer_text: "Greece"},
                {id: 4, answer_text: "Persia"}
            ])
            await getQuestion(mockReq, mockRes)
            expect(questionModel.getUserStage).toHaveBeenCalledWith(1)
            expect(questionModel.getRandomQuestion).toHaveBeenCalledWith(1)
            expect(questionModel.getAnswers).toHaveBeenCalledWith(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({ question: {id: 1, question_text: "Who built the pyramids?"},
                answers: [
                {id: 1, answer_text: "Egypt"},
                {id: 2, answer_text: "Rome"},
                {id: 3, answer_text: "Greece"},
                {id: 4, answer_text: "Persia"}] })
        })

        it("returns 404 if user progress is not found", async () => {
            const mockReq = { user: { id: 1 } }
            jest.spyOn(questionModel, "getUserStage").mockResolvedValue(undefined)
            await getQuestion(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: "User progress not found" })
        })

        it("returns 404 if no question is found", async () => {
            const mockReq = { user: { id: 1 } }
            jest.spyOn(questionModel, "getUserStage").mockResolvedValue({ current_stage_id: 1 })
            jest.spyOn(questionModel, "getRandomQuestion").mockResolvedValue(undefined)
            await getQuestion(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: "No question found for this stage"})
        })
    })

    describe("submitAnswer", () => {
        it("returns 404 if the answer is not found", async () => {
            const mockReq = { user: { id: 1 }, body: { answer_id: 1 } }
            jest.spyOn(questionModel, "checkAnswer").mockResolvedValue(undefined)
            await submitAnswer(mockReq, mockRes)
            expect(questionModel.checkAnswer).toHaveBeenCalledWith(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: "Answer not found" })
        })

        it("returns incorrect message if the answer is wrong", async () => {
            const mockReq = { user: { id: 1 }, body: { answer_id: 1 } }
            jest.spyOn(questionModel, "checkAnswer").mockResolvedValue({ is_correct: false })
            await submitAnswer(mockReq, mockRes)
            expect(questionModel.checkAnswer).toHaveBeenCalledWith(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({ correct: false, message: "Incorrect answer. Try again!" })
        })

        it("awards points and moves user to next stage when answer is correct", async () => {
            const mockReq = { user: { id: 1 }, body: { answer_id: 1 } }
            jest.spyOn(questionModel, "checkAnswer").mockResolvedValue({ is_correct: true })
            jest.spyOn(questionModel, "getUserStage").mockResolvedValue({ current_stage_id: 1 })
            jest.spyOn(Stage, "getOneById").mockResolvedValue({ id: 1, level_id: 1, stage_number: 1, points: 100 })
            jest.spyOn(questionModel, "addPoints").mockResolvedValue({ id: 1, username: "ashley", points: 200 })
            jest.spyOn(Stage, "getNextStage").mockResolvedValue({ id: 2, stage_number: 2 })
            jest.spyOn(Stage, "updateUserStage").mockResolvedValue({ user_id: 1, level_id: 1, current_stage_id: 2 })
            await submitAnswer(mockReq, mockRes)
            expect(questionModel.checkAnswer).toHaveBeenCalledWith(1)
            expect(questionModel.getUserStage).toHaveBeenCalledWith(1)
            expect(Stage.getOneById).toHaveBeenCalledWith(1)
            expect(questionModel.addPoints).toHaveBeenCalledWith(1, 100)
            expect(Stage.getNextStage).toHaveBeenCalledWith(1, 1)
            expect(Stage.updateUserStage).toHaveBeenCalledWith(1, 1, 2)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({
                correct: true,
                message: "Correct answer!",
                points_awarded: 100,
                total_points: 200,
                next_stage: 2
            })
        })
    })
})