// Calculate the final coffee price after validation and discounts.
function calculatePrice(size, quantity, isMember, hour) {
  if (!['small', 'medium', 'large'].includes(size)) return 'Invalid size';  
  if (!Number.isInteger(quantity) || quantity <= 0) return 'Invalid quantity';
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return 'Invalid hour';
  let unitPrice;
  switch (size) {
    case 'small': unitPrice = 2.5; break;
    case 'medium': unitPrice = 3.5; break;
    case 'large': unitPrice = 4.5; break;
  }
  let total = unitPrice * quantity;
  if (quantity >= 5) total *= 0.9;
  if (isMember === true) total *= 0.95;
  if (hour >= 15 && hour <= 17) total -= 1;
  return Math.round(Math.max(0, total) * 100) / 100;
}

// Print prices for quantities from one through ten.
function printPriceTable(size, isMember, hour) {
  for (let quantity = 1; quantity <= 10; quantity++) {
    const price = calculatePrice(size, quantity, isMember, hour);
    console.log(`Qty ${quantity} -> ${typeof price === 'number' ? '$' + price.toFixed(2) : price}`);
  }
}

// Find the earliest hour offering the lowest price.
function cheapestHour(size, quantity, isMember) {
  let bestHour = 0;
  let bestPrice = calculatePrice(size, quantity, isMember, 0);
  if (typeof bestPrice !== 'number') return bestPrice;
  for (let hour = 1; hour < 24; hour++) {
    const price = calculatePrice(size, quantity, isMember, hour);
    if (price < bestPrice) {
      bestPrice = price;
      bestHour = hour;
    }
  }
  return bestHour;
}

console.log('Q1 — Price calculator tests:');
const priceTests = [
  ['large', 2, false, 10], ['medium', 5, true, 16],
  ['small', 4, true, 9], ['small', 1, false, 15],
  ['xl', 1, false, 9], ['large', 0, false, 9],
  ['large', 2.5, true, 9], ['medium', 2, true, 25],
  ['small', 1, false, 0], ['medium', 1, true, 17]
];


priceTests.forEach(args => console.log(`calculatePrice(${JSON.stringify(args)}) =`, calculatePrice(...args)));                            
console.log('\nPrice table (medium, non-member, 16:00):');
printPriceTable('medium', false, 16);
const bestHour = cheapestHour('large', 3, false);
console.log(`The best time to order 3 large coffees is at ${String(bestHour).padStart(2, '0')}:00 for $${calculatePrice('large', 3, false, bestHour).toFixed(2)}.`);
console.log('Extra cheapest-hour tests:', cheapestHour('small', 1, false), cheapestHour('medium', 5, true));
