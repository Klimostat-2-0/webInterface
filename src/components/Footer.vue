<template>
    <footer>
        <p>Copyright &copy; 2021</p>
        <a href="/about">About us</a>
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
    color: white;
    position:absolute;
    bottom:0;
    width:100%;
    height:100px;   
}
a {
    color: white;
}
</style>
