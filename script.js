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
		const countryLink = `country.html?name=${encodeURIComponent(country.name)}`;
		
		countryHTML += /* html */ `
			<a href="${countryLink}">
			<div class="bg-white dark:bg-[#2b3945] rounded-sm shadow-sm overflow-hidden leading-6 ">
				<img src="${country.flags.png}" class="h-48 object-cover w-full">
				<div class="p-5 text-lg font-bold">${country.name}</div>
				<div class="p-5">
					<div class="text-sm">Population: ${country.population}</div>
					<div class="text-sm">Region: ${country.region}</div>
					<div class="text-sm">Capital: ${country.capital}</div>
				</div>
			</div>
			</a>
		`;
	});

	document.querySelector('.js-country-grid').innerHTML = countryHTML;
}

/*
Country Search
*/

const CountrySelect = document.getElementById('country');

CountrySelect.addEventListener('input', () => {
	const trimmedValue = CountrySelect.value.trim();
	const lowerCase = trimmedValue.toLowerCase();
	const getCountry = allCountries.filter((country) => {
		if (country.name.toLowerCase().includes(lowerCase)) {
			return true
		} else {
			return false
		}
	})
	renderCountry(getCountry);
});