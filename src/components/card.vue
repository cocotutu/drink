<template>
  <span>
    {{text}}
  </span>
</template>

<script>
export default {
  props: ['text'],
  created() {
    console.log(this.text)
  },
}
</script>

<style>

</style>
