export default class ArrayUtils {
    static caseInsensitiveFilterArray(array, value) {
        return array.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    }
}