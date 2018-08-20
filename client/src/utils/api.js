class Api {
	constructor() {
		this.url = '';
	}

	makeRequest = ({ endpoint, payload }) => {
		return new Promise((resolve, reject) => {
			fetch(`${this.url}${endpoint}`, payload)
			.then(res => {
				res.json().then(json => {
					if (!json.success) reject(json.message);
					resolve(json.data);
				});
			})
			.catch(err => reject(console.error(err)));
		});
	};

	fetchPosts = ({ token }) => {
		return this.makeRequest({
			endpoint: '/api/posts',
			payload: {
				method: 'GET',
				headers: {
					token
				}
			}
		});
	};

	fetchPost = (id, { token }) => {
		return this.makeRequest({
			endpoint: `/api/posts/${id}`,
			payload: {
				method: 'GET',
				headers: {
					token
				}
			}
		});
	};

	loginUser = data => {
		return this.makeRequest({
			endpoint: '/login',
			payload: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}
		});
	};

	signupUser = data => {
		return this.makeRequest({
			endpoint: '/signup',
			payload: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}
		});
	};

	submitVote = (data, token) => {
		return this.makeRequest({
			endpoint: '/api/votes',
			payload: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token
				},
				body: JSON.stringify(data)
			}
		});
	};

	createPost = (data, token) => {
		return this.makeRequest({
			endpoint: '/api/posts',
			payload: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token
				},
				body: JSON.stringify(data)
			}
		});
	};
}

const api = new Api();
export default api;
