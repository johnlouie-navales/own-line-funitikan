const API_BASE = window.location.origin + '/own-line-funitikan/app/api.php';

const FunitikanAPI = {

    /**
     * Generic Fetch Wrapper to handle JSON parsing and Errors
     */
    async request(endpoint, method = 'GET', body = null) {
        // we use ?e=endpoint to match PHP Router structure
        const url = `${API_BASE}?e=${endpoint}`;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            // The PHP API returns { status: 'success', data: ... }
            if (result.status === 'error') {
                throw new Error(result.message || 'API Error');
            }

            return result.data;
        } catch (error) {
            console.error(`API Request Failed [${endpoint}]:`, error);
            throw error;
        }
    },

    // --- AUTH ---
    login(username) {
        return this.request('login', 'POST', { username });
    },

    // --- GAME PROGRESS ---
    saveProgress(student_id, story_index, solved_words, found_indices, is_completed, time_remaining, answers = null) {
        return this.request('progress', 'POST', {
            student_id: student_id,
            story_index: story_index,
            solved_words: solved_words,
            found_indices: found_indices,
            is_completed: is_completed,
            time_remaining: time_remaining,
            answers: answers
        });
    },

    // MANUAL GRADING
    gradeEssay(progress_id, score) {
        return this.request('grade', 'POST', { progress_id, score });
    },

    // --- GAME STATE (Current Level) ---
    saveState(student_id, current_story_index, is_game_finished) {
        return this.request('state', 'POST', {
            student_id,
            current_story_index,
            is_game_finished
        });
    },

    // --- DASHBOARD ---
    getDashboard() {
        return this.request('dashboard', 'GET');
    }
};