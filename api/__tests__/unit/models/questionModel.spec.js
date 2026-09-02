const db = require('../../../database/connect')
const QuestionModel = require('../../../models/questionModel')

describe("QuestionModel", () => {
    beforeEach(() => jest.clearAllMocks());

    afterEach(() => jest.restoreAllMocks());

    describe("getUserStage", () => {
        it("returns the users current stage", async () => {
            const testStage = {current_stage_id: 1}
            jest.spyOn(db, "query").mockResolvedValue({rows: [testStage]})
            const model = new QuestionModel()
            const result = await model.getUserStage(1)
            expect(result).toEqual({current_stage_id: 1})
            expect(model).toBeInstanceOf(QuestionModel)
            expect(result.current_stage_id).toBe(1)
            expect(db.query).toHaveBeenCalledWith('SELECT current_stage_id FROM user_progress WHERE user_id = $1;', [1])
        })
    })

    describe("getRandomQuestion", () => {
        it("returns a random question for the stage", async () => {
            const testQuestion = {id: 1, question_text: "Who built the pyramids?"}
            jest.spyOn(db, "query").mockResolvedValue({rows: [testQuestion]})
            const model = new QuestionModel()
            const result = await model.getRandomQuestion(1)
            expect(result).toEqual({id: 1, question_text: "Who built the pyramids?"})
            expect(result).toHaveProperty("id")
            expect(result.question_text).toBe("Who built the pyramids?")
            expect(db.query).toHaveBeenCalledWith('SELECT id, question_text FROM questions WHERE stage_id = $1 ORDER BY RANDOM() LIMIT 1;', [1])
        })
    })

})