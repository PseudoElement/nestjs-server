export function omitProp<T, K extends keyof T>(omit: K | K[], obj: T): Omit<T, K> {
    if (Array.isArray(omit)) {
        omit.forEach((prop) => {
            delete obj[prop];
        });
        return obj;
    }
    const { [omit]: omitted, ...rest } = obj;
    return rest;
}
