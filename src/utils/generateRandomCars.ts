const manufacturers = ['Ford', 'Audi', 'BMW', 'Honda', 'Mercedes', 'Subaru', 'Bentley', 'Porsche', 'Hyundai', 'Tesla']; 
const models = ['Model S', 'M3', 'TT', 'Mustang', 'GT', 'Accent', 'Camry', 'Focus', 'Golf', 'SLR']; 
const colors = ['black', 'red', 'green', 'blue', 'yellow', 'white', 'pink', 'gray', 'brown', 'violet']; 
 
export function generateRandomCars(amount: number) { 
    const generatedCars = []; 
    for (let i = 0; i < amount; i++) { 
        generatedCars.push({ 
            name: getRandom(manufacturers) + ' ' + getRandom(models), 
            color: getRandom(colors) 
        }) 
    } 
    return generatedCars; 
} 
 
function getRandom(array: string[]) { 
    return array[Math.floor(Math.random() * array.length)]; 
} 
 
console.log(generateRandomCars(5))