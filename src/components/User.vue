<template>
<div class="user-box">
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h3>{{username}}</h3>
            </div>
            <div class="col">
            Email: {{email}}
            <br>
            Role: {{role}}
            </div>
            <div class="col-md-2">
                <div class="edit-icon user-list-icon" v-on:click="editUser">
                    <i :class="'fas fa-user-edit'" />
                </div>
                <div class="icon user-list-icon" v-on:click="deleteUser">
                    <i :class="'fas fa-trash-alt'" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default ({
    methods: {
        deleteUser(){
            if (confirm("Are you sure?")) {
                this.$emit('delete-user', this.userId)
            }
            
        },
        editUser(){
            this.$emit('edit-user', this.userId)
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
@import "../styles/user.css";
</style>
