<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Test from "@/components/Test.vue"
import Toast from 'primevue/toast'
import AppLoader from "@/components/common/AppLoader.vue";
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const loadingStatus = computed(() => store.getters.get_loading_status)
</script>

<template>
	<AppLoader v-if="loadingStatus"/>
	<Toast position="top-center" class="app-global-toast"/>
  <HelloWorld msg="Vite + Vue" />
  <Test/>
</template>

<style scoped>
</style>
