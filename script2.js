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
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('name');

fetch('./data.json')
  .then((response) => response.json())
  .then((countries) => {
    const country = countries.find((country) => {
      return country.name === countryName;
    });

    renderCountrySpecial(country, countries);
  });

function renderCountrySpecial(country, countries) {

    let borderCountries = [];

    if (country.borders) {
        borderCountries = country.borders.map((borderCode) => {
            const borderCountry = countries.find((country) => {
                return country.alpha3Code === borderCode;
            });

            const countryLink = `country.html?name=${encodeURIComponent(borderCountry.name)}`;
            return `<a href="${countryLink}" class="rounded-sm bg-white px-4 py-2 shadow-sm dark:bg-[#2b3945]">${borderCountry.name}</a>`;
        });
    }
    else {
        borderCountries = [];
    }

	let countryHTML = '';

	countryHTML += /* html */ `
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <img src="${country.flags.png}" alt="${country.name} flag" class="w-full aspect-[7/5] object-cover">
            <div class="grid gap-8">
                <div class="text-2xl font-bold">${country.name}</div>
                <div class="grid grid-cols-1 gap-x-8 gap-y-2 text-sm leading-6 sm:grid-cols-2">
                    <div>Native Name: ${country.nativeName}</div>
                    <div>Population: ${country.population}</div>
                    <div>Region: ${country.region}</div>
                    <div>Sub Region: ${country.subregion}</div>
                    <div>Capital: ${country.capital}</div>
                    <div>Top Level Domain: ${country.topLevelDomain}</div>
                    <div>Currencies: ${country.currencies[0].name}</div>
                    <div>Languages: ${country.languages.map((language) => language.name).join(', ')}</div>
                </div>
                <div class="mt-8 flex flex-wrap items-center gap-3 text-sm">
                    <span>Border Countries:</span>${borderCountries.join('')}
                </div>
            </div>
		</div>
	`;

	document.querySelector('.js-country-special').innerHTML = countryHTML;
}