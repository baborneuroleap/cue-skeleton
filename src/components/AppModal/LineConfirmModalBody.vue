<template>
  <div class="delete-disable-modal line-confirm">
    <div class="d-flex flex-column align-items-center justify-content-center">
      <p class="font-s-16 font-w-normal text-color mb-2">{{ modalData?.message }}</p>
      <slot></slot>
      <h3 class="font-s-20 font-w-normal mb-0" v-if="modalData?.object">{{ modalData?.object }}</h3>
      <p class="font-s-14 font-w-normal mt-3 text-color text-center"
         v-if="modalData?.object && modalData?.delete && modalData?.showAssociatedMessage">
	      {{ 'All data associated with this user will be removed ' + [modalData?.object] }}</p>
      <p class="font-s-14 font-w-normal mt-3 text-color"
         v-if="modalData?.additionalMessage">{{ modalData?.additionalMessage }}</p>
    </div>
    <div class="content mt-4">
      <div v-if="modalData?.lines?.length && modalData?.skipLineDisplay">
        <div class="d-flex align-items-center justify-content-center" :key="index" v-for="(line, index) in modalData.lines">
          {{ line.message }}
	        <i class="pi pi-check" v-if="!line.hideWarningIcon && !isHideSubmitButton" style="font-size: 1rem"></i>
	        <i class="pi pi-times-circle" v-if="isHideSubmitButton && !line.hideWarningIcon" style="font-size: 1rem"></i>
        </div>
      </div>
      <ul v-else-if="modalData?.lines?.length">
        <li :key="index" v-for="(line, index) in modalData.lines">
          {{ line.message }}
	        <i class="pi pi-check" v-if="!line.hideWarningIcon && !isHideSubmitButton" style="font-size: 1rem"></i>
	        <i class="pi pi-times-circle" v-if="isHideSubmitButton && !line.hideWarningIcon" style="font-size: 1rem"></i>
        </li>
      </ul>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    modalData: Object,
  },
  computed:{
    isHideSubmitButton() {
      return this.modalData.hideSubmitButton
    }
  }
};
</script>

<style scoped>
ul {
	list-style: none;
}
</style>
