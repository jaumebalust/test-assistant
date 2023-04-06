
export function shouldGreet(name:string){
    if (!name) throw new Error("No name provided");
    if (typeof name !== "string") throw new Error("Name must be a string");
    return "Hello "+name+"!";
}
