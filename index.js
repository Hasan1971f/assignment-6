// hamburger menu function start 
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('menu-close-btn');
function menuBar() {
    menuBtn.style.backgroundColor = '#0E7A81';
    menuBtn.style.color = 'white';
    console.log(4455);
    document.getElementById('dropdown-menu').classList.remove('hidden');
    menuBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
}

function closeBar() {
    menuBtn.style.backgroundColor = 'white';
    menuBtn.style.color = '#5a5a5a';
    document.getElementById('dropdown-menu').classList.add('hidden');
    menuBtn.classList.remove('hidden');
    closeBtn.classList.add('hidden');

}
// hamburger menu function end
const categoryContainer = document.getElementById('category-container');
const cardContainer = document.getElementById('card-container');
const imgContainer = document.getElementById('img-container');
const modalContainer = document.getElementById('modal-container');
const noInformation = document.getElementById('no-information');
const spinner = document.getElementById('spinner');

// fetch categories
function loadCategory() {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(response => response.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.error(error))
}

function displayCategories(categories) {
    categories.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="flex gap-4 border-[#0E7A81]/15 border p-6 btn w-full h-auto bg-transparent rounded-2xl hover:bg-gray-100 deactive" onclick = "clickCategory('${item.category}')" id="btn-${item.category}"> 
        <div> <img src=${item.category_icon} alt=""> </div>
        <p class="font-bold text-2xl text-[#131313]"> ${item.category} </p>
        </button>
        `
        categoryContainer.appendChild(div);
    });
}
function clickCategory(id) {
    spinner.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    imgContainer.classList.add('hidden');
    noInformation.classList.add('hidden');
    document.getElementById('container').classList.add('place-items-center')
    document.getElementById('sort-btn').classList.add('hidden')
    document.getElementById('sort-btn2').classList.remove('hidden')
    
    removeActive();
    const categoryBtn = document.getElementById(`btn-${id}`);
    categoryBtn.classList.add('rounded-full', 'bg-[#0E7A81]/10', 'border[1.5px]', 'border-[#0E7A81]')
    
    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(response => response.json())
        .then(info => {
            document.getElementById('container').classList.remove('place-items-center')
            spinner.classList.add('hidden');
            cardContainer.classList.remove('hidden');
            imgContainer.classList.remove('hidden');
            displayPets(info.data);
            
            function sortPets() {
                    spinner.classList.remove('hidden');
                    cardContainer.classList.add('hidden');
                    imgContainer.classList.add('hidden');
                    noInformation.classList.add('hidden');
                    document.getElementById('container').classList.add('place-items-center')
                    setTimeout(() => {
                        document.getElementById('container').classList.remove('place-items-center')
                        spinner.classList.add('hidden');
                        cardContainer.classList.remove('hidden');
                        imgContainer.classList.remove('hidden');
                        const sortPrice = info.data.sort((a, b) => b.price - a.price);

                        displayPets(sortPrice);
                    }, 1000);
                }
                document.getElementById('sort-btn2').addEventListener('click', sortPets)
            })
            .catch(error => console.log(error))

    }, 2000)
}

function removeActive() {
    const buttons = document.getElementsByClassName('deactive');
    for (btn of buttons) {
        btn.classList.remove('rounded-full', 'bg-[#0E7A81]/10', 'border[1.5px]', 'border-[#0E7A81]');
    }
}

// Fetch All Pets
function loadPets() {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(response => response.json())
        .then(data => displayPets(data.pets))
        .catch(error => console.error(error))
}
let allPets = [];
function displayPets(pets) {
    cardContainer.innerHTML = '';
    if (pets.length == '') {
        noInformation.classList.add('flex')
        noInformation.classList.remove('hidden')
        cardContainer.classList.add('hidden')
    }
    else {
        cardContainer.classList.remove('hidden')
        noInformation.classList.remove('flex')
        noInformation.classList.add('hidden')
    }

    pets.forEach(item => {
        const div = document.createElement('div');

        let keyObject = Object.keys(item);
        keyObject.forEach(key => {
            if (!item[key]) {
                item[key] = 'Not Available';
            }
        })


        div.classList = "p-5 border border-[#131313]/10 rounded-xl"
        div.innerHTML = `
        <div>
        <div class="mb-6 w-full h-auto lg:h-[160px]">
        <img src=${item.image} alt="" class="w-full h-full object-cover rounded-lg">
        </div>
        <div>
        <h3 class="mb-2 text-[#131313] text-xl font-bold"> ${item.pet_name ? item.pet_name : 'Not Available'} </h3>
        <p class="flex items-center gap-2 text-[#131313]/70 mb-2"> <img src="images/breed.jfif"
        class="w-5" alt="">
        Breed: ${item.breed ? item.breed : 'Not Available'}</p>
        <p class="flex items-center  gap-2 text-[#131313]/70 mb-2"> <img src="images/birth.jfif"
        class="w-5" alt="">
        Birth: ${item.date_of_birth ? item.date_of_birth : 'Not Available'} </p>
        <p class="flex items-center gap-2 text-[#131313]/70 mb-2"> <img src="images/gender.jfif"
        class="w-5" alt="">
        Gender: ${item.gender ? item.gender : 'Not Available'} </p>
        <p class="flex items-center gap-2 text-[#131313]/70 mb-4"> <img src="images/price.jfif"
        class="w-5" alt="">
        Price: ${item.price ? item.price : 'Not Available'} </p>
        <hr class="border border-[#131313]/10 mb-4">
        <div class="flex flex-col lg:flex-row justify-between items-center gap-2">
        <button
        class="btn w-full lg:w-auto rounded-lg border border-[#0E7A81]/15 bg-transparent hover:bg-gray-100 active:bg-[#0E7A81] active:text-white" onclick = (like("${item.image}"))>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round"
        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
        </svg>
        </button>
        <button
        class="btn w-full lg:w-auto h-auto rounded-lg border border-[#0E7A81]/15 text-[#0E7A81] font-bold bg-transparent hover:bg-gray-100 active:bg-[#0E7A81] active:text-white" id="adopt-btn${item.petId}" onclick = "adoptModal('${item.petId}')">
        Adopt </button>
        <button 
        class="btn w-full lg:w-auto h-auto rounded-lg border border-[#0E7A81]/15 text-[#0E7A81] font-bold bg-transparent hover:bg-gray-100 active:bg-[#0E7A81] active:text-white" onclick = "details('${item.petId}')">
        Details </button>
        </div>
        </div>
        </div>
        `

        cardContainer.appendChild(div);
        allPets.push(item);
    })
}
function like(img) {
    const div = document.createElement('div');
    div.innerHTML = `
    <img src=${img} alt="" class="rounded-lg w-full sm:h-[150px] md:h-auto object-cover">
    `
    imgContainer.appendChild(div);
}

function details(id) {
    for (pet of allPets) {

        if (id == pet.petId) {
            let keys = Object.keys(pet);

            keys.forEach(key => {

                if (!pet[key]) {
                    pet[key] = 'Not Available';

                }
            })
            const div = document.createElement('div');
            div.classList = "h-screen w-full mx-auto fixed overflow-scroll z-10 top-0 left-0 bg-[#131313]/60 backdrop-blur-[2px] flex justify-center items-center";
            div.innerHTML = `
            <div class="w-4/5 lg:w-1/2 border bg-white rounded-xl p-5 md:p-8">
            <div class="h-[200px]">
            <img src=${pet.image} alt="" class="w-full h-full object-cover rounded-lg">
            </div>
            <div>
            <h3 class="mb-2 text-[#131313] text-xl font-bold mt-6"> ${pet.pet_name ? pet.pet_name : 'Not Available'} </h3>
            <div class="grid grid-cols-2">
            <p class="flex items-center gap-2 text-[#131313]/70 mb-2"> <img src="images/breed.jfif" class="w-5" alt="">
            Breed: ${pet.breed ? pet.breed : 'Not Available'}</p>
            <p class="flex items-center  gap-2 text-[#131313]/70 mb-2"> <img src="images/birth.jfif"
            class="w-5" alt="">
            Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available'} </p>
            <p class="flex items-center gap-2 text-[#131313]/70 mb-2"> <img src="images/gender.jfif"
            class="w-5" alt="">
            Gender: ${pet.gender ? pet.gender : 'Not Available'} </p>
            <p class="flex items-center gap-2 text-[#131313]/70 mb-4"> <img src="images/price.jfif"
            class="w-5" alt="">
            Price: ${pet.price ? pet.price : 'Not Available'} </p>
            <p class="flex items-center gap-2 text-[#131313]/70 mb-2"> <img src="images/gender.jfif"
            class="w-5" alt="">
            ${pet.vaccinated_status ? pet.vaccinated_status : 'Not Available'} </p>
            </div>
            <hr class="border border-[#131313]/10 mb-4">
            <div>
            <h5 class="font-semibold text-[#131313] mb-3"> Details Information </h5>
            <p class="text-[#131313]/70 mb-4"> ${pet.pet_details ? pet.pet_details : 'Not Available'} </p>
            </div>
            <button onclick="cancelModal()"
            class="btn py-3 w-full h-auto text-[#0E7A81] bg-[#0E7A81]/10 border border-[#0E7A81]/20 rounded-lg font-bold text-[18px] hover:bg-gray-100">
            Cancel </button>
            </div>
            </div>
            `

            modalContainer.appendChild(div);
        }
    }
}
function cancelModal() {
    modalContainer.innerHTML = '';
}


const adodtModalContainer = document.getElementById('adopt-modal');
let countdownNumber = document.getElementById('countdown');

function adoptModal(petId) {
    adodtModalContainer.classList.remove('hidden');
    let count = 3;
    countdownNumber.innerText = 3;
    const countdown = setInterval(() => {

        count = count - 1;
        countdownNumber.innerText = count;
        if (count <= 0) {
            clearInterval(countdown);
            adodtModalContainer.classList.add('hidden');
            document.getElementById(`adopt-btn${petId}`).setAttribute('disabled', 'true')
        }
    }, 1000)
}

function sortPetByPrice() {
    spinner.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    imgContainer.classList.add('hidden');
    noInformation.classList.add('hidden');
    document.getElementById('container').classList.add('place-items-center')

    setTimeout(() => {
        fetch("https://openapi.programming-hero.com/api/peddy/pets")
            .then(response => response.json())
            .then(data => {
                const allPets = data.pets;
                const sortPets = allPets.sort((a, b) => b.price - a.price);
                displayPets(sortPets);
                document.getElementById('container').classList.remove('place-items-center')
                spinner.classList.add('hidden');
                cardContainer.classList.remove('hidden');
                imgContainer.classList.remove('hidden');

            })
            .catch(error => console.log(error))
    }, 1000)
}
document.getElementById('sort-btn').addEventListener('click', sortPetByPrice)

loadCategory();
loadPets();