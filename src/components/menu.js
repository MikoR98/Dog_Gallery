import { getBreedList } from "../services/dog-api";
import { mediator } from "../services/mediator";

export class Menu {
	breeds = {};
	rootElement = undefined;

	constructor(elementName) {
		this.initializeMenu(elementName);
	}

	async initializeMenu(elementName) {
		const rootElement = document.getElementById(elementName);
		this.rootElement = rootElement;

		this.generateMenuHeader(rootElement);
		this.generateMenuList(rootElement);
		await this.getBreedList();
		this.refreshBreedList();
	}

	generateMenuHeader(rootElement) {
		const menuHeader = document.createElement("h1");
		menuHeader.innerText = "MENU";
		rootElement.appendChild(menuHeader);
	}

	generateMenuList(rootElement) {
		const menuList = document.createElement("ul");
		rootElement.appendChild(menuList);
		this.menuList = menuList;
	}

	async getBreedList() {
		const breeds = await getBreedList();
		this.breeds = breeds;
	}

	refreshBreedList() {
		for (const breed in this.breeds) {
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

	generateSubBreedList(breed, parentElement) {
		const subBreedList = this.breeds[breed];
		const list = document.createElement("ul");
		list.style.display = "none"; // początkowo lista jest ukryta
	  
		for (let i = 0; i < subBreedList.length; i++) {
		  const option = document.createElement("li");
		  option.innerText = subBreedList[i];
		  option.addEventListener("click", (event) => {
			mediator.raiseEvent("select_breed", [breed, subBreedList[i]]);
			event.stopPropagation();
		  });
		  list.appendChild(option);
		}
	  
		parentElement.appendChild(list);
	  
		// ukrywanie i pokazywanie listy podras po najechaniu myszką na nazwę rasy
		parentElement.addEventListener("mouseenter", () => {
		  list.style.display = "block";
		});
	  
		parentElement.addEventListener("mouseleave", () => {
		  list.style.display = "none";
		});
	  }
}
