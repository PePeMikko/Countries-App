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
			<div>
				<a href="${countryLink}"><img src="${country.flags.png}"></a>
				<div>${country.name}</div>
				<div>Population: ${country.population}</div>
				<div>Region: ${country.region}</div>
				<div>Capital: ${country.capital}</div>
			</div>
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