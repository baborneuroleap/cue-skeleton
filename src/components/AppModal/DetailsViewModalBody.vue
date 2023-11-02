<template>
  <div class="details-view-modal">
    <slot></slot>
    <ul v-if="modalData?.lines?.length">
      <li :key="index" v-for="(line, index) in data.lines">
        <span class="label">{{line.label}}</span>
        <span v-if="!line.status" class="value text-break m-0">{{line.value}}</span>
        <span v-else class="value">
          <span class="status-dot" :class="line.status"></span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    modalData: Object,
  },
}
</script>
