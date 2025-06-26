///======================
//project initialization
console.log("Data management with objects, sets, and maps!");

//Define the product object

const products={
    1:{ id:1, name: "Laptop", price:1500},
    2:{ id:2, name: "Mouse", price:30},
    3:{ id:3, name: "Keyboard", price:50}
}

//Create a set with the name of the products
 const setProducts= new Set(Object.values(products).map(product=>product.name));
 console.log("Set of unique products:", setProducts);

//Create a map to add categories to products

const mapProducts= new Map([
    ["electronic", "Laptop"],
    ["accesories", "Mouse"],
    ["accesories", "Keyboard"]
]);

console.log("Product and category map:", mapProducts)

//loop through the products object
for(const id in products){
    console.log(`Product ID: ${id}, Details: `, products[id]);
}

//loop through the products set

for(const product of setProducts){
    console.log("Unique Product:", product);
}
//loop through the products map

mapProducts.forEach((product,category)=>{
    console.log(`Category: ${category}, Product: ${product}`);
})

//validation and testing

console.log("Complete data management tests:")
console.log("List of products(object):", products)
console.log("List of unique products (set):", setProducts)
console.log("Categorys and products (Map):",mapProducts )
