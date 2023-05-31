<template>
  <router-view/>
</template>
<script>

export default {
    
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap');
  :root{
    --main-color: #fdfdfd;
    --second-color: #242038;;
  }
  #app{
    background-color: var(--main-color);
    // scroll-behavior: smooth;
  }
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Pathway Gothic One', sans-serif;
  }

</style>
