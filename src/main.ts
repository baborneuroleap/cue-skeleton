import { createApp } from 'vue'
import {createStore} from "vuex";
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import '@/style.css'
import '@/assets/main.css'
import App from '@/App.vue'
import Application from '@/store/Application'
import AppStore from "@/store/AppStore";
import config, {testValue} from "@/config.js"
import AppModal from "@/components/AppModal/AppModal";

console.log(testValue)
// Vuex Stores
const store = createStore({
    modules: {
        Application,
    }
})

AppStore.init(store)

const app = createApp(App)
app.use(PrimeVue)
app.use(ToastService)
app.use(store as any)

AppModal.init(app)

const $window = window as any;

const $mixin = {
    methods: {
        apiURL: function () {
            return config.baseUrl
        },
        isValidNumberType: function (o: any) {
            return Object.prototype.toString.call(o) === "[object Number]";
        },
        isValidStringType: function (o: any) {
            return Object.prototype.toString.call(o) === "[object String]";
        },
        isValidString: function (o: any) {
            return this.isValidStringType(o) && o.trim().length > 0;
        },
        isValidDate: function (o: any) {
            return Object.prototype.toString.call(o) === "[object Date]";
        },
        isValidObjectType: function (o: any) {
            return Object.prototype.toString.call(o) === "[object Object]";
        },
        isValidObject: function (o: any) {
            return this.isValidObjectType(o) && Object.keys(o).length > 0;
        },
        isValidArrayType(o: any) {
            return Object.prototype.toString.call(o) === "[object Array]";
        },
        isValidArray(o: any) {
            return this.isValidArrayType(o) && o.length > 0;
        },
    }
}

$window.$mixin = $mixin;
app.mixin($mixin);

app.mount('#app');