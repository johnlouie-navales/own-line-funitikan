const { createApp } = Vue;

createApp({
    data() {
        return {
            currentStoryIndex: 0,
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
        formattedStory() {
            return this.currentStory.text.replace(/\n/g, '<br>');
        },
        gridSize() {
            // if grid is empty, return 0 to prevent crash
            if (!this.currentStory.gridLetters || this.currentStory.gridLetters[0]) return 0;
            // calculate grid width based on the first row of letters
            return this.currentStory.gridLetters[0].length;
        },
        flatGrid() {
            return this.currentStory.gridLetters.flat();
        },
        currentSelectionString() {
            return this.selectedIndices.map(i => this.flatGrid[i]).join('');
        },
        allSolved() {
            return this.solvedWords.length === Object.keys(this.currentStory.clues).length;
        }
    },
    mounted() {
        // check if there is a saved story index
        if (localStorage.getItem('funitikan_story_index')) {
            this.currentStoryIndex = parseInt(localStorage.getItem('funitikan_story_index'));
        }

        // check if the game is finished
        if (localStorage.getItem('funitikan_game_finished')) {
            this.isGameFinished = true;
            this.mode = 'finished';
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
        nextStory() {
            if (this.currentStoryIndex < this.stories.length - 1) {
                this.currentStoryIndex++;
                localStorage.setItem('funitikan_story_index', this.currentStoryIndex);
                this.resetGame(); // call the reset function
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
            this.feedbackMessage = ''
        },
        restartWholeGame() {
            this.currentStoryIndex = 0;
            this.isGameFinished = false;
            localStorage.removeItem('funitikan_story_index');
            localStorage.removeItem('funitikan_game_finished');
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
            // Hide the message automatically after 3 seconds
            setTimeout(() => {
                this.feedbackMessage = '';
            }, 3000);
        },
        checkAnswer() {
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

                this.showFeedback("Tama! Mahusay!", "green");

            } else {
                this.showFeedback("Mali ang sagot! Subukan ulit.", "red");
                this.selectedIndices = [];
            }
        }
    }
}).mount('#app');