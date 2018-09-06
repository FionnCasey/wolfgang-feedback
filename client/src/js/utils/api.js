class Api {
  constructor() {
    this.url = '';
  }

  makeRequest = async ({ endpoint, payload }) => {
    try {
      const res = await fetch(`${this.url}${endpoint}`, payload);
      return await res.json();
    } catch(err) {
      console.log(err);
    }
  };

  login = data => {
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

  signup = data => {
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

  fetchPosts = token => {
    return this.makeRequest({
      endpoint: '/api/posts',
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  fetchPost = (post_id, token) => {
    return this.makeRequest({
      endpoint: `/api/posts/${post_id}`,
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  fetchPostComments = (post_id, token) => {
    return this.makeRequest({
      endpoint: `/api/comments/${post_id}`,
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }
    });
  };

  createPost = (data, token) => {
    return this.makeRequest({
      endpoint: '/api/posts/',
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
  
  createComment = (data, token) => {
    return this.makeRequest({
			endpoint: '/api/comments',
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
