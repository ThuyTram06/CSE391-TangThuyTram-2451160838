const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const weatherResult =
    document.getElementById("weatherResult");

const historyContainer =
    document.getElementById("history");

// ======================
// SEARCH
// ======================

searchBtn.addEventListener(
    "click",
    () => {

        const city =
            cityInput.value.trim();

        if(city){
            getWeather(city);
        }
    }
);

cityInput.addEventListener(
    "keydown",
    e => {

        if(e.key === "Enter"){

            const city =
                cityInput.value.trim();

            if(city){
                getWeather(city);
            }
        }
    }
);

// ======================
// FETCH WEATHER
// ======================

async function getWeather(city){

    showLoading();

    try{

        const response =
            await fetch(
                `https://wttr.in/${city}?format=j1`
            );

        if(!response.ok){

            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const data =
            await response.json();

        const current =
            data.current_condition[0];

        renderWeather(city,current);

        saveHistory(city);

    }catch(error){

        showError(
            "Không thể lấy dữ liệu thời tiết!"
        );

        console.error(error);
    }
}

// ======================
// LOADING
// ======================

function showLoading(){

    weatherResult.innerHTML = `
        <div class="loading">
            ⏳ Đang tải...
        </div>
    `;
}

// ======================
// ERROR
// ======================

function showError(message){

    weatherResult.innerHTML = `
        <div class="error">
            ${message}
        </div>
    `;
}

// ======================
// SUCCESS
// ======================

function renderWeather(city,current){

    weatherResult.innerHTML = `
        <div class="weather-card">

            <h2>${city}</h2>

            <img
                src="${current.weatherIconUrl[0].value}"
                alt="weather icon"
            >

            <h3>
                ${current.temp_C}°C
            </h3>

            <p>
                Độ ẩm:
                ${current.humidity}%
            </p>

            <p>
                ${current.weatherDesc[0].value}
            </p>

        </div>
    `;
}

// ======================
// LOCAL STORAGE HISTORY
// ======================

function saveHistory(city){

    let history =
        JSON.parse(
            localStorage.getItem(
                "weatherHistory"
            )
        ) || [];

    history =
        history.filter(
            item =>
            item.toLowerCase()
            !== city.toLowerCase()
        );

    history.unshift(city);

    history = history.slice(0,5);

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(history)
    );

    renderHistory();
}

// ======================
// RENDER HISTORY
// ======================

function renderHistory(){

    const history =
        JSON.parse(
            localStorage.getItem(
                "weatherHistory"
            )
        ) || [];

    if(history.length === 0){

        historyContainer.innerHTML = "";

        return;
    }

    historyContainer.innerHTML =
        `<div class="history-title">
            Tìm kiếm gần đây
        </div>`;

    history.forEach(city => {

        const btn =
            document.createElement("button");

        btn.textContent = city;

        btn.className =
            "history-btn";

        btn.addEventListener(
            "click",
            () => {

                cityInput.value = city;

                getWeather(city);
            }
        );

        historyContainer
            .appendChild(btn);
    });
}

// ======================
// INIT
// ======================

renderHistory();
