const db = require('../database/connect')

class QuestionModel {
    
    async getUserStage(userId) {
        const res = await db.query('SELECT current_stage_id FROM user_progress WHERE user_id = $1;', [userId])
        return res.rows[0]
    }

    async getRandomQuestion(stageId) {
        const res = await db.query('SELECT id, question_text FROM questions WHERE stage_id = $1 ORDER BY RANDOM() LIMIT 1;', [stageId])
        return res.rows[0]
    }

    async getAnswers(questionId) {
        const res = await db.query('SELECT id, answer_text FROM answers WHERE question_id = $1;', [questionId])
        return res.rows
    }

    async checkAnswer(answerId) {
        const res = await db.query('SELECT is_correct FROM answers WHERE id = $1;', [answerId])
        return res.rows[0]
    }

}

module.exports = QuestionModel