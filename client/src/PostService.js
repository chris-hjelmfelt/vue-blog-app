import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService {
  // Get Posts
  static getPosts() {   // static allows it to be used directly without instanciating anything
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdat)
          })
        ));
      } catch(err) {
        reject(err);
      }
    });
  }

  // Add Post
  static insertPost(title, post_body) {
    return axios.post(url, {title, post_body});
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }

}


export default PostService;