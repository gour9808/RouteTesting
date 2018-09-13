export const ON_DESTROY_SYMBOL = Symbol();

export function repeat(): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        let timer;
        console.log('Function called', target);
        descriptor.value = (...args) => {
            timer = setInterval( () =>  {
                console.log(target.constructor[originalMethod]);
                originalMethod.apply(target, args);
            }, 3000);
        };
        target[ON_DESTROY_SYMBOL] = target.ngOnDestroy;
        target.ngOnDestroy = () => {
            this[ON_DESTROY_SYMBOL]();
            clearInterval(timer);
            console.log('Component destroy event successfully handled!');
        };
        return descriptor;
    };
}
