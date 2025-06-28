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

// display specific pet data
const singlePet = (id, btn) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => {
            if (btn === "adopt-btn") {
                const adoptBtn = document.getElementById(`adopt-btn-${id}`);
                adoptBtn.disabled = true;
                selectedPet(data.petData)
            }else if(btn === "details-btn"){
                petDetails(data)
            }
        })
        .catch(err => console.log(err))
};

// display specific categories

const singleCategories = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(res => res.json())
    .then(data => allPets(data.data))
    .catch(err => console.log(err))
}



// Display categories pet
const diplayCategoriesPet = (categories) => {
    const categoriesContainer = document.getElementById("categoried-pet");
    categories.forEach(pet => {
        const { category, category_icon } = pet;
        const div = document.createElement("div");
        div.addEventListener("click", () =>{
            singleCategories(category);
        })
        div.classList = " category-pet flex items-center justify-center mx-6 py-2 cursor-pointer"
        div.innerHTML = `
                <img class="w-10 mr-2" src=${category_icon} alt="Categories-Pet">
                <p class="font-bold text-xl ml-2">${category}</p>
        `
        categoriesContainer.appendChild(div);
    })
};




// pet details
const petDetails = (pet) => {
    const { image, gender, date_of_birth: bod, category, breed, petId, pet_name, price, vaccinated_status, pet_details } = pet.petData;
    const petDetails = document.getElementById("modal-content");
    petDetails.innerHTML = `
        <img class="rounded w-full h-[200px] object-cover" src="${image}" alt="pet-i,age">
            <h2 class="font-bold text-2xl my-2">${pet_name}</h2>
            <div class="flex">
                <div class="mr-8">
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
                </div>
                <div>
                    <p class="text-sm text-gray-500 mb-2">
                    <i class="fa-solid fa-dollar-sign"></i>
                    Price : ${price ? `${price} $` : "Not Available"}
                    </p>
                    <p class="text-sm text-gray-500 mb-2">
                    <i class="fa-solid fa-syringe"></i>
                    vaccinated : ${vaccinated_status ? vaccinated_status : "Not Available"}
                    </p>
                    <p class="text-sm text-gray-500 mb-2">
                    <i class="fa-solid fa-table-cells-large"></i>
                    Category : ${category ? category : "Not Available"}
                    </p>
                </div>
            </div>
            <div class="border-1 border-gray-100 my-2"></div>
            <h3 class="font-bold mb-2">Details Information</h3>
            <p class="text-justify text-xs text-gray-500">${pet_details}</p>
            

    `;
    document.getElementById("details-btn").click();
}


// display all pets data
const allPets = (pets) => {
    console.log(pets.length)
    const allPetContainr = document.getElementById("all-pet-container");
    allPetContainr.innerHTML = "";
    if(pets.length === 0){
        allPetContainr.classList.remove("grid");
        allPetContainr.innerHTML = `
            <img class="mx-auto mt-8" src="../resource/error.webp" alt="">
            <h2 class="font-bold text-center text-3xl mb-10">No Information Available</h2>
        `
    }else{

    }
    pets.forEach(pet => {
        const { image, gender, date_of_birth: bod, breed, petId, pet_name, price } = pet;
        const div = document.createElement("div");
        div.classList = "border-1 border-gray-200 rounded p-4";
        div.innerHTML = `
            <img class="rounded w-full" src="${image}" alt="pet-i,age">
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
                <button id="adopt-btn-${petId}" class="card-footer-btn btn" onclick="singlePet(${petId}, 'adopt-btn')">Adopt</button>
                <button onclick="singlePet(${petId}, 'details-btn')" class="card-footer-btn btn">Details</button>
            </div>
        `;
        allPetContainr.appendChild(div);
    })
};

// display selected pet data 


const selectedPet = (pet) => {
    const { image } = pet;
    const selectedPetContainer = document.getElementById("selected-pet-container");
    const img = document.createElement("img");
    img.src = `${image}`;
    img.classList = "rounded"
    selectedPetContainer.appendChild(img)
};






// called function
loadPetData();