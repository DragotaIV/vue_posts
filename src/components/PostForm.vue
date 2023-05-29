
<template>
<form class="form" @submit.prevent>
  <h3>Створити пост</h3>
  <my-input
    v-model="post.title"
    @input="post.title = $event.target.value"
    type="text"
    placeholder="Назва"
    />
  <my-input
    v-model="post.body"
    @input="post.body = $event.target.value"
    type="text"
    placeholder="Опис"
    />
  <my-button
    class="btn"
    style="align-self: flex-end; margin-top: 15px;"
    @click="createPost"
    >
    Створити
    </my-button>
</form>

</template>

<script>

export default {

  data(){
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },

  methods: {
    createPost(createPost){
    this.post.id = Date.now(),
    this.$emit('create', this.post)
    this.post = {
      title: '',
      body: '',
    }
   }
  },

}

</script>

<style>
.form{
  display:flex;
  flex-direction: column;
  margin-bottom: 15px;
}

</style>
