<template>
  <div class="p-4">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue-demi';

  let message = ref('Hello stylelint');
</script>
