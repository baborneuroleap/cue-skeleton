/**
 * Created by Babor on Jun 01, 2023.
 */

import AppStore from "@/store/AppStore"

export default class AppLoader {
    static show(): void {
        AppStore.setLoader(true)
    }

    static hide(): void {
        AppStore.setLoader(false)
    }
}
