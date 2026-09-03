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

    describe("getAnswers", () => {
        it("returns the answers for a question", async () => {
            const testAnswers = [
            {id: 1, answer_text: "Egypt"},
            {id: 2, answer_text: "Rome"},
            {id: 3, answer_text: "Greece"},
            {id: 4, answer_text: "Persia"}]
            jest.spyOn(db, "query").mockResolvedValue({rows: testAnswers })
            const model = new QuestionModel()
            const result = await model.getAnswers(1)
            expect(result).toHaveLength(4)
            expect(result[0]).toHaveProperty("id")
            expect(result[0]).toHaveProperty("answer_text")
            expect(db.query).toHaveBeenCalledWith('SELECT id, answer_text FROM answers WHERE question_id = $1;', [1])
        })
    })

    describe("checkAnswer", () => {
        it("returns whether the answer is correct", async () => {
            const testTrue = {is_correct: true}
            jest.spyOn(db, "query").mockResolvedValue({rows: [testTrue]})
            const model = new QuestionModel()
            const result = await model.checkAnswer(1)
            expect(result).toHaveProperty("is_correct")
            expect(result.is_correct).toBe(true)
            expect(db.query).toHaveBeenCalledWith('SELECT is_correct FROM answers WHERE id = $1;', [1])
        })
    })

    describe("addPoints", () => {
        it("adds points to the users total", async () => {
            const testUser = {id: 1, username: "ashley", points: 200}
            jest.spyOn(db, "query").mockResolvedValue({rows: [testUser]})
            const model = new QuestionModel()
            const result = await model.addPoints(1, 100)
            expect(result).toHaveProperty("id")
            expect(result).toHaveProperty("username")
            expect(result).toHaveProperty("points")
            expect(result.points).toBe(200)
            expect(db.query).toHaveBeenCalledWith('UPDATE users SET points = COALESCE(points, 0) + $1 WHERE id = $2 RETURNING id, username, points;', [100, 1])
        })
    })

})