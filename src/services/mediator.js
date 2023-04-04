import { getDogImages } from "../services/dog-api";
import MicroModal from 'micromodal';

class Mediator {
	imgOnPage = 20;
	listOfImages = {};

	constructor() {
		this.events = [];

		this.register("select_breed", this.selectBreed.bind(this));
		this.register("next_breed", this.displayBreeads.bind(this));
	}

	register(eventName, callbackFunction) {
		if (this.events.indexOf(eventName) === -1) {
			this.events[eventName] = [];

			this.events[eventName].push(callbackFunction);
		}
	}

	raiseEvent(eventName, eventData) {
		if (!this.events[eventName]) {
			return;
		}

		for (const callbackFunction of this.events[eventName]) {
			callbackFunction(eventData);
		}
	}

	async selectBreed(eventData) {
		const listOfImages = await getDogImages(eventData[0], eventData[1]);
		this.listOfImages = listOfImages;

		const contentElement = document.getElementById("content");
		contentElement.innerText = "";

		const divPages = document.createElement("div");
		divPages.id = "listOfPages";
		contentElement.appendChild(divPages);

		this.displayPagination(this.listOfImages.length);

		const divImages = document.createElement("div");
		divImages.id = "images";
		contentElement.appendChild(divImages);

		this.displayBreeads(0);
	}

	displayBreeads(imageIndex) {
		const divImages = document.getElementById("images");

		while (divImages.firstChild) {
			divImages.firstChild.remove();
		}

		imageIndex = imageIndex * 20;
		for (let i = 0; i < this.imgOnPage; i++) {
			const img = document.createElement("img");
			img.className = "breedImage";
			img.setAttribute("data-micromodal-trigger", "modal-1");
			const url = this.listOfImages[imageIndex];
			if (url !== undefined) {
				img.src = url;
				img.addEventListener("click", (e => 
					{
						const imgModal = document.createElement("img");
						imgModal.src = e.currentTarget.src;
						imgModal.setAttribute("data-micromodal-trigger", "modal-1");
						imgModal.className = "imgModal";
        				const modalContent = document.getElementById("modal-1-content");
						modalContent.innerText = "";
        				modalContent.appendChild(imgModal);
					}));
				divImages.appendChild(img);
				imageIndex++;
			} else {
				break;
			}
		}

		MicroModal.init();
	}

	displayPagination(lengthOfImages) {
		const divPages = document.getElementById("listOfPages");

		while (divPages.firstChild) {
			divPages.firstChild.remove();
		}

		const listOfPages = Math.ceil(lengthOfImages / this.imgOnPage);

		for (let i = 0; i < listOfPages; i++) {
			const span = document.createElement("span");
			span.innerText = i + 1;
			span.setAttribute("data-page", i);
			span.addEventListener("click", (event) => {
			  const page = event.target.getAttribute("data-page");
			  mediator.raiseEvent("next_breed", page);
			  highlightPage(parseInt(page));
			});
			divPages.appendChild(span);
			divPages.appendChild(document.createTextNode(" "));
		  }
		  
		  const span = document.createElement("span");
		  span.innerText = " / " + listOfPages;
		  divPages.appendChild(span);
		  
		  function highlightPage(page) {
			const spans = divPages.querySelectorAll("span[data-page]");
			for (let i = 0; i < spans.length; i++) {
			  if (spans[i].getAttribute("data-page") == page) {
				spans[i].classList.add("highlight");
			  } else {
				spans[i].classList.remove("highlight");
			  }
			}
		  }  
	}
}

export const mediator = new Mediator();
