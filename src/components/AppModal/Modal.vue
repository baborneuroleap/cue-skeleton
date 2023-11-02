<template src="./Modal.html"></template>
<style scoped lang="css" src="./Modal.css"></style>

<script>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { markRaw } from "@vue/reactivity"
import Constants from "@/utils/Constants"

export default {
  name: "AppModal",
  components: {
    Dialog,
    Button,
  },

  created() {
    this.title = this.$attrs.title

    if (this.$attrs.body) {
      this.body = markRaw(this.$attrs.body)
    }
    else {
      this.message = this.$attrs.message
    }
		
    if (this.$attrs.footer) {
      this.footer = markRaw(this.$attrs.footer)
    }

    this.type = this.$attrs.type
	  this.position = this.$attrs.position
    this.modalClass = `${this.$attrs.modalClass}`

    this.titleIcon = this.$attrs.titleIcon

    this.cancelButtonText = this.$attrs.cancelButtonText || this.cancelButtonText
    this.submitButtonText = this.$attrs.submitButtonText || this.submitButtonText

    this.data = this.$attrs.data
    this.hideSubmitButton = this.$attrs.hideSubmitButton || false

    // Trigger Close event on press back button
    window.onpopstate = this.$attrs.onclose
  },

  data() {
    return {
      type: null,
	    position: null,
      loading: false,
      title: "Title",
      body: null,
      footer: null,
      cancelButtonText: "Cancel",
      submitButtonText: "Submit",
      submitButtonDisabled: false,
      message: null,
      data: null,
      customTitleBar: "titleTemplate",
      modalClass: null,
      titleIcon: null,
      hideSubmitButton: false,
      renderComponent: true,
      visible: true,
    }
  },

  mounted() {
    document.body.classList.add('has-open-modal')
  },
	
  unmounted() {
    document.body.classList.remove('has-open-modal')
  },
	
  methods: {
    handleCancel() {
      this.onClose()
      this.$emit("cancel")
    },

    async handleSubmit() {
      const onsubmit = this.$attrs.onsubmit
      let data = this.$attrs.data
      if (this.data?.onSend) {
        const _data = await this.data?.onSend()
	      delete _data?.onSend
        if (_data) {
          data = _data
        }
      }
      if (onsubmit) if (onsubmit) onsubmit(data)
      this.$emit("submit")
    },

    onClose() {
      const onclose = this.$attrs.onclose
      if (onclose) onclose()
    },
	  
	  modalAction(action, val = null, params = {}) {
		  switch (action) {
				case Constants.MODAL_ACTION_DISABLE_SUBMIT_BUTTON:
					this.setSubmitButtonDisabled(true)
				  break
			  case Constants.MODAL_ACTION_ENABLE_SUBMIT_BUTTON:
				  this.setSubmitButtonDisabled(false)
				  break
			  case Constants.MODAL_ACTION_SET_TITLE:
				  this.setTitle(val ?? this.title)
				  break
			  default:
					console.warn(`Did not find any Action named: ${action}, Please provide a valid Action`)
		  }
	  },

    setSubmitButtonDisabled(value) {
      this.submitButtonDisabled = value
    },
	  
    reload() {
      this.renderComponent = false
      this.$nextTick(() => {
        this.renderComponent = true
      });
    },
	  
    setTitle(title) {
      this.title = title
    },
  },
	
	computed: {
		getWidth() {
			if (this.type === "confirm-modal" || this.type === 'dialog-confirm') {
				return '38vw'
			}
			return '50vw'
		},
	},
}
</script>
<style>
.app-dialog .p-dialog-header {
	padding-bottom: 0;
	border-bottom: 1px solid #e8dfdf;
}
.app-dialog .p-dialog-content {
	padding-bottom: 0.5rem;
}
.app-dialog .p-dialog-footer {
	padding-top: 1.5rem;
	border-top: 1px solid #e8dfdf;
}
</style>