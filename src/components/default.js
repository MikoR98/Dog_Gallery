import { getRandomDogImage } from "../services/dog-api";
import MicroModal from 'micromodal';

export class Default {
    constructor() {
		this.initialize();
	}

	async initialize() {
        const rootElement = document.getElementById("content");

        const img = document.createElement("img");
        img.classList.add("center", "randomImg");
        img.setAttribute("data-micromodal-trigger", "modal-1");
        rootElement.appendChild(img);

        const input = document.createElement("input");
        input.classList.add("randomButton", "center");
        input.id = "random";
        input.type = "button";
        input.value = "Losuj kolejne zdjęcie";
        input.addEventListener("click", () => this.getRandomImage(img));
        rootElement.appendChild(input);

        await this.getRandomImage(img);

        const imgModal = img.cloneNode();
        const modalContent = document.getElementById("modal-1-content");
        imgModal.className = "imgModal";
        modalContent.innerText = "";
        modalContent.appendChild(imgModal);
        
        MicroModal.init();
	}

    async getRandomImage(img)
    {
        var randomImage = await getRandomDogImage();

        if (randomImage !== undefined && img !== undefined) {
            img.src = randomImage;
        }
    }
}