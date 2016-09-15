export default function spread() {
    var props = [];
    for (var prop in this) {
        props.push(`${prop}='${this[prop]}'`);
    }

    return props.join(' ');
}
