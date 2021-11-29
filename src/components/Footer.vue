<template>
    <footer>
        <p>Copyright &copy; 2021</p>
        <router-link to="/about">About us</router-link>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
footer {
    margin-top: 20px;
    text-align: center;
    background: #1a2815;
    
    position:absolute;
    bottom:0;
    width:100%;
    height:100px;   
}
*{
    color: white;
}
</style>
