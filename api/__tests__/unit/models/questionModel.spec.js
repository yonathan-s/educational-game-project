const { describe, beforeEach, afterEach } = require('node:test')
const db = require('../../../database/connect')
const QuestionModel = require('../../../models/questionModel')

describe("QuestionModel", () => {
    beforeEach(() => jest.clearAllMocks());

    afterEach(() => jest.restoreAllMocks());

    describe("getUserStage", () => {
        it("returns the users current stage", async () => {
            
        })
    })
})