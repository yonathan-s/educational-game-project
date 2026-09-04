const QuestionModel = require("../models/questionModel");
const Stage = require("../models/Stage");
const questionModel = new QuestionModel();

const getQuestion = async (req, res) => {
  try {
    const userId = req.user.id;
    const stage = await questionModel.getUserStage(userId);
    if (!stage) {
      return res.status(404).json({ error: "User progress not found" });
    }
    console.log("userId:", userId);
    console.log("stage:", stage);
    const question = await questionModel.getRandomQuestion(
      stage.current_stage_id,
    );
    if (!question) {
      return res
        .status(404)
        .json({ error: "No question found for this stage" });
    }
    const answers = await questionModel.getAnswers(question.id);
    res.status(200).json({ question, answers, stage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answer_id } = req.body;
    const answer = await questionModel.checkAnswer(answer_id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    if (!answer.is_correct) {
      return res
        .status(200)
        .json({ correct: false, message: "Incorrect answer. Try again!" });
    }

    const userStage = await questionModel.getUserStage(userId);
    if (!userStage) {
      return res.status(404).json({ error: "User progress not found" });
    }
    const stage = await Stage.getOneById(userStage.current_stage_id);

    console.log("stage:", stage);
    console.log("stage points:", stage.points);

    const updatedUser = await questionModel.addPoints(userId, stage.points);

    const nextStage = await Stage.getNextStage(
      stage.level_id,
      stage.stage_number,
    );

    await Stage.updateUserStage(userId, stage.level_id, nextStage.id);

    res.status(200).json({
      correct: true,
      message: "Correct answer!",
      points_awarded: stage.points,
      total_points: updatedUser.points,
      next_stage: nextStage.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getQuestion, submitAnswer, questionModel }
