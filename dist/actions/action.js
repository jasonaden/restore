export function action(type, suffix, payload) {
    return { type: `${type}_${suffix}`, payload };
}
