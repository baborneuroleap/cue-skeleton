import { App, createApp, defineAsyncComponent } from "vue"
import PrimeVue from 'primevue/config'
import AppJsMessage from "@/AppJsMessage"
import { getComponent } from "@/utils/utils"

const _window = (window as any);

export default class AppModal {
    private readonly component: any

    constructor(component: any) {
        this.component = component
    }

    submitButton(): ModalButton {
        return new ModalButton('submit', this.component)
    }

    modalBody(): ModalBody {
        return new ModalBody(this.component)
    }

    static instance(component: any): AppModal {
        return new AppModal(component)
    }

    static init(app: App<Element>) {
        if (!_window.$app) {
            _window.$app = app
        }
    }

    static open(options: ModalOptions): ModalRef {
        const div: HTMLElement = document.createElement('div')
        _window?.$app?._container?.appendChild(div)
        const props: any = {
            ...options
        }
        props.titleIcon = "Babor Title Icon"
        delete props.onClose
        delete props.onSubmit

        if (props.body?.constructor?.name === "Function") {
            props.body = defineAsyncComponent(props.body)
        }
        if (props.footer?.constructor?.name === "Function") {
            props.footer = defineAsyncComponent(props.footer)
        }

        const modalComponent = defineAsyncComponent(() => import("./Modal.vue"))
        const modalApp = createApp(modalComponent, props);
        props.onclose = () => {
            modalApp.unmount();
            if (options.onClose) options.onClose()
        };
        props.onsubmit = (data: any) => {
            if (options.onSubmit) options.onSubmit(data, () => modalApp.unmount())
        };

        // using global store to modalApp
        if (_window.$store) {
            modalApp.use(_window.$store)
        }

        // using global mixin to modalApp
        if (_window.$mixin) {
            modalApp.mixin(_window.$mixin)
        }

        modalApp.use(PrimeVue)
        modalApp.mount(div)
        return new ModalRef(div, modalApp)
    }

    static right(options: ModalOptions): ModalRef {
        options.type = 'dialog-right'
        options.position = 'right'
        return AppModal.open(options)
    }

    static left(options: ModalOptions): ModalRef {
        options.type = 'dialog-left'
        options.position = 'left'
        return AppModal.open(options)
    }

    static center(options: ModalOptions): ModalRef {
        return AppModal.open(options)
    }

    static confirm(options: ModalOptions): ModalRef {
        options.type = 'confirm-modal'
        options.modalClass = options.modalClass || 'modal-small'
        return AppModal.open(options)
    }

    static deleteConfirm(options: DeleteConfirmModalOptions): ModalRef {
        options = AppModal.buildLineConfirmOptions(options)
        options.data.delete = !options.hideSubmitButton
        options.cancelButtonText = options.cancelButtonText || 'Close'
        options.submitButtonText = options.submitButtonText || 'Delete'
        options.modalClass = options.modalClass || 'modal-small'
        return AppModal.open(options)
    }

    static removeConfirm(options: DeleteConfirmModalOptions): ModalRef {
        options = AppModal.buildDeleteConfirmOptions(options)
        options.cancelButtonText = options.cancelButtonText || 'Close'
        options.submitButtonText = options.submitButtonText || 'Delete'
        options.modalClass = options.modalClass || 'modal-small'
        return AppModal.open(options)
    }

    static disableConfirm(options: DisableConfirmModalOptions): ModalRef {
        options = AppModal.buildLineConfirmOptions(options)
        options.submitButtonText = options.submitButtonText || AppJsMessage.get('disable')
        options.modalClass = options.modalClass || 'modal-small'
        return AppModal.open(options)
    }

    static defaultConfirm(options: DisableConfirmModalOptions): ModalRef {
        options = AppModal.buildLineConfirmOptions(options)
        options.submitButtonText = options.submitButtonText || AppJsMessage.get('save')
        options.modalClass = options.modalClass || 'modal-small'
        return AppModal.open(options)
    }

    static details(options: DetailsModalOptions): ModalRef {
        options.hideSubmitButton = true
        options.cancelButtonText = AppJsMessage.get('close')
        options.data = {
            lines: options.lines
        }
        options.body = defineAsyncComponent(() => import("./DetailsViewModalBody.vue"))
        return AppModal.open(options)
    }

    static buildLineConfirmOptions(options: LineConfirmModalOptions): LineConfirmModalOptions {
        options.data = {
            object: options.object,
            message: options.message,
            lines: options.lines,
            additionalMessage: options.additionalMessage,
            skipLineDisplay: options.skipLineDisplay,
            showAssociatedMessage: options.showAssociatedMessage ?? true,
            hideSubmitButton: options.hideSubmitButton
        };
        options.body = defineAsyncComponent(() => import("./LineConfirmModalBody.vue"))
        options.type = 'dialog-confirm'
        return options
    }

    static buildDeleteConfirmOptions(options: LineConfirmModalOptions): LineConfirmModalOptions {
        options.data = {
            object: options.object,
            message: options.message,
            lines: options.lines,
            additionalMessage: options.additionalMessage
        };
        options.body = defineAsyncComponent(() => import("./DeleteConfirmModalBody.vue"))
        options.type = 'dialog-confirm'
        return options
    }
}

class ModalButton {

    private readonly modal: any
    private readonly name: string

    constructor(name: string, component: any) {
        this.modal = getComponent(component, "AppModal")
        this.name = name?.toLowerCase()
    }

    disable() {
        this.enableOrDisable(false)
    }

    enable() {
        this.enableOrDisable(true)
    }

    enableOrDisable(value: boolean) {
        const methodName = this.getEnableDisableMethodName();
        if (methodName && this.modal) this.modal[methodName](!value)
    }

    private getEnableDisableMethodName() {
        return this.name ? `set${this.name[0].toUpperCase() + this.name.substring(1)}ButtonDisabled` : null
    }
}

class ModalBody {
    private readonly modal: any

    constructor(component: any) {
        this.modal = getComponent(component, "AppModal")
    }
    reload() {
        this.modal['reload']()
    }
}

interface ModalOptionsCommon {
    message?: string
    title: string
    onClose?: () => void
    onSubmit?: (x: any, close: () => void) => void
    cancelButtonText?: string
    submitButtonText?: string
    hideSubmitButton?: boolean
    modalClass?: string
    titleIcon?: string
}

interface ModalOptions extends ModalOptionsCommon {
    body?: any
    footer?: any
    type?: string
    data?: any
    position?: string
}

interface Line {
    message?: string
    icon?: string
}

interface DetailsLine {
    label?: string
    value?: string
    status?: string
}

interface LineConfirmModalOptions extends ModalOptions {
    object?: string
    lines?: Line[]
    additionalMessage?: string
    skipLineDisplay?: boolean
    showAssociatedMessage?: boolean
}

interface DetailsModalOptions extends ModalOptions {
    lines?: DetailsLine[]
}

interface DeleteConfirmModalOptions extends LineConfirmModalOptions { }

interface DisableConfirmModalOptions extends LineConfirmModalOptions { }

class ModalRef {
    private _modal: App<Element>
    private readonly _host: HTMLElement

    constructor(host: HTMLElement, modal: App<Element>) {
        this._modal = modal
        this._host = host
    }

    close() {
        this._modal.unmount()
    }

    open() {
        this._modal.mount(this._host)
    }
}
