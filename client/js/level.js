let userProgress = {}

async function fetchUserProgress() {
	try {
		// const response = await fetch() using getUserStage from QuestionModel, route doesn't currently exist
		// const userProgress = await response.json()

		const activeStage = parseInt(sessionStorage.getItem("activeStageNumber")) || 1
		
		userProgress = {
			id: 1,
			user_id: 1,
			level_id: 1,
			current_stage_id: activeStage,
		}
		renderStages(userProgress.current_stage_id)

	} catch(err) {
		console.log("Failed to load user stages:", err)
	}
}

function renderStages(currentStage) {
	const container = document.getElementById("stages-container")
	const hintEl = document.getElementById("level-hint")

	container.innerHTML = ""

	hintEl.textContent = `Click to see the 4 stages - open up to Stage ${currentStage}`

	for (let s = 1; s <= 4; s++) {
		const isUnlocked = s <= currentStage

		if (isUnlocked) {
			const stageLink = document.createElement("a")
			stageLink.href = "question.html"
			stageLink.className = "stage-item"
			stageLink.textContent = `Stage ${s}`

			stageLink.addEventListener("click", () => {
				sessionStorage.setItem("activeStageNumber", s)
			})

			container.appendChild(stageLink)
		} else {
			const lockedStage = document.createElement("p")
			lockedStage.className = "stage-item locked"
			lockedStage.textContent = `Stage ${s}`

			container.appendChild(lockedStage)
		}
	}
}

fetchUserProgress()