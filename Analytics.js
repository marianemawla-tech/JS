const orders = [
  { id: 1, customer: 'Rami', items: ['latte', 'croissant'], total: 7.5 },
  { id: 2, customer: 'Lea', items: ['espresso'], total: 3.0 },
  { id: 3, customer: 'Rami', items: ['latte', 'muffin'], total: 8.0 },
  { id: 4, customer: 'Karim', items: ['mocha', 'croissant'], total: 9.0 },
  { id: 5, customer: 'Lea', items: ['latte'], total: 4.5 },
  { id: 6, customer: 'Nour', items: ['espresso', 'latte', 'muffin'], total: 10.5 }
];
const mondayCustomers = ['Rami', 'Lea', 'Karim', 'Nour'];
const tuesdayCustomers = ['Lea', 'Nour', 'Tony', 'Rami', 'Lea'];

// Sum the totals of all orders.
function getTotalRevenue(orders) { return orders.reduce((sum, order) => sum + order.total, 0); }

// Select orders meeting a minimum total.
function getBigOrders(orders, min) { return orders.filter(order => order.total >= min); }

// Format each order as a readable summary.
function getOrderSummaries(orders) { return orders.map(order => `#${order.id} ${order.customer} - ${order.items.length} item(s) - $${order.total.toFixed(2)}`); }

// Sort a copy of orders by descending total.
function getSortedByTotal(orders) { return [...orders].sort((a, b) => b.total - a.total); }

// Find IDs of orders containing a given item.
function findOrdersByItem(orders, item) { return orders.filter(order => order.items.includes(item)).map(order => order.id); }

// Count how many times each menu item appears.
function countItems(orders) {
  return orders.flatMap(order => order.items).reduce((counts, item) => {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {});
}

// Find the item with the highest count.
function getMostPopularItem(orders) {
  const counts = countItems(orders);
  return Object.keys(counts).reduce((best, item) => best === null || counts[item] > counts[best] ? item : best, null);
}

// Add up spending for each customer.
function getSpendingPerCustomer(orders) {
  return orders.reduce((totals, order) => {
    totals[order.customer] = (totals[order.customer] || 0) + order.total;
    return totals;
  }, {});
}


// List each customer only once.
function getUniqueCustomers(orders) { return [...new Set(orders.map(order => order.customer))]; }

// List every distinct purchased item.
function getAllItems(orders) { return [...new Set(orders.flatMap(order => order.items))]; }

// Return customers appearing in both sets.
function bothDays(setA, setB) { return [...setA].filter(customer => setB.has(customer)); }

// Return customers appearing only in the first set.
function onlyFirstDay(setA, setB) { return [...setA].filter(customer => !setB.has(customer)); }

// Return every customer from either set without duplicates.
function allCustomers(setA, setB) { return [...new Set([...setA, ...setB])]; }



const mondaySet = new Set(mondayCustomers);
const tuesdaySet = new Set(tuesdayCustomers);

console.log('Total revenue:', getTotalRevenue(orders));
console.log('Big orders (>= $8):', getBigOrders(orders, 8));
console.log('Order summaries:', getOrderSummaries(orders));
console.log('Sorted by total:', getSortedByTotal(orders));
console.log('Orders with muffin:', findOrdersByItem(orders, 'muffin'));


console.log('Item counts:', countItems(orders));
console.log('Most popular item:', getMostPopularItem(orders));
console.log('Spending per customer:', getSpendingPerCustomer(orders));
console.log('Unique customers:', getUniqueCustomers(orders));
console.log('All items:', getAllItems(orders));
console.log('Both days:', bothDays(mondaySet, tuesdaySet));
console.log('Only Monday:', onlyFirstDay(mondaySet, tuesdaySet));
console.log('All customers:', allCustomers(mondaySet, tuesdaySet));

// Tuesday has four distinct customers because Lea appears twice; a Set removes duplicates.
console.log('Distinct Tuesday customers:', tuesdaySet.size);

// Extra tests: empty input, larger minimum, absent item, and disjoint sets.
console.log('Extra test — empty revenue:', getTotalRevenue([]));
console.log('Extra test — big orders >= 11:', getBigOrders(orders, 11));
console.log('Extra test — missing item:', findOrdersByItem(orders, 'tea'));
console.log('Extra test — no shared customers:', bothDays(new Set(['A']), new Set(['B'])));
