export async function getDogImages(breed, subBreed) {
	return await fetch(
		`https://dog.ceo/api/breed/${breed}${subBreed ? "/" + subBreed : ""}/images`
	).then((response) => response.json().then((response) => response.message));
}

export async function getBreedList() {
	return await fetch("https://dog.ceo/api/breeds/list/all").then((response) =>
		response.json().then((response) => response.message)
	);
}

// return image url
export async function getRandomDogImage() {
	return await fetch("https://dog.ceo/api/breeds/image/random").then(
		(response) => response.json().then((response) => response.message)
	);
}
