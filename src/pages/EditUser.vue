<template>
<div id="user-detail-wrapper">
  <div class="shadow-box">
    <h1>Edit User {{ username }}</h1>
    <p>User ID: {{userId}}</p>
    <form id="edit-user-form" @submit.prevent="onClick">
      <div class="form-floating mb-3">
        <input class="form-control" v-model="username" type="text" name="username" placeholder="Username" required/>
        <label class="form-floating mb-4">Username: </label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" v-model="email" type="email" name="email" placeholder="Email" required/>
        <label class="form-floating mb-4">Email: </label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" v-model="role" name="role" id="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        <label class="form-floating mb-4">Role: </label>
      </div>
      <p :style="{ color: msgColor}" class="userMsg" v-if="successMsg != null">{{successMsg}}</p>
      <input class="custom-btn" type="submit" value="Apply" />
    </form>
  </div>
</div>
</template>

<script>
import dataService from '../services/dataService'
  export default {

  name: 'Edit User',
  components: {
    
  },
  methods: {
    async onClick(e) {
      try{
        const res = await dataService.patchUser(this.userId, this.username, this.email, this.role)
        if(res.status != 200) {
          this.msgColor="red"
          this.successMsg="There was an error while updating the user"
          return
        }
        this.msgColor="green"
        this.successMsg="You successfully updated the user"
      } catch(err) {
        console.log(err)
        this.$store.dispatch('redirectError')
      }
    }
  },
  data() {
    return {
      userId: '',
      username: '',
      email: '',
      role: '',
      secondPassword: '',
      successMsg: null,
      msgColor: "green",
      isFetching: true
    }
  },
  async created() {
      this.userId = this.$route.params.id
      try{
        const res = await dataService.getUser(this.userId)
        if(res.status != 200) {
          this.$store.dispatch('redirectError')
          return
        }
        this.username = res.data.name
        this.email = res.data.email
        this.role = res.data.role
      } catch(err){
        console.log(err)
        this.$store.dispatch('redirectError')
      }
  }
}
</script>

<style scoped>
@import "../styles/editUser.css";
</style>