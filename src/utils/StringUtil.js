export default class StringUtil {
    static convertWildcardStringToRegExp(expression) {
        const wildCardExpression = expression.replace(new RegExp('\\*', 'g'), '.*');
        return new RegExp('^' + wildCardExpression + '$', 'i');
    }

    static escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}