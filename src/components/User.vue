<template>
<div class="user">
    <h3>{{username}}</h3>
    <div>
    Email: {{email}}
    <br>
    Role: {{role}}
    </div>
    <div class="icon" v-on:click="deleteUser">
        <i :class="'fas fa-trash-alt'" />
    </div>
</div>
</template>

<script>

export default ({
    methods: {
        deleteUser(){
            this.$emit('delete-user', this.userId)
        }
    },
    props: {
      username: {
          type: String,
          default: "None"
      },
      email: {
          type: String,
          default: "None"
      },
      role: {
          type: String,
          default: "user"
      },
      userId: {
          type: String
      }
    },
})
</script>

<style scoped>
.user{
    display: flex;
    gap: 30px;
    text-align: left;
    align-items: center;
    background-color: rgb(200,200,200);
    border-radius: 25px;
    padding: 20px;
    width: 40%;
}
.icon{
    color: red;
    margin-left: auto;
    margin-right: 20px;
    font-size: 20px;
    border-radius: 5px;
    padding: 10px;
}

.icon:hover{
    background-color: rgba(100,100,100,0.5);
}
</style>
