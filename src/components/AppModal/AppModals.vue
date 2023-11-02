<!--
  important class
  ===============
  .dialog-right
  .dialog-confirm
  .dialog-height-auto
-->
<template>
  <div>
    <span v-if="!visibleDialog">
        <k-button @click="toggleDialog">Dialog / Modal</k-button>
    </span>
    <k-dialog
        v-if="visibleDialog"
        :title-render="customTitleBar"
        :class="'dialog-confirm'"
        @close="toggleDialog">
      <template v-slot:myTemplate="{props, listeners}">
        <div class="confirm-title">
          <span class="k-icon k-i-info" />
          <h3>Are you sure you want to delete the following designation?</h3>
        </div>
      </template>
      <div class="content-inner">
        <div class="confirm-header border-bottom mb-3">
          <h3 class="font-s-19 font-w-normal text-color">CEO</h3>
          <p class="font-s-14 font-w-normal text-color">All data associated with CEO will be removed</p>
        </div>
        <div class="content">
          <ul>
            <li><span class="k-icon k-i-info" />  CEO is used in 1 Contact</li>
          </ul>
        </div>
      </div>
      <dialog-actions-bar>
        <k-button @click='toggleDialog'>Cancel</k-button>
        <k-button :theme-color="'primary'" @click='toggleDialog'>Save</k-button>
      </dialog-actions-bar>
    </k-dialog>
  </div>
</template>

<script>
import {Dialog, DialogActionsBar} from "@progress/kendo-vue-dialogs";
import {Button} from "@progress/kendo-vue-buttons";

export default {
  name: "AppModals",
  components: {
    'k-dialog': Dialog,
    'dialog-actions-bar': DialogActionsBar,
    'k-button': Button,
  },
  data: function () {
    return {
      visibleDialog: false,
      customTitleBar: 'myTemplate'
    }
  },
  methods: {
    toggleDialog() {
      this.visibleDialog = !this.visibleDialog;
    }
  }
}
</script>

<style scoped>

</style>
