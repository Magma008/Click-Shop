const url = "https://dummyjson.com/products"
const cardContainer = document.querySelector(".cardContainer")
const spinner = document.querySelector(".spinner")
let selector = document.querySelector(".selector")
let search = document.querySelector(".search")
let modulePage = document.querySelector(".modulePage")

const fetchItem = async (select) => {
    spinner.classList.remove("hidden")
    try {
        spinner.classList.add("flex")
        const resp = await fetch(select === "all" ? url : `${url}/category/${select}`)
        const { products } = await resp.json()
        displayItems(products)

    } catch (error) {
        console.log(error);
    }

}

search.addEventListener("input", async (e) => {
        try {
            spinner.classList.add("flex")
            const resp = await fetch(`${url}/search?q=${e.target.value}`)
            const { products } = await resp.json()
            displayItems(products)
            spinner.classList.add("hidden")
    
        } catch (error) {
            console.log(error);
        }
    
})

const fetchCat = async () => {
    spinner.classList.add("flex")
    try {
        const resp1 = await fetch(`${url}/categories`)
        let data1 = await resp1.json()
        const categories = ["all", ...data1]
        displayCategory(categories)
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("DOMContentLoaded", () => { fetchItem("all"), fetchCat() })

// Mapping data

const displayItems = (data) => {
    cardContainer.innerHTML = ""
    data.map(elem => {
        const card = document.createElement("div")
        card.className = "card shadow-md shadow-gray-400 flex-col flex rounded-xl dark:bg-slate-800 border dark:border-slate-800 dark:shadow-none overflow-hidden"
        card.innerHTML = `
            <div class="card-img aspect-video overflow-hidden border-b dark:border-b-slate-800">
                <img src="${elem.thumbnail}" alt="cardImage"
                class="w-full h-full object-cover object-center">
            </div>
            <div class="card-body flex flex-col flex-1 gap-1 sm:gap-3 p-1 sm:p-2">
                <h3 class="font-semibold text-lg dark:text-white">${elem.title}</h3>
                <p class="text-green-500 font-normal"><span>${elem.price}</span>$</p>
                <p class="font-medium dark:text-white"><span>${elem.stock}</span> pcs left</p>
                <p class="dark:text-white text-black text-sm sm:text-[16px]">${elem.description}</p>
                <button
                class="bg-slate-500 border-slate-500 border transition-all delay-75 hover:bg-transparent px-4 py-2 dark:bg-cyan-500 dark:border-cyan-500 dark:hover:bg-transparent dark:hover:text-cyan-500 hover:text-slate-500 rounded-md mt-auto details">Details</button>
            </div>
        `
        cardContainer.append(card)

        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("details")) {
                moduleToggle(elem)
            }
        })
    })
    spinner.classList.add("hidden")
}
// =====================================================

// Module Page

const moduleToggle = (info) => {
    modulePage.classList.remove("hidden")
    modulePage.innerHTML = `
        <div class="flex justify-between flex-col md:flex-row">
            <div class="img aspect-[4/2] md:aspect-[18/13] overflow-hidden rounded-lg  md:w-[42.5%]">
                <img src="${info.thumbnail}" alt="moduleImg"
                class="w-full h-full object-cover object-center">
            </div>
            <div class="body flex flex-col justify-between  md:w-[52.5%]">

                <div class="flex flex-col gap-3">
                    <h3 class="text-2xl lg:text-5xl font-semibold dark:text-white">${info.title}</h3>
                    <p class="text-green-500 text-lg lg:text-xl font-semibold">Price:<span
                    class="ms-2 font-normal">${info.price}$</span></p>
                    <p class="text-lg font-semibold lg:text-xl dark:text-slate-500">Brand:<span
                    class="ms-2 font-normal dark:text-white">${info.brand}</span></p>
                    <p class="text-lg font-semibold lg:text-xl dark:text-slate-500">Dicount:<span
                    class="ms-2 font-normal dark:text-white">${info.discountPercentage}<span>%</span></span></p>
                    <p class="text-md font-semibold lg:text-lg dark:text-slate-500">Description:<span
                    class="ms-2 font-normal dark:text-white">${info.description}</span></p>
                </div>

                <div class="flex justify-end">
                    <button
                    class="bg-cyan-500 transition-all delay-75 close border-cyan-500 border-2 hover:text-cyan-500 text-lg hover:bg-transparent py-2 px-8 rounded-lg">Back</button>
                </div>
            </div>
        </div>
    `

    modulePage.addEventListener("click", (e) => {
        if (e.target.classList.contains("close")) {
            modulePage.classList.add("hidden")
        }
    })
}
// ==========================================

// Put Category in select

const displayCategory = (data) => {
    let cats = ''
    data.map(item => {
        cats +=
            `
            <option class="bg-white capitalize opt dark:bg-slate-900" value="${item}">${item}</option>
        `
        selector.innerHTML = cats
    })
}

selector.addEventListener("change", () => {
    fetchItem(selector.value)
})

// ==========================================================