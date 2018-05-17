<template>
  <div class="warehouse">
    <!-- <span>仓库管理</span><hr> -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      
    }
  },
  
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .warehouse{
    margin: 10px;
  }
  /* .content{
    height: 400px;
  } */
</style>
