export const zones = {
  main_hall: "Основна зала",
  terrace: "Тераса",
  vip: "VIP",
  bar: "Бар",
};

// in-memory data; changes live until the dev server restarts (MongoDB comes in LR7)
let tables = [
  { id: 1, number: 1, capacity: 2, location: "main_hall", description: "Затишний стіл біля вікна.", available: true },
  { id: 2, number: 2, capacity: 4, location: "main_hall", description: "Стіл у центрі зали.", available: true },
  { id: 3, number: 3, capacity: 4, location: "main_hall", description: "Стіл поруч із каміном.", available: false },
  { id: 4, number: 4, capacity: 2, location: "terrace", description: "Стіл на терасі з краєвидом на сад.", available: true },
  { id: 5, number: 5, capacity: 6, location: "terrace", description: "Великий стіл на терасі для компанії.", available: true },
  { id: 6, number: 6, capacity: 2, location: "bar", description: "Місце біля барної стійки.", available: true },
  { id: 7, number: 7, capacity: 3, location: "bar", description: "Високий стіл біля бару.", available: false },
  { id: 8, number: 8, capacity: 6, location: "vip", description: "Окремий VIP-стіл для компанії.", available: true },
  { id: 9, number: 9, capacity: 8, location: "vip", description: "Простора VIP-зона з диванами.", available: true },
  { id: 10, number: 10, capacity: 4, location: "main_hall", description: "Стіл біля панорамного вікна.", available: true },
];

let nextId = 11;

export { tables };

export function getTableById(id) {
  return tables.find((table) => table.id === Number(id));
}

export function getZones() {
  return ["Всі", ...Object.keys(zones)];
}

export function addTable(data) {
  const newTable = {
    id: nextId++,
    number: Number(data.number),
    capacity: Number(data.capacity),
    location: data.location || "main_hall",
    description: data.description || "",
    available: data.available !== undefined ? data.available : true,
  };
  tables.push(newTable);
  return newTable;
}

export function updateTable(id, data) {
  const index = tables.findIndex((table) => table.id === Number(id));
  if (index === -1) return null;
  tables[index] = { ...tables[index], ...data, id: tables[index].id };
  return tables[index];
}

export function deleteTable(id) {
  const index = tables.findIndex((table) => table.id === Number(id));
  if (index === -1) return null;
  const deleted = tables[index];
  tables.splice(index, 1);
  return deleted;
}
