<template>
  <div>
    <h1>Сторінка з постами</h1>
  <my-input
    v-model="searchQuery"
    placeholder="Пошук..."
  />
    <div class="app__btns">
      <my-button @click="showDialog">
        Створити користувача
      </my-button>

       <my-select
          v-model="selectedSort"
          :options="sortOptions"
        />


    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
    :posts="sortedAndSearchedPosts"
     @remove="removePost"
      v-if="!isPostLoading"
      />
    <div v-else>Завантаження...</div>
    <div ref="observer" class="observer">

    </div>
    <!-- <div class="page__wrapper">
      <div
      v-for="pageNumber in totalPage"
      @click="changePage(pageNumber)"
      :key="pageNumber"
      class="page"
      :class="{
        'current_page': page === pageNumber
      }"
      >
      {{pageNumber}}
    </div>
  </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from '@/components/UI/MyButton.vue'
import axios from 'axios'

export default {
  components: {
    PostList,
    PostForm,
    MyButton,
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      modificatorValue: '',
      isPostLoading: false,
      selectedSort:'',
      page:1,
      limit:10,
      totalPage: 0,
      sortOptions: [
        {value:'title', name: 'За назвою'},
        {value:'body', name: 'За змістом'},

      ],
      searchQuery:'',
    }
  },

  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },



    async fetchPosts() {
      try {
        this.isPostLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params:{
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (error) {
        alert('Ошибка')
      } finally {
        this.isPostLoading = false
      }
    },
     async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params:{
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts,...response.data];
      } catch (error) {
        alert('Ошибка')
      }
    },
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer)
    const options = {
    root:document.querySelector('#scrollArea'),
    rootMargin: "0px",
    threshold: 1.0
  }

  const callback = (entries, observer)=>{
  if (entries[0].isIntersecting && this.page < this.totalPage){
   this.loadMorePosts()
  }
};

  const observer = new IntersectionObserver(callback, options);
  observer.observe(this.$refs.observer);
},
  computed: {
sortedPosts(){
  return [...this.posts].sort((post1,post2)=> {
          return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        })
     },

   sortedAndSearchedPosts(){
    return this.sortedPosts.filter(post=>post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
   }
  },
// watch:{
//   page() {
//     this.fetchPosts()
//   }
// }

}
</script>

<style scoped>

</style>