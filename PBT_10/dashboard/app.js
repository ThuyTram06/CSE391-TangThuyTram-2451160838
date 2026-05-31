const globalLoading =
    document.querySelector(
        "#globalLoading"
    );

const loadTime =
    document.querySelector(
        "#loadTime"
    );

const refreshBtn =
    document.querySelector(
        "#refreshBtn"
    );

const widgets = {
    user:
        document.querySelector(
            "#userWidget"
        ),

    weather:
        document.querySelector(
            "#weatherWidget"
        ),

    dog:
        document.querySelector(
            "#dogWidget"
        )
};

// ====================
// UI HELPERS
// ====================

function showWidgetLoading(el){

    el.innerHTML = `
        <div class="loading">
            Loading...
        </div>
    `;
}

function renderWidgetError(
    el,
    message
){

    el.innerHTML = `
        <div class="error">
            ${message}
        </div>
    `;
}

// ====================
// RENDER FUNCTIONS
// ====================

function renderUser(data){

    const user =
        data.results[0];

    widgets.user.innerHTML = `
        <img
            class="avatar"
            src="${user.picture.large}"
        >

        <h3>
            ${user.name.first}
            ${user.name.last}
        </h3>

        <p>${user.email}</p>

        <p>${user.location.country}</p>
    `;
}

function renderWeather(data){

    const weather =
        data.current_weather;

    widgets.weather.innerHTML = `
        <h3>
            ${weather.temperature}°C
        </h3>

        <p>
            Wind:
            ${weather.windspeed}
            km/h
        </p>

        <p>
            Weather Code:
            ${weather.weathercode}
        </p>
    `;
}

function renderDog(data){

    widgets.dog.innerHTML = `
        <img
            class="dog-img"
            src="${data.message}"
            alt="Dog"
        >
    `;
}

// ====================
// MAIN DASHBOARD
// ====================

async function loadDashboard(){

    const startTime =
        Date.now();

    globalLoading.style.display =
        "block";

    showWidgetLoading(
        widgets.user
    );

    showWidgetLoading(
        widgets.weather
    );

    showWidgetLoading(
        widgets.dog
    );

    const results =
        await Promise.allSettled([

            fetch(
                "https://randomuser.me/api/"
            ).then(r => r.json()),

            fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"
            ).then(r => r.json()),

            fetch(
                "https://dog.ceo/api/breeds/image/random"
            ).then(r => r.json())

        ]);

    results.forEach(
        (result,index) => {

            if(
                result.status
                === "fulfilled"
            ){

                switch(index){

                    case 0:
                        renderUser(
                            result.value
                        );
                        break;

                    case 1:
                        renderWeather(
                            result.value
                        );
                        break;

                    case 2:
                        renderDog(
                            result.value
                        );
                        break;
                }

            }else{

                switch(index){

                    case 0:
                        renderWidgetError(
                            widgets.user,
                            result.reason.message
                        );
                        break;

                    case 1:
                        renderWidgetError(
                            widgets.weather,
                            result.reason.message
                        );
                        break;

                    case 2:
                        renderWidgetError(
                            widgets.dog,
                            result.reason.message
                        );
                        break;
                }
            }
        }
    );

    globalLoading.style.display =
        "none";

    loadTime.textContent =
        `Data loaded in ${
            Date.now() - startTime
        } ms`;
}

// ====================
// REFRESH
// ====================

refreshBtn.addEventListener(
    "click",
    loadDashboard
);

// ====================
// INIT
// ====================

loadDashboard();
