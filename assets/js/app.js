const { createApp } = Vue;

createApp({
    data() {
        return {
            // user session
            currentUser: null,
            currentUserId: null,
            inputUsername: '',
            savedUsers: [],

            // app state
            currentStoryIndex: 0,
            currentSceneIndex: 0,
            stories: storiesDB,
            mode: 'login',

            // game state
            selectedIndices: [],
            solvedWords: [],
            foundIndices: [],
            feedbackMessage: '',
            feedbackColor: '',
            isGameFinished: false,

            // dashboard data
            dashboardData: [],

            // timer data
            remainingSeconds: 0,
            timerInterval: null,
            isTimeUp: false, // new state for game over modal
        }
    },
    computed: {
        currentStory() {
            return this.stories[this.currentStoryIndex];
        },
        currentScene() {
            if (!this.currentStory.scenes) return null;
            return this.currentStory.scenes[this.currentSceneIndex];
        },
        formattedStory() {
            return this.currentStory.text.replace(/\n/g, '<br>');
        },
        gridSize() {
            if (!this.currentStory.gridLetters || !this.currentStory.gridLetters[0]) return 0;
            return this.currentStory.gridLetters[0].length;
        },
        flatGrid() {
            return this.currentStory.gridLetters.flat();
        },
        currentSelectionString() {
            return this.selectedIndices.map(i => this.flatGrid[i]).join('');
        },
        allSolved() {
            if (!this.currentStory || !this.currentStory.clues) return false;
            const totalClues = Object.keys(this.currentStory.clues).length;
            const solvedCount = this.solvedWords.length;
            if (totalClues === 0) return false;
            return solvedCount === totalClues;
        },
        studentStats() {
            if (!this.dashboardData) return [];
            return this.dashboardData.map(student => {
                let totalScore = 0;
                let maxScore = 0;
                let storiesCompleted = 0;
                let details = [];

                this.stories.forEach((story, index) => {
                    const dbStory = student.raw_details.find(d => d.story_index === index);
                    const solvedCount = dbStory ? dbStory.score : 0;
                    const totalClues = Object.keys(story.clues).length;

                    totalScore += solvedCount;
                    maxScore += totalClues;

                    if (dbStory && dbStory.is_completed) storiesCompleted++;

                    details.push({
                        title: story.title,
                        score: solvedCount,
                        total: totalClues,
                        percentage: totalClues > 0 ? (solvedCount / totalClues) * 100 : 0
                    });
                });

                const totalProgress = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

                return {
                    name: student.name.charAt(0).toUpperCase() + student.name.slice(1),
                    progress: totalProgress,
                    storiesFinished: storiesCompleted,
                    totalStories: this.stories.length,
                    details: details
                };
            });
        },
        formattedTime() {
            if (this.remainingSeconds < 0) return "00:00";
            const minutes = Math.floor(this.remainingSeconds / 60);
            const seconds = this.remainingSeconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
        timerColor() {
            // make text RED when less than 20 seconds
            return this.remainingSeconds <= 20 ? 'text-red-600 animate-pulse' : 'text-blue-900';
        }
    },
    async mounted() {

    },
    methods: {
        // --- LOGIN LOGIC ---
        async login() {
            if (!this.inputUsername.trim()) return;
            const username = this.inputUsername.trim().toLowerCase();
            try {
                // call our new API
                const data = await FunitikanAPI.login(username);

                if (data) {
                    this.currentUser = data.username;
                    this.currentUserId = data.student_id;
                    this.currentStoryIndex = data.current_story_index;

                    if (data.is_game_finished) {
                        this.isGameFinished = true;
                        this.mode = 'finished';
                    } else {
                        this.mode = 'story';
                        this.currentSceneIndex = 0; // always start story from beginning
                        this.solvedWords = data.solved_words || [];
                        this.foundIndices = data.found_indices || [];
                        this.remainingSeconds = data.time_remaining;
                    }
                }
            } catch (e) {
                alert("Login Failed: " + e.message);
            }
        },

        // --- DASHBOARD LOGIC ---
        async openDashboard() {
            const data = await FunitikanAPI.getDashboard();
            if (data) {
                this.dashboardData = data;
                this.mode = 'dashboard';
            }
        },
        exitDashboard() {
            this.mode = 'login';
        },
        getCellClasses(index) {
            if (this.isCellFound(index)) {
                // style for found words (green)
                return 'bg-green-500 text-white shadow-inner scale-95 border-2 border-green-600';
            }
            else if (this.selectedIndices.includes(index)) {
                // style for currently selected (yellow)
                return 'bg-yellow-300 text-yellow-900 scale-105 shadow-lg border-2 border-yellow-500 z-10';
            }
            else {
                // default style (gray/white)
                return 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600';
            }
        },
        prevScene(event) {
            if (event) event.stopPropagation();

            if (this.currentSceneIndex > 0) {
                this.currentSceneIndex--;
            }
        },
        nextScene() {
            if (this.currentSceneIndex < this.currentStory.scenes.length - 1) {
                this.currentSceneIndex++;
            } else {
                this.startGame();
            }
        },
        async nextStory() {
            if (this.currentStoryIndex < this.stories.length - 1) {
                this.currentStoryIndex++;

                // Reset Level Data
                this.solvedWords = [];
                this.foundIndices = [];
                this.selectedIndices = [];
                this.currentSceneIndex = 0;
                this.stopTimer();
                this.remainingSeconds = null;

                // save new state to database
                await FunitikanAPI.saveState(this.currentUserId, this.currentStoryIndex, false);

                this.resetGame();
            } else {
                this.isGameFinished = true;
                this.mode = 'finished';
                await FunitikanAPI.saveState(this.currentUserId, this.currentStoryIndex, true);
            }
        },
        resetGame() {
            this.mode = 'story';
            this.currentSceneIndex = 0;
            this.selectedIndices = [];
            this.feedbackMessage = '';
        },
        async restartWholeGame() {
            this.currentStoryIndex = 0;
            this.isGameFinished = false;
            this.solvedWords = [];
            this.foundIndices = [];
            this.selectedIndices = [];

            // reset database state to 0
            await FunitikanAPI.saveState(this.currentUserId, 0, false);

            this.resetGame();
        },
        startGame() {
            this.mode = 'game';
            this.startTimer();
        },
        toggleCell(index) {
            if (this.selectedIndices.includes(index)) {
                this.selectedIndices = this.selectedIndices.filter(i => i !== index);
            } else {
                this.selectedIndices.push(index);
            }
        },
        clearSelection() {
            this.selectedIndices = [];
        },
        isCellFound(index) {
            return this.foundIndices.includes(index);
        },
        showFeedback(text, color) {
            this.feedbackMessage = text;
            this.feedbackColor = color;
            setTimeout(() => {
                this.feedbackMessage = '';
            }, 3000);
        },
        isValidSelection() {
            const indices = this.selectedIndices;
            if (indices.length < 2) return true;

            const width = this.gridSize;
            const diff = indices[1] - indices[0];

            for (let i = 1; i < indices.length; i++) {
                if (indices[i] - indices[i-1] !== diff) return false;
            }

            const absDiff = Math.abs(diff);
            const isHorizontal = absDiff === 1;
            const isVertical = absDiff === width;
            const isDiagonalDown = absDiff === width + 1; // \ direction
            const isDiagonalUp = absDiff === width - 1; // / direction

            if (!isHorizontal && !isVertical && !isDiagonalDown && !isDiagonalUp) return false;

            for (let i = 0; i < indices.length - 1; i++) {
                const current = indices[i];
                const next = indices[i+1];
                const currentCol = current % width;
                const nextCol = next % width;
                const colDiff = Math.abs(nextCol - currentCol);

                if (isHorizontal || isDiagonalDown || isDiagonalUp) {
                    if (colDiff !== 1) return false;
                }
            }
            return true;
        },
        forceNextStory() {
            this.nextStory();
        },
        async checkAnswer() {
            if (!this.isValidSelection()) {
                this.showFeedback("Dapat magkatabi at nasa linya ang mga letra!", "red");
                this.selectedIndices = [];
                return;
            }

            const currentWord = this.currentSelectionString.toUpperCase().trim();
            const cluesObject = this.currentStory.clues;
            const correctWords = Object.keys(cluesObject).map(w => w.toUpperCase().trim());

            if (correctWords.includes(currentWord)) {
                const originalKey = Object.keys(cluesObject).find(k => k.toUpperCase().trim() === currentWord);

                if (this.solvedWords.includes(originalKey)) {
                    this.showFeedback("Nahanap mo na ang salitang ito!", "orange");
                    this.selectedIndices = [];
                    return;
                }

                this.solvedWords.push(originalKey);
                this.foundIndices.push(...this.selectedIndices);
                this.selectedIndices = [];
                const totalClues = Object.keys(cluesObject).length;
                const isCompleted = this.solvedWords.length === Object.keys(this.currentStory.clues).length;
                await FunitikanAPI.saveProgress(
                    this.currentUserId,
                    this.currentStoryIndex,
                    this.solvedWords,
                    this.foundIndices,
                    isCompleted,
                    this.remainingSeconds
                );
                if (isCompleted) {
                    if (this.currentStoryIndex === this.stories.length - 1) {
                        this.showFeedback("Tama! Natapos mo na ang laro!", "green");
                        setTimeout(async () => {
                            this.isGameFinished = true;
                            this.mode = 'finished';
                            // save final state
                            await FunitikanAPI.saveState(this.currentUserId, this.currentStoryIndex, true);
                        }, 1000);
                        return;
                    }
                }

                this.showFeedback("Tama! Mahusay!", "green");
            } else {
                this.showFeedback("Mali ang sagot! Subukan ulit.", "red");
                this.selectedIndices = [];
            }
        },
        // --- COUNTDOWN LOGIC ---
        startTimer() {
            this.stopTimer();

            if (!this.remainingSeconds || this.remainingSeconds <= 0) {
                this.remainingSeconds = this.currentStory.timeLimit || 60; // default 60s
            }

            this.timerInterval = setInterval(() => {
                this.remainingSeconds--;

                // SAVE EVERY 5 SECONDS (to prevent cheating by refresh)
                if (this.remainingSeconds % 5 === 0) {
                    this.saveQuietly();
                }

                if (this.remainingSeconds <= 0) {
                    this.stopTimer();
                    this.handleTimeUp();
                }
            }, 1000);
        },

        stopTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
        },

        handleTimeUp() {
            this.isTimeUp = true; // show modal
            // We force save 0 seconds
            this.saveQuietly();
        },

        async retryLevel() {
            this.isTimeUp = false;
            this.solvedWords = [];
            this.foundIndices = [];
            this.selectedIndices = [];
            this.remainingSeconds = this.currentStory.timeLimit; // reset time

            // save reset to database
            await FunitikanAPI.saveProgress(
                this.currentUserId,
                this.currentStoryIndex,
                [], [], false, this.remainingSeconds
            );

            this.startTimer();
        },

        // helper to save time without blocking UI
        async saveQuietly() {
            const isCompleted = this.solvedWords.length === Object.keys(this.currentStory.clues).length;
            await FunitikanAPI.saveProgress(
                this.currentUserId,
                this.currentStoryIndex,
                this.solvedWords,
                this.foundIndices,
                isCompleted,
                this.remainingSeconds
            );
        },
    }
}).mount('#app');