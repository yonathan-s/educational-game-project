const QuestionModel = require('../models/questionModel')
const questionModel = new QuestionModel()

const getQuestion = async (req, res) => {
    try {
        const userId = 1
        const stage = await questionModel.getUserStage(userId)
        if(!stage) {
            return res.status(404).json({error: "User progress not found"})
        }
        const question = await questionModel.getRandomQuestion(stage.current_stage_id)
        if(!question) {
            return res.status(404).json({error: "No question found for this stage"})
        }
        const answers = await questionModel.getAnswers(question.id)
        res.status(200).json({question, answers})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = { getQuestion }