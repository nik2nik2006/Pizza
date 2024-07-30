export const calcTotalPrice = (items: any) => {
    return items.reduce((sum: any, obj: any) => {
        return obj.price * obj.count + sum;
    }, 0);
}