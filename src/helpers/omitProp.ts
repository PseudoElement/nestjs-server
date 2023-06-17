export function omitProp<T, K extends keyof T>(prop: K, obj: T): Omit<T, K>{
    const {[prop]: omitted, ...rest} = obj; 
    return rest;
}