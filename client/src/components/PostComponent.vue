<template>
  <div class="all">
    <div class="container">    
      <h1>Posts</h1>
      <!-- The form for new posts -->
      <button class="openbtn" v-on:click="openNav()">Create a new post</button>
      <div class="create-posts" ref="create">
        <input type="text" id="createtitle" v-model="title" placeholder="say something"><br />
        <textarea type="text" id="createpost" v-model="post_body" rows="6" cols="30">
        </textarea><br />
        <button v-on:click="createPost" value="Submit">Post</button>
      </div>
      <hr>
      <!-- The Posts start here -->
      <p class="error" v-if="error">{{ error }}</p>
      <div class="post" v-for="post in posts" v-bind:item="post" v-bind:key="post.post_id" v-on:dblclick=deletePost(post.post_id)>
        <div class="post-info">
          {{ post.post_date }} 
          <p class="text">{{ post.author }} </p>        
        </div> 
        <div class="main-body">    
          <div class="message">    
            <p class="text">{{ post.title }}</p>
            <p class="text">{{ post.post_body }}</p>
          </div>
          <div class="tags">
            Tags: {{ post.tags.tags }}
          </div>
        </div>           
      </div>     
    </div>
    <div class="all-tags">
      <h4>Tags:</h4>
      <p ref="mytags"> </p>
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
      title: '',
      post_body: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
      console.log(this.posts);
      this.setTags();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    openNav() {   /* Show the create post form */
      if (this.$refs.create.style.height == "250px"){
        this.$refs.create.style.height = "0px";
      } else {
        this.$refs.create.style.height = "250px";
      }  
    },
    setTags() {
      var tagValues = this.posts.map( (value) => value.tags.tags).filter( (value, index, _arr) => _arr.indexOf(value) == index);
      console.log(tagValues);
      this.$refs.mytags.innerHTML = tagValues.toString();
    },
    async createPost() {
      await PostService.insertPost(this.title, this.post_body);
      this.posts = await PostService.getPosts();
      this.title = "";   // clears the input field after posting
      this.post_body = "";
      this.openNav();
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
    div.all {
      width: 1000px;
      margin: 0 auto; 
    }

    div.container { 
      max-width: 800px; 
      margin: 0 auto; 
      background-color: #fff;
      float: left;
    }
     
    div.create-posts {       
      height: 0px;
      overflow-y: hidden; /* Disable horizontal scroll */
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
      height: 100px;
    }

    div.main-body { 
      width: 75%; 
      float: left;
      border-left: 1px solid #5bd658; 
    }

    div.post-info {
      width: 24%;
      float: left;      
    }

    p.title { 
      font-size: 22px; 
      font-weight: 700; 
      margin-bottom: 0; 
    }
    #createtitle {
      width: 300px;
    }
    #createpost {
      width: 300px;
    }
    .message {
      height: calc(100px - 10px);
    }
    .tags {
      font-size: 80%;
      height: 10px;      
    }

    div.all-tags {
      width: 190px;
      float: left;
      border: 1px solid black;
    }
</style>
