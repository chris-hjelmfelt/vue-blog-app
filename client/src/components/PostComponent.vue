<template>
  <div class="container">
    <h1>Posts</h1>
    <div class="create-posts">
      <label for="create-posts">Create a new post</label><br />
      <input type="text" id="createpost" v-model="text" placeholder="say something">
      <button v-on:click="createPost" value="Submit">Post</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-continer"></div>
    <div class="post" v-for="post in posts" v-bind:item="post" v-bind:key="post._id" v-on:dblclick=deletePost(post._id)>
      {{ post.createdAt.getMonth()+1 }} / {{ post.createdAt.getDate() }} / {{ post.createdAt.getFullYear() }}
      <p class="text">{{ post.text }}</p>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
    },
     async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.container { 
      max-width: 800px; 
      margin: 0 auto; 
    }

    p.error { 
      border: 1px solid #ff5b5f; 
      background-color: #ffc5c1; 
      padding: 10px; 
      margin-bottom: 15px; 
    }

    div.post { 
      position: relative; 
      border: 1px solid #5bd658; 
      padding: 10px 10px 30px 10px; 
      margin-bottom: 15px; 
    }

    p.text { 
      font-size: 22px; 
      font-weight: 700; 
      margin-bottom: 0; 
    }
    #createpost {
      width: 300px;
    }
</style>
