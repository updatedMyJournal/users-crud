<script setup>
  const standardValues = ['10', '20', '50', '100'];

  defineProps(['modelValue']);
</script>

<template>
  <div class="container">
    <label for="itemsPerPage">Items per page:</label>
    <select 
      name="itemsPerPage" 
      id="itemsPerPage" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option value="10" selected>10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option v-if="!['10', '20', '50', '100'].includes(modelValue)">
        {{modelValue}}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    gap: 0.5rem;
    padding: 8px;
  }

  select {
    cursor: pointer;
  }
</style>
