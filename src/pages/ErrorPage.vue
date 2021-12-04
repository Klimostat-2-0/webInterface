<template>
    <div>
        <h1>There has been an Error</h1>
        <p>{{msg}}</p>
    </div>
</template>

<script>
  export default {
  name: 'ErrorPage',
  components: {
  },
  data(){
      return {
          msg: this.ErrorMsg
      }
  },
  props: {
      ErrorMsg: {
          type: String ,
          default: "There was an Error while rquesting the Data."
      } 
  }
}
</script>

<style scoped>
p {
    width: 70%;
    display: inline-block;
}
</style>