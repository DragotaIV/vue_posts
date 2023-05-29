<template>
  <div div class="post">
    <div>
      <div><strong>Назва:</strong>{{post.title}}</div>
      <div><strong>Опис:</strong>{{post.body}}</div>
    </div>
    <div class="post__btns">
      <my-button
      @click="$emit('remove', post)"
      >Видалити
      </my-button>

       <my-button
      @click="$emit('remove', post)"
      >Відкрити
      </my-button>
    </div>
  </div>
</template>

<script>


export default {

  props: {
    post: {
      type:Object,
      required:true,
    }
  },

}

</script>

<style>
.post {
margin-top: 15px;
padding: 15px;
margin-bottom: 15px;
border:2px solid teal;
display:flex;
justify-content: space-between;
align-items: center;
}
.post__btns{
  display: flex;
}
</style>