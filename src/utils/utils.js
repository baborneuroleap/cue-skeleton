export const myUtilFunc = () => {
    console.log("util function is called");
}

export const getComponent = (component, name) => {
    if (component) {
        if (component.$options.name === name) return component;
        let parent = component.$parent;
        while (parent) {
            console.log(parent.$options?.name, "Parents ")
            if (parent.$options?.name === name) {
                break;
            }
            parent = parent.$parent;
        }
        debugger
        return parent;
    }
    return null;
}