<template>
<div class="user">
    <h3>{{username}}</h3>
    <div>
    Email: {{email}}
    <br>
    Role {{role}}
    </div>
    <i class="icon" :class="'fas fa-trash-alt'" />
</div>
</template>

<script>

export default ({
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
}
</style>
