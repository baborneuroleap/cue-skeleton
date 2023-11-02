<template>
	<div>
	  <h4>DUMMY MODAL</h4>
		<Button label="Disable Submit Button" @click="disableModalSubmitButton"/>
		<Button label="Enable Submit Button" @click="enableModalSubmitButton"/>
		<span>{{ this.isValidObject({}) }}</span>
		<p>{{ loadingStatus }}</p>
	</div>
	
</template>

<script>
import Button from 'primevue/button'
import AppModal from "./AppModal/AppModal"
import Constants from "@/utils/Constants"
import AppLoader from "@/components/common/AppLoader"
import {mapGetters} from "vuex";

export default {
  name: "Dummy",
	components: {
		Button,
	},
	props: {
		modalData: Object,
		modalAction: Function,
	},
	computed: {
		...mapGetters({
			loadingStatus: "get_loading_status",
		}),
	},
	mounted() {
		console.log(this)
		this.modalData.onSend = () => {
			this.modalData.id = 4001
			this.modalData.name = "name 4001"
			return this.modalData
			//return {...this.modalData, updatedField: 'this field added from the modal'}
		}
	},
	methods: {
		disableModalSubmitButton() {
			AppLoader.show()
			this.modalAction(Constants.MODAL_ACTION_DISABLE_SUBMIT_BUTTON)
			this.modalAction(Constants.MODAL_ACTION_SET_TITLE, "Disabled Submit Button")
			//AppModal.instance(this).submitButton().disable()
		},
		enableModalSubmitButton() {
			AppLoader.hide()
			this.modalAction(Constants.MODAL_ACTION_SET_TITLE, "Enabled Submit Button")
			this.modalAction(Constants.MODAL_ACTION_ENABLE_SUBMIT_BUTTON)
			//AppModal.instance(this).submitButton().enable()
		}
	}
}
</script>

<style scoped>
h4 {
	color: darkgreen;
}
</style>