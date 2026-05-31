const gallery =
    document.querySelector("#gallery");

const loading =
    document.querySelector("#loading");

const lightbox =
    document.querySelector("#lightbox");

const lightboxImg =
    document.querySelector("#lightboxImg");

const closeBtn =
    document.querySelector("#closeBtn");

let page = 1;
let isLoading = false;

// ======================
// LOAD PHOTOS
// ======================

async function loadMorePhotos(){

    if(isLoading) return;

    isLoading = true;

    loading.style.display = "block";

    try{

        const response =
            await fetch(
                `https://picsum.photos/v2/list?page=${page}&limit=20`
            );

        if(!response.ok){
            throw new Error(
                "Không thể tải ảnh"
            );
        }

        const photos =
            await response.json();

        renderPhotos(photos);

        page++;

    }catch(error){

        console.error(error);

        loading.textContent =
            "Lỗi tải dữ liệu";

    }finally{

        loading.style.display = "none";

        isLoading = false;
    }
}

// ======================
// RENDER
// ======================

function renderPhotos(photos){

    photos.forEach(photo => {

        const card =
            document.createElement("div");

        card.className =
            "photo-card";

        const img =
            document.createElement("img");

        img.dataset.src =
            photo.download_url;

        img.alt =
            photo.author;

        img.loading = "lazy";

        observeImage(img);

        card.appendChild(img);

        card.addEventListener(
            "click",
            () => {
                openLightbox(
                    photo.download_url
                );
            }
        );

        gallery.appendChild(card);
    });
}

// ======================
// LAZY LOADING
// ======================

const imageObserver =
new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                const img =
                    entry.target;

                img.src =
                    img.dataset.src;

                imageObserver
                    .unobserve(img);
            }
        });

    },
    {
        threshold:0.1
    }
);

function observeImage(img){

    imageObserver.observe(img);
}

// ======================
// INFINITE SCROLL
// ======================

const loadObserver =
new IntersectionObserver(
    entries => {

        if(entries[0].isIntersecting){

            loadMorePhotos();
        }

    },
    {
        threshold:0.1
    }
);

loadObserver.observe(
    document.querySelector(
        "#load-trigger"
    )
);

// ======================
// LIGHTBOX
// ======================

function openLightbox(url){

    lightbox.style.display =
        "flex";

    lightboxImg.src = url;
}

function closeLightbox(){

    lightbox.style.display =
        "none";
}

closeBtn.addEventListener(
    "click",
    closeLightbox
);

lightbox.addEventListener(
    "click",
    e => {

        if(e.target === lightbox){
            closeLightbox();
        }
    }
);

// ======================
// INIT
// ======================

loadMorePhotos();
