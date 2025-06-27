const loadPetData = () => {
    // Get categories pet
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => diplayCategoriesPet(data.categories))
        .catch(err => console.log(err))

    // get all pets data
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => allPets(data.pets))
    .catch(err => console.log(err))
};

// load specific pet data
const singlePet = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
}


// Display categories pet
const diplayCategoriesPet = (categories) => {
    const categoriesContainer = document.getElementById("categoried-pet");
    categories.forEach(pet => {
        const { category, category_icon, id } = pet;
        const div = document.createElement("div");
        div.classList = " category-pet flex items-center justify-center mx-6 py-2 cursor-pointer"
        div.innerHTML = `
            <img class="w-10 mr-2" src=${category_icon} alt="Categories-Pet">
            <p class="font-bold text-xl ml-2">${category}</p>
        `
        categoriesContainer.appendChild(div)
    })
};

// display all pets data
const allPets = (pets) =>{
    const allPetContainr = document.getElementById("all-pet-container");
    pets.forEach(pet => {
        const {image, gender, date_of_birth :bod, category, breed, petId, pet_name, price, vaccinated_status} = pet;
        const div = document.createElement("div");
        div.classList = "border-1 border-gray-200 rounded p-4";
        div.innerHTML = `
            <img class="rounded" src="${image}" alt="pet-i,age">
            <h2 class="font-bold text-xl my-2">${pet_name}</h2>
            <p class="text-sm text-gray-500 mb-2">
            <i class="fa-solid fa-cubes-stacked"></i>
            Breed : ${breed ? breed : "Not Available"}
            </p>
            <p class="text-sm text-gray-500 mb-2">
            <i class="fa-regular fa-calendar"></i>
            Birth : ${bod ? bod : "Not Available"}
            </p>
            <p class="text-sm text-gray-500 mb-2">
            <i class="fa-solid fa-venus-mars"></i>
            Gender : ${gender ? gender : "Not Available"}
            </p>
            <p class="text-sm text-gray-500 mb-2">
            <i class="fa-solid fa-dollar-sign"></i>
            Price : ${price ? `${price} $` : "Not Available"}
            </p>
            <div class="divider"></div>
            <div class="flex items-center justify-between card-footer-container">
                <button class="card-footer-btn btn"><i class="fa-regular fa-thumbs-up"></i></button>
                <button class="card-footer-btn btn" onclick="singlePet(${petId})">Adopt</button>
                <button class="card-footer-btn btn">Details</button>
            </div>
        `;

        allPetContainr.appendChild(div);

    })
}








// called function
loadPetData();