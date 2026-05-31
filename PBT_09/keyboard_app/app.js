const images = [
    "https://placehold.co/700x400?text=Image+1",
    "https://placehold.co/700x400?text=Image+2",
    "https://placehold.co/700x400?text=Image+3",
    "https://placehold.co/700x400?text=Image+4",
    "https://placehold.co/700x400?text=Image+5"
];

const commands = [
    "Open Settings",
    "Toggle Dark Mode",
    "Refresh Gallery",
    "Show Help",
    "Go Home"
];

let currentIndex = 0;
let slideshow = null;

// ====================
// UI
// ====================

document.getElementById("app").innerHTML = `
<div class="gallery">

    <h1>Keyboard Accessibility Demo</h1>

    <img
        id="mainImage"
        src="${images[0]}"
        alt="Gallery Image"
    >

    <div class="controls">
        <button id="prevBtn"
            aria-label="Previous image">
            ← Previous
        </button>

        <button id="playBtn"
            aria-label="Play slideshow">
            Play
        </button>

        <button id="nextBtn"
            aria-label="Next image">
            Next →
        </button>

        <button id="openModal"
            aria-label="Open modal">
            Open Modal
        </button>
    </div>

    <div class="thumbnail-list"
         id="thumbnailList">
    </div>

</div>

<div id="imageModal"
     class="modal hidden">

    <div class="modal-content">
        <h2>Modal Window</h2>
        <p>Nhấn ESC để đóng</p>

        <button id="closeModal"
                aria-label="Close modal">
            Close
        </button>
    </div>

</div>

<div id="paletteOverlay"
     class="palette-overlay hidden">

    <div class="palette">

        <input
            id="commandInput"
            placeholder="Type a command..."
            aria-label="Command search"
        >

        <div id="commandList"></div>

    </div>

</div>
`;

// ====================
// Gallery
// ====================

const mainImage =
    document.getElementById("mainImage");

function renderImage(){

    mainImage.src = images[currentIndex];

    document
        .querySelectorAll(".thumbnail")
        .forEach((thumb,index)=>{

            thumb.classList.toggle(
                "active",
                index === currentIndex
            );
        });
}

function nextImage(){

    currentIndex =
        (currentIndex + 1) % images.length;

    renderImage();
}

function prevImage(){

    currentIndex =
        (currentIndex - 1 + images.length)
        % images.length;

    renderImage();
}

// ====================
// Thumbnails
// ====================

const thumbnailList =
    document.getElementById("thumbnailList");

images.forEach((img,index)=>{

    const thumb =
        document.createElement("img");

    thumb.src = img;
    thumb.className = "thumbnail";

    thumb.setAttribute(
        "aria-label",
        `Image ${index+1}`
    );

    thumb.addEventListener("click",()=>{

        currentIndex = index;

        renderImage();
    });

    thumbnailList.appendChild(thumb);
});

renderImage();

// ====================
// Buttons
// ====================

document
.getElementById("nextBtn")
.addEventListener("click",nextImage);

document
.getElementById("prevBtn")
.addEventListener("click",prevImage);

// ====================
// Slideshow
// ====================

function toggleSlideshow(){

    if(slideshow){

        clearInterval(slideshow);

        slideshow = null;

        document
            .getElementById("playBtn")
            .textContent = "Play";

    }else{

        slideshow = setInterval(
            nextImage,
            2000
        );

        document
            .getElementById("playBtn")
            .textContent = "Pause";
    }
}

document
.getElementById("playBtn")
.addEventListener(
    "click",
    toggleSlideshow
);

// ====================
// Modal
// ====================

const modal =
    document.getElementById("imageModal");

document
.getElementById("openModal")
.addEventListener("click",()=>{

    modal.classList.remove("hidden");

    document
        .getElementById("closeModal")
        .focus();
});

document
.getElementById("closeModal")
.addEventListener("click",()=>{

    modal.classList.add("hidden");
});

// ====================
// Command Palette
// ====================

const overlay =
    document.getElementById(
        "paletteOverlay"
    );

const commandInput =
    document.getElementById(
        "commandInput"
    );

const commandList =
    document.getElementById(
        "commandList"
    );

function renderCommands(list){

    commandList.innerHTML = "";

    list.forEach(cmd=>{

        const div =
            document.createElement("div");

        div.className =
            "command-item";

        div.textContent = cmd;

        commandList.appendChild(div);
    });
}

renderCommands(commands);

commandInput.addEventListener(
    "input",
    ()=>{

        const keyword =
            commandInput.value
            .toLowerCase();

        const filtered =
            commands.filter(cmd=>
                cmd.toLowerCase()
                .includes(keyword)
            );

        renderCommands(filtered);
    }
);

// ====================
// Keyboard Shortcuts
// ====================

document.addEventListener(
    "keydown",
    e=>{

        // Ctrl + K
        if(
            e.ctrlKey &&
            e.key.toLowerCase() === "k"
        ){

            e.preventDefault();

            overlay.classList.remove(
                "hidden"
            );

            commandInput.focus();
        }

        // ESC
        if(e.key === "Escape"){

            modal.classList.add(
                "hidden"
            );

            overlay.classList.add(
                "hidden"
            );
        }

        // →
        if(e.key === "ArrowRight"){
            nextImage();
        }

        // ←
        if(e.key === "ArrowLeft"){
            prevImage();
        }

        // Space
        if(e.code === "Space"){

            e.preventDefault();

            toggleSlideshow();
        }

        // 1-9
        const number =
            parseInt(e.key);

        if(
            number >= 1 &&
            number <= images.length
        ){

            currentIndex =
                number - 1;

            renderImage();
        }

        // Enter command
        if(
            e.key === "Enter" &&
            document.activeElement
            === commandInput
        ){

            alert(
                "Command selected: " +
                commandList
                .firstElementChild
                ?.textContent
            );

            overlay.classList.add(
                "hidden"
            );
        }
    }
);
