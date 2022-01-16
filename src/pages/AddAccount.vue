<template>
  <h1>Add User</h1>
  <form @submit.prevent="onClick">
    <div class="form-floating mb-3">
      <input class="form-control" v-model="username" type="text" name="username" placeholder="Username" required/>
      <label class="form-floating mb-4">Username: </label>
    </div>
    <div class="form-floating mb-3">
      <input class="form-control" v-model="email" type="email" name="email" placeholder="Email" required/>
      <label class="form-floating mb-4">Email: </label>
    </div>
    <div class="form-floating mb-3">
      <input class="form-control" v-model="password" type="password" name="password" placeholder="Password" required/>
      <label class="form-floating mb-4">Passwort: </label>
    </div>
    <div class="form-floating mb-3">
      <input class="form-control" v-model="secondPassword" type="password" name="password" placeholder="Password" required/>
      <label class="form-floating mb-4">Repeat password: </label>
    </div>
    <p :style="{ color: msgColor}" class="userMsg" v-if="successMsg != null">{{successMsg}}</p>
    <input class="custom-btn w-25" type="submit" value="Create" />
  </form>
  <hr>
  <h1>All Users</h1>
  <div id="flexbox" v-if="!isFetching">
    <user @delete-user="deleteUser" :key="user.id" v-for="user in users" :username="user.name" :email="user.email" :role="user.role" :userId="user.id"/>
  </div>
</template>

<script>
import dataService from '../services/dataService'
import User from '../components/User'
  export default {

  name: 'AddAccount',
  components: {
    User
  },
  methods: {
    async deleteUser(id) {
      try{
        const res = await dataService.deleteUser(id)
        if(res.status != 200 && res.status != 204 ) {
          this.$store.dispatch('redirectError')
          return
        }
        this.users = this.users.filter((user) => user.id != id)
      } catch{
        console.log(err)
        this.$store.dispatch('redirectError')
      }
    },
    async onClick(e) {
      if (this.password == this.secondPassword && this.password.length >= 8 && /\d/.test(this.password) && /\w/.test(this.password)) {
        try{
          const res = await dataService.createUser(this.username, this.email, this.password)
          if(res.status != 201) {
            this.msgColor = "red"
            this.successMsg = "There was an error while creating the user"
          } else {
            this.msgColor = "green"
            this.successMsg = "You Successfully created a new user"
            this.users.push(res.data.user)
          }
        } catch(err){
          console.log(err)
          this.msgColor = "red"
          this.successMsg = "There was an error while creating the user"
        }
      } else {
        this.msgColor = "red"
        this.successMsg = "The password has to be at least 8 characters long and contain numbers and letters"
      }
      e.target.reset()
      this.username = ''
      this.email = ''
      this.password = ''
      this.secondPassword = ''
      setTimeout(() => this.successMsg = null, 7000)
    }
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      secondPassword: '',
      successMsg: null,
      msgColor: "green",
      users: [],
      isFetching: true
    }
  },
  async created() {
    try{
      const res = await dataService.getAllUsers()
      if(res.status != 200){
        this.$store.dispatch('redirectError')
      }
      this.users = res.data.results
      this.isFetching = false
    } catch(err){
      console.log(err)
      this.$store.dispatch('redirectError')
    }
  }
}
</script>

<style scoped>
h1{
    margin-bottom: 50px;
}
div {
    margin-top: 10px;
    margin-bottom: 10px;
}
.createButton {
  background-color: #1a2815;
  border: none;
  color: #dbff78;
  padding: 5px 20px;
  display: inline-block;
  font-size: 16px;
  margin-top: 30px;
}
.error {
  font-size: 14px;
  color: red;
}
.formElement {
  display: inline-block;
  width: 200px;
  text-align: left;
  margin: 0%;
}
#flexbox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>