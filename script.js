/*
Dark mode swticher
*/
const themeButton = document.querySelector("#theme-switcher-button");
const themeLabel = document.querySelector("#theme-switcher-label");

themeButton.addEventListener("click", () => {
	const isDark = document.documentElement.classList.toggle("dark");
	themeButton.setAttribute("aria-pressed", String(isDark));
	themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
});


/*
country logic
*/

let allCountries = [];

const regionSelect = document.querySelector('#region');

fetch('./data.json')
	.then((response) => response.json())
	.then((countries) => {
		allCountries = countries;
		renderCountry(countries);
	});

regionSelect.addEventListener('change', () => {
  	const selectedRegion = regionSelect.value;

  	if (selectedRegion === '') {
    	renderCountry(allCountries);
    	return;
  	}

  	const filteredCountries = allCountries.filter((country) => {
    	return country.region === selectedRegion;
  	});

  	renderCountry(filteredCountries);
});

function renderCountry(countries) {
	let countryHTML = '';

	countries.forEach((country) => {
		countryHTML += /* html */ `
			<div>
				<img src="${country.flags.png}">
				<div>${country.name}</div>
				<div>Population: ${country.population}</div>
				<div>Region: ${country.region}</div>
				<div>Capital: ${country.capital}</div>
			</div>
		`;
	});

	document.querySelector('.js-country-grid').innerHTML = countryHTML;
}