export default class Validator {
    static pattern = new RegExp("^[\\w\\-\\'\\.\\+\\ ]+$")

    static isCode(s) {
        return Validator.pattern.test(s)
    }

    static ping(s='') {
        console.log(`Pong ${s}`)
        return "Pong"
    }
}
