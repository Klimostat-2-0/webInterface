<template>
    <footer class="container-fluid">
        <div class="row">
            <div class="col">Klimostat 2.0</div>
            <div class="col">Copyright &copy; 2021</div>
            <a class="col" href="https://klimostat.at/login.html">Our Website</a>
        </div>
        <p></p>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
@import "../styles/main.css";

footer {
    padding-top: 10px;
    text-align: center;
    background: var(--footer-color);
    
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    width:100%;
    height:50px;  
}
a {
    color: #2c3e50;
    text-decoration: none;
}
</style>
