import { Menu } from "../components/menu";
import { mediator } from "../services/mediator";

export class Filter extends Menu{

	constructor() {
        super("menu");
		this.initializeFilter();
	}

	initializeFilter() {
		document.getElementById("menu");

        const filterWrapper = document.createElement("div");
        filterWrapper.classList.add("search-filter");
    
        const input = document.createElement("input");
        input.id = "filter";
        input.type = "text";
        input.placeholder = "Szukaj rasy psa...";
        input.addEventListener("input", this.findBreeds.bind(this));
    
        filterWrapper.appendChild(input);
        this.rootElement.insertBefore(filterWrapper, this.menuList);
	}

    async findBreeds() {
        const divFilter = document.getElementById("filter");

        this.menuList.innerText = "";
        
        for (const breed in this.breeds) {
            var found = 0;
            if (this.breeds[breed].length > 0) {
				for (let i = 0; i < this.breeds[breed].length; i++) {
                    var subBreed = this.breeds[breed][i];
                    if (divFilter.value && 
                        (breed.toLowerCase().includes(divFilter.value.toLowerCase()) || 
                        subBreed.toLowerCase().includes(divFilter.value.toLowerCase()))) {
                        found = 1;
                        break;
                    }
                }
			}
            else {
                if (divFilter.value && breed.toLowerCase().includes(divFilter.value.toLowerCase())) {
                    found = 1;
                }
            }   

            if (found === 1 || divFilter.value === ""){
                const option = document.createElement("li");
                option.innerText = breed;
                option.addEventListener("click", () => {
                    mediator.raiseEvent("select_breed", [breed]);
                });

                if (this.breeds[breed].length > 0) {
                    this.generateSubBreedList(breed, option);
                }

                this.menuList.appendChild(option);
            }
        }

        if (this.menuList.innerText === ""){
            this.menuList.innerText = "Podana rasa nie istnieje";
        }
    }
}