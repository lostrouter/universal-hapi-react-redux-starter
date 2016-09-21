export default function spread() {
    const props = [];
    for (const prop in this) {
        props.push(`${prop}='${this[prop]}'`);
    }

    return props.join(' ');
}
