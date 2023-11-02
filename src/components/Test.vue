<template>
  <div>
    <h4>hi</h4>
    <p>{{ this.isValidObject({id: 1}) }}</p>
    <p>{{ this.isValidObject({}) }}</p>
	  
	  <p>ID: {{ objData.id }}</p>
	  <p>Name: {{ objData.name }}</p>
	  
    <Button label="Hide" type="button" @click="showLoader" />

    <Button label="Show" @click="hideLoader" icon="pi pi-check"/>

    <div v-if="!loadingStatus">
      <h5>Not Loading</h5>
    </div>
  </div>
</template>

<script>
import {myUtilFunc} from "@/utils/utils.js";
import {mapGetters} from "vuex";
import AppLoader from "@/components/common/AppLoader";
import Validator from "@/validator"
import Button from 'primevue/button'
import AppModal from "@/components/AppModal/AppModal";

export default {
  name: "Test",
  mounted() {
    myUtilFunc()
  },

  components: {
    Button,
  },

  computed: {
    ...mapGetters({
      loadingStatus: "get_loading_status",
    }),
  },
	
	data() {
		return {
			objData: {
				id: 100,
				name: 'objName'
			}
		}
	},

  methods: {
    showLoader() {
      // Validator.ping()
      // AppLoader.show()
	
	    console.log(this.$toast)
	    this.$toast.add({ severity: 'success', summary: 'Info', detail: 'Message Content', life: 3000 });
    },

    hideLoader() {
      AppLoader.show()
	    setTimeout(() => {
				AppLoader.hide()
	    }, 500)
	
	    AppModal.deleteConfirm({
		    title: 'Delete Supplier',
		    object: "This Is the Supplier 101",
		    message: 'Are you sure you want to delete the following Supplier',
		    modalClass:'modal-small',
		    submitButtonText: 'Delete',
		    cancelButtonText: "Cancel",
		    showAssociatedMessage: true,
		    additionalMessage: "Additional message",
		    skipLineDisplay: true,
		    delete: true,
		    lines: [{message: 'Item 1'}, {message: 'Item 2'}],
		    onSubmit: (_data, close) => {
					alert('confirms')
		    }
	    });
	
	    // AppModal.confirm({
		  //   title: "Remove User",
		  //   message: "Are you sure you want to Remove the following User?",
		  //   modalClass: 'modal-small',
		  //   submitButtonText: 'Remove User',
		  //   onSubmit: (_data, close) => {
			// 		alert('confirmed')
		  //   }
	    // })
	
	    // AppModal.removeConfirm({
		  //   title: 'Remove User',
		  //   message: 'Are you sure you want to Remove the following User?',
		  //   submitButtonText: 'Remove User',
		  //   object: "User 2 Dhaka",
		  //   lines: [{message: 'Item 1'}, {message: 'Item 2'}],
		  //   onSubmit: (_, _close) => {
			// 		alert('confirmed')
			//     _close()
		  //   }
	    // })

      // AppModal.open({
      //   title: "Title",
      //   body: () => import("./Dummy.vue"),
      //   modalClass: 'modal-small account-group-modal',
      //   submitButtonText: "Submit",
      //   data: this.objData,
      //   onSubmit: (_data, _close) => {
      //     console.log('submit modal', _data);
      //     //_close()
      //   },
      //   onClose( ) {
      //     console.log("closed")
      //   }
      // })
    }
  }
}
</script>

<style scoped>

</style>