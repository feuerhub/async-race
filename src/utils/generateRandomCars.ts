const manufacturers = [
  'Ford',
  'Audi',
  'BMW',
  'Honda',
  'Mercedes',
  'Subaru',
  'Bentley',
  'Porsche',
  'Hyundai',
  'Tesla',
];
const models = [
  'Model S',
  'M3',
  'TT',
  'Mustang',
  'GT',
  'Accent',
  'Camry',
  'Focus',
  'Golf',
  'SLR',
];

export function generateRandomCars(amount: number) {
  const generatedCars = [];
  for (let i = 0; i < amount; i++) {
    generatedCars.push({
      name: getRandom(manufacturers) + ' ' + getRandom(models),
      color: generateRandomHexColor(),
    });
  }
  return generatedCars;
}

function getRandom(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}
function generateRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
