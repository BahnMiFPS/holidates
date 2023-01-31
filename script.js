const API_KEY = "78a7bcc2-2aaf-4271-81aa-1a3727155a7d"
const BASE_URL = `https://holidayapi.com/v1/`
const renderCountriesBtn = document.querySelector("#countries-list-btn")
const loadHolder = document.querySelector(".loader")
const renderLanguagesBtn = document.querySelector("#languages-list-btn")
let index = 0
let index1 = 0

function loading() {
	loadHolder.innerHTML = "Loading For You. Please Wait"
	loadHolder.style.color = "orange"
}

function loadingDone() {
	loadHolder.innerHTML = "To travel is to love"
	loadHolder.style.color = "white"
}

async function getCountries() {
	try {
		const response = await fetch(
			`https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

async function renderCountries() {
	try {
		loading()
		const data = await getCountries()
		loadingDone()
		const countriesList = document.querySelector("#countries-list")
		const ul = countriesList.children[2]
		ul.innerHTML = ""
		data.countries.forEach((country) => {
			const li = document.createElement("li")
			li.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div>
                <div>Code: ${country.code}</div>
            </div>`
			ul.appendChild(li)
		})
	} catch (error) {
		console.log(error)
	}
}
renderCountriesBtn.addEventListener("click", () => {
	renderCountries()
})

async function getLanguages() {
	try {
		const response = await fetch(
			`https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

async function renderLanguages() {
	try {
		loading()
		const data = await getLanguages()
		loadingDone()
		const languagesList = document.querySelector("#languages-list")
		const langUl = languagesList.children[2]
		langUl.innerHTML = ""
		data.languages.forEach((language) => {
			const langLi = document.createElement("li")
			langLi.innerHTML = `<div class="bullet">${index1 + 1}</div>
										<div class="li-wrapper">
											<div class="li-title">${language.name}</div>
											<div class="li-text">Code: ${language.code}</div>
										</div>`
			langUl.appendChild(langLi)
		})
		// append child
	} catch (error) {
		console.log(error)
	}
}

renderLanguagesBtn.addEventListener("click", () => {
	renderLanguages()
})

const inputSearch = document.querySelector("#search-query")
const inputYear = document.querySelector("#year-query")
const inputMonth = document.querySelector("#month-query")
const inputDay = document.querySelector("#day-query")
const inputCountry = document.querySelector("#country-query")
const inputLanguage = document.querySelector("#language-query")
const renderHolidayBtn = document.querySelector("#holidays-btn")

// querystring: &country=AU&year=2022

async function getHolidays() {
	try {
		let queryString = ""

		if (inputCountry.value) {
			queryString += `&country=${inputCountry.value}`
		}
		// else {
		// queryString += `&country=AU`
		// }
		if (!inputYear.value) {
			queryString += `&year=2022`
		} else {
			queryString += `&year=${inputYear.value}`
		}
		if (inputMonth.value) {
			queryString += `&month=${inputMonth.value}`
		}
		if (inputSearch.value) {
			queryString += `&search=${inputSearch.value}`
		}
		if (inputDay.value) {
			queryString += `&day=${inputDay.value}`
		}
		if (inputLanguage.value) {
			queryString += `&language=${inputLanguage.value}`
		}
		// https://holidayapi.com/v1/holidays?pretty&key=78a7bcc2-2aaf-4271-81aa-1a3727155a7d&country=AU&year=2022
		const response = await fetch(
			`${BASE_URL}holidays?pretty&key=${API_KEY}${queryString}`
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

let index3 = 0

async function renderHolidays() {
	const data = await getHolidays()
	const holidaysList = document.querySelector("#holidays-list")
	const ul = holidaysList.children[1]
	const countryName = holidaysList.children[0]
	ul.innerHTML = ""
	console.log(data)
	if (inputCountry.value) {
		countryName.innerHTML = `Holidays of ${data.holidays[0].country}`
	} else {
		countryName.innerHTML = `Holidays of All Country`
	}
	data.holidays.forEach((holiday) => {
		const li = document.createElement("li")
		li.innerHTML = `<div class="bullet">${index3 + 1}</div>
										<div class="li-wrapper">
											<div class="li-title">${holiday.name}</div>
											<div class="li-text">${holiday.weekday.date.name} - ${holiday.date}</div>
										</div>`
		ul.appendChild(li)
	})
}

//getHolidays
// take input
// turns it into query string
//fetch api with that query string
//return data

//render
// forEach holiday
// ul of holidays
// append li of ul

renderHolidayBtn.addEventListener("click", () => {
	renderHolidays()
})
