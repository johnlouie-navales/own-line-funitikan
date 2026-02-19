const API_BASE = window.location.origin + '/own-line-funitikan/app/api.php';

const { createApp } = Vue;

createApp({
    data() {
        return {
            mode: 'login', // 'login' or 'dashboard'
            username: '',
            password: '',
            errorMsg: '',
            dashboardData: [],
            stories: [] // We need to fetch stories to render the table headers correctly
        }
    },
    computed: {
        // Same logic as student app to calculate progress
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
                    // Note: In the admin view, we might not have the full clues object if we don't load storiesDB.
                    // Ideally, we load storiesDB here too.
                    const totalClues = story.clues ? Object.keys(story.clues).length : 0;

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
        // Load Stories for reference (Titles, Clue counts)
        if (typeof storiesDB !== 'undefined') {
            this.stories = storiesDB;
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
                    this.mode = 'dashboard';
                    this.fetchDashboard();
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
        logout() {
            this.mode = 'login';
            this.username = '';
            this.password = '';
            this.dashboardData = [];
        }
    }
}).mount('#admin-app');