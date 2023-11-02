<template>
  <div class="delete-disable-modal">
    <div class="d-flex flex-column align-items-center justify-content-center mb-3">
      <p class="font-s-14 font-w-normal text-color mb-2 text-center">{{ modalData?.message }}</p>
      <h3 class="font-s-20 font-w-normal">{{ modalData?.object }}</h3>
    </div>
    <div class="content" v-if="modalData?.lines?.length">
      <ul>
        <li v-for="line in modalData.lines">{{ line.message }}
	        <i class="pi pi-times-circle"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalData: Object,
  },
};
</script>

<style scoped>
ul {
	list-style: none;
}
</style>
