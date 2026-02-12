const { createApp } = Vue;

createApp({
    data() {
        return {
            // User Session
            currentUser: null,
            currentUserId: null, // We need this for the Database ID
            inputUsername: '',   // For the login form input
            savedUsers: [],      // Optional: If you want to show a "Quick Login" list from DB later

            // App State
            currentStoryIndex: 0,
            currentSceneIndex: 0,
            stories: storiesDB,
            mode: 'login', // Start at Login screen now

            // Game State
            selectedIndices: [],
            solvedWords: [],
            foundIndices: [],
            feedbackMessage: '',
            feedbackColor: '',
            isGameFinished: false,

            // Dashboard Data
            dashboardData: []
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
                // Call our new API
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
                        this.currentSceneIndex = 0; // Always start story from beginning
                        this.solvedWords = data.solved_words || [];
                        this.foundIndices = data.found_indices || [];
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

                // Save New State to DB
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

            // Reset DB State to 0
            await FunitikanAPI.saveState(this.currentUserId, 0, false);

            this.resetGame();
        },
        startGame() {
            this.mode = 'game';
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
                const isCompleted = this.solvedWords.length === totalClues;
                await FunitikanAPI.saveProgress(
                    this.currentUserId,
                    this.currentStoryIndex,
                    this.solvedWords,
                    this.foundIndices,
                    isCompleted
                );
                if (isCompleted) {
                    if (this.currentStoryIndex === this.stories.length - 1) {
                        this.showFeedback("Tama! Natapos mo na ang laro!", "green");
                        setTimeout(async () => {
                            this.isGameFinished = true;
                            this.mode = 'finished';
                            // Save Final State
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
        }
    }
}).mount('#app');