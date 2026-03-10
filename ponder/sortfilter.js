nums = [12, 10, 8, 3];

console.log(nums.sort(compareFn));



const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

let simpleSort = simpleList.sort();

console.log(simpleSort);

let lowerlist = simpleList.map(function(fruit) {
    return  fruit.toLocaleLowerCase();
})

let lowerSort = lowerlist.sort();
console.log(lowerSort);

let searchTerm = 'co';

let filterFruit = lowerSort.filter(searchFruit);

function searchFruit(item) {
    re