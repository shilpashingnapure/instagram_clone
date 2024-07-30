export function debounce(func , deley){
    let timeoutId;

    return function (...args) {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this , args);
        } , deley);
    }
}