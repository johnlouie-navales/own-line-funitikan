const API_BASE = window.location.origin + '/own-line-funitikan/app/api.php';

const { createApp } = Vue;

createApp({
    data() {
        return {
            mode: 'login',
            username: '',
            password: '',
            errorMsg: '',
            dashboardData: [],
            stories: typeof storiesDB !== 'undefined' ? storiesDB : [],
            refreshInterval: null,

            // Grading Modal State
            isGradingModalOpen: false,
            currentGradeData: null,
            inputScore: 0
        }
    },
    computed: {
        studentStats() {
            if (!this.dashboardData || !this.stories) return [];

            return this.dashboardData.map(student => {
                let totalScore = 0;
                let maxScore = 0;
                let storiesCompleted = 0;
                let details = [];

                this.stories.forEach((story, index) => {
                    const dbStory = student.raw_details.find(d => d.story_index === index);
                    const solvedCount = dbStory ? dbStory.score : 0;
                    const totalClues = story.clues ? Object.keys(story.clues).length : 0;

                    totalScore += solvedCount;
                    maxScore += totalClues;

                    if (dbStory && dbStory.is_completed) storiesCompleted++;

                    details.push({
                        progress_id: dbStory ? dbStory.progress_id : null,
                        title: story.title,
                        score: solvedCount,
                        total: totalClues,
                        percentage: totalClues > 0 ? (solvedCount / totalClues) * 100 : 0,
                        gameType: story.gameType || 'wordsearch',
                        answers: dbStory ? dbStory.answers : null,
                        is_graded: dbStory ? dbStory.is_graded : false,
                        is_completed: dbStory ? dbStory.is_completed : false
                    });
                });

                const totalProgress = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

                return {
                    name: student.name,
                    progress: totalProgress,
                    storiesFinished: storiesCompleted,
                    totalStories: this.stories.length,
                    details: details
                };
            });
        }
    },
    async mounted() {
        // --- AUTO LOGIN CHECK ---
        const savedAdmin = localStorage.getItem('funitikan_admin');
        if (savedAdmin) {
            this.mode = 'dashboard';
            await this.fetchDashboard();
            this.startAutoRefresh();
        }
    },
    methods: {
        async login() {
            if (!this.username || !this.password) {
                this.errorMsg = "Please enter username and password";
                return;
            }

            try {
                const response = await fetch(`${API_BASE}?e=admin_login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: this.username, password: this.password })
                });
                const result = await response.json();

                if (result.status === 'success') {
                    localStorage.setItem('funitikan_admin', 'true');
                    this.mode = 'dashboard';
                    await this.fetchDashboard();
                    this.startAutoRefresh();
                } else {
                    this.errorMsg = result.message || "Login Failed";
                }
            } catch (e) {
                this.errorMsg = "Network Error";
            }
        },
        async fetchDashboard() {
            const response = await fetch(`${API_BASE}?e=dashboard`);
            const result = await response.json();
            if (result.status === 'success') {
                this.dashboardData = result.data;
            }
        },
        startAutoRefresh() {
            // fetch fresh data every 5 seconds silently
            this.refreshInterval = setInterval(async () => {
                if(this.mode === 'dashboard' && !this.isGradingModalOpen) {
                    await this.fetchDashboard();
                }
            }, 5000);
        },
        logout() {
            localStorage.removeItem('funitikan_admin');
            clearInterval(this.refreshInterval);
            this.mode = 'login';
            this.password = '';
        },

        // --- GRADING SYSTEM ---
        openGradingModal(story) {
            this.currentGradeData = story;
            this.inputScore = story.score;
            this.isGradingModalOpen = true;
        },
        closeGradingModal() {
            this.isGradingModalOpen = false;
            this.currentGradeData = null;
        },
        async submitGrade() {
            if(this.inputScore > this.currentGradeData.total || this.inputScore < 0) {
                alert(`Max score is ${this.currentGradeData.total}`); return;
            }
            try {
                const response = await fetch(`${API_BASE}?e=grade`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        progress_id: this.currentGradeData.progress_id,
                        score: this.inputScore
                    })
                });
                const result = await response.json();
                if (result.status === 'success') {
                    this.closeGradingModal();
                    await this.fetchDashboard();
                }
            } catch (e) { alert("Error saving grade."); }
        }
    }
}).mount('#admin-app');