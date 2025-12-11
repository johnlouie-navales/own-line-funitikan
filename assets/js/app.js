const { createApp } = Vue;

createApp({
    data() {
        return {
            currentStoryIndex: 0,
            currentSceneIndex: 0,
            stories: storiesDB,
            mode: 'story',
            selectedIndices: [],
            solvedWords: [],
            foundIndices: [],
            feedbackMessage: '',
            feedbackColor: '',
            isGameFinished: false
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
        }
    },
    mounted() {
        const savedIndex = localStorage.getItem('funitikan_story_index');
        if (savedIndex) this.currentStoryIndex = parseInt(savedIndex);

        if (localStorage.getItem('funitikan_game_finished')) {
            this.isGameFinished = true;
            this.mode = 'finished';
        } else {
            this.mode = 'story';

            this.currentSceneIndex = 0;

            const savedSolved = localStorage.getItem(`funitikan_solved_${this.currentStoryIndex}`);
            const savedIndices = localStorage.getItem(`funitikan_indices_${this.currentStoryIndex}`);

            if (savedSolved) this.solvedWords = JSON.parse(savedSolved);
            if (savedIndices) this.foundIndices = JSON.parse(savedIndices);
        }
    },
    methods: {
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
        nextStory() {
            localStorage.removeItem(`funitikan_solved_${this.currentStoryIndex}`);
            localStorage.removeItem(`funitikan_indices_${this.currentStoryIndex}`);

            if (this.currentStoryIndex < this.stories.length - 1) {
                this.currentStoryIndex++;
                localStorage.setItem('funitikan_story_index', this.currentStoryIndex);
                this.resetGame();
            } else {
                this.isGameFinished = true;
                this.mode = 'finished';
                localStorage.setItem('funitikan_game_finished', 'true');
            }
        },
        resetGame() {
            this.mode = 'story';
            this.selectedIndices = [];
            this.solvedWords = [];
            this.foundIndices = [];
            this.feedbackMessage = '';
            localStorage.removeItem(`funitikan_solved_${this.currentStoryIndex}`);
            localStorage.removeItem(`funitikan_indices_${this.currentStoryIndex}`);
        },
        restartWholeGame() {
            this.currentStoryIndex = 0;
            this.isGameFinished = false;
            localStorage.removeItem('funitikan_story_index');
            localStorage.removeItem('funitikan_game_finished');
            for (let i = 0; i < this.stories.length; i++) {
                localStorage.removeItem(`funitikan_solved_${i}`);
                localStorage.removeItem(`funitikan_indices_${i}`);
            }
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
        checkAnswer() {
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
                localStorage.setItem(`funitikan_solved_${this.currentStoryIndex}`, JSON.stringify(this.solvedWords));
                localStorage.setItem(`funitikan_indices_${this.currentStoryIndex}`, JSON.stringify(this.foundIndices));
                this.selectedIndices = [];
                this.showFeedback("Tama! Mahusay!", "green");
            } else {
                this.showFeedback("Mali ang sagot! Subukan ulit.", "red");
                this.selectedIndices = [];
            }
        }
    }
}).mount('#app');