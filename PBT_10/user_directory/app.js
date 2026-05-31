// =======================
// STATE
// =======================

let users = [];
let editingId = null;

// =======================
// API LAYER
// =======================

const api = {

    baseURL:
        "https://jsonplaceholder.typicode.com",

    async getUsers() {

        const response =
            await fetch(
                `${this.baseURL}/users`
            );

        if(!response.ok){
            throw new Error("Load users failed");
        }

        return response.json();
    },

    async getUser(id) {

        const response =
            await fetch(
                `${this.baseURL}/users/${id}`
            );

        if(!response.ok){
            throw new Error("Load user failed");
        }

        return response.json();
    },

    async createUser(data) {

        const response =
            await fetch(
                `${this.baseURL}/users`,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":
                        "application/json"
                    },
                    body:JSON.stringify(data)
                }
            );

        if(!response.ok){
            throw new Error("Create failed");
        }

        return response.json();
    },

    async updateUser(id,data){

        const response =
            await fetch(
                `${this.baseURL}/users/${id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":
                        "application/json"
                    },
                    body:JSON.stringify(data)
                }
            );

        if(!response.ok){
            throw new Error("Update failed");
        }

        return response.json();
    },

    async deleteUser(id){

        const response =
            await fetch(
                `${this.baseURL}/users/${id}`,
                {
                    method:"DELETE"
                }
            );

        if(!response.ok){
            throw new Error("Delete failed");
        }

        return true;
    }
};

// =======================
// UI LAYER
// =======================

const ui = {

    renderUsers(data){

        const list =
            document.getElementById(
                "userList"
            );

        list.innerHTML = "";

        data.forEach(user => {

            const card =
                document.createElement("div");

            card.className =
                "user-card";

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>${user.email}</p>

                <div class="actions">
                    <button
                        onclick="editUser(${user.id})">
                        Edit
                    </button>

                    <button
                        onclick="deleteUser(${user.id})">
                        Delete
                    </button>
                </div>
            `;

            list.appendChild(card);
        });
    },

    showLoading(){

        const loading =
            document.getElementById(
                "loading"
            );

        loading.innerHTML = "";

        for(let i=0;i<5;i++){

            const skeleton =
                document.createElement("div");

            skeleton.className =
                "skeleton";

            loading.appendChild(
                skeleton
            );
        }
    },

    hideLoading(){

        document
        .getElementById("loading")
        .innerHTML = "";
    },

    showError(message){

        showToast(message,"error");
    },

    showSuccess(message){

        showToast(message,"success");
    }
};

// =======================
// TOAST
// =======================

function showToast(
    message,
    type
){

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.textContent =
        message;

    document
    .getElementById("toast")
    .appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);
}

// =======================
// LOAD USERS
// =======================

async function loadUsers(){

    try{

        ui.showLoading();

        users =
            await api.getUsers();

        ui.hideLoading();

        ui.renderUsers(users);

    }catch(error){

        ui.hideLoading();

        ui.showError(
            error.message
        );
    }
}

loadUsers();

// =======================
// SEARCH
// =======================

document
.getElementById("searchInput")
.addEventListener(
    "input",
    function(){

        const keyword =
            this.value.toLowerCase();

        const filtered =
            users.filter(user =>
                user.name
                .toLowerCase()
                .includes(keyword)
                ||
                user.email
                .toLowerCase()
                .includes(keyword)
            );

        ui.renderUsers(filtered);
    }
);

// =======================
// CREATE / UPDATE
// =======================

document
.getElementById("userForm")
.addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        const name =
            document
            .getElementById("name")
            .value;

        const email =
            document
            .getElementById("email")
            .value;

        try{

            if(editingId){

                const updated =
                    await api.updateUser(
                        editingId,
                        {name,email}
                    );

                users =
                    users.map(user =>
                        user.id === editingId
                        ? updated
                        : user
                    );

                ui.showSuccess(
                    "User updated"
                );

            }else{

                const newUser =
                    await api.createUser(
                        {name,email}
                    );

                users.unshift(newUser);

                ui.showSuccess(
                    "User created"
                );
            }

            ui.renderUsers(users);

            this.reset();

            editingId = null;

        }catch(error){

            ui.showError(
                error.message
            );
        }
    }
);

// =======================
// EDIT
// =======================

async function editUser(id){

    try{

        const user =
            await api.getUser(id);

        document
        .getElementById("name")
        .value = user.name;

        document
        .getElementById("email")
        .value = user.email;

        editingId = id;

    }catch(error){

        ui.showError(
            error.message
        );
    }
}

// =======================
// DELETE
// =======================

async function deleteUser(id){

    const confirmDelete =
        confirm(
            "Bạn có chắc muốn xóa?"
        );

    if(!confirmDelete){
        return;
    }

    try{

        await api.deleteUser(id);

        users =
            users.filter(
                user =>
                user.id !== id
            );

        ui.renderUsers(users);

        ui.showSuccess(
            "User deleted"
        );

    }catch(error){

        ui.showError(
            error.message
        );
    }
}
