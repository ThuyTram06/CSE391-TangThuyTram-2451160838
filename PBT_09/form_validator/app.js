const app = document.getElementById("app");

app.innerHTML = `
<div class="container">
    <h1>Đăng Ký</h1>

    <form id="registerForm">

        <div class="form-group">
            <label>Họ tên</label>
            <input id="name">
            <small id="nameMsg"></small>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input id="email">
            <div class="error" id="emailError"></div>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" id="password">

            <div class="progress">
                <div id="strengthBar"
                     class="progress-bar"></div>
            </div>

            <small id="passwordMsg"></small>
        </div>

        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" id="confirmPassword">
            <div id="confirmMsg"></div>
        </div>

        <div class="form-group">
            <label>Phone</label>
            <input id="phone">
            <div id="phoneMsg"></div>
        </div>

        <button id="submitBtn" disabled>
            Đăng ký
        </button>

    </form>
</div>

<div id="modal" class="modal hidden">
    <div class="modal-content">
        <h2>Đăng ký thành công!</h2>
        <div id="userInfo"></div>
        <br>
        <button id="closeModal">
            Đóng
        </button>
    </div>
</div>
`;

const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");

const submitBtn = document.getElementById("submitBtn");

let validName = false;
let validEmail = false;
let validPassword = false;
let validConfirm = false;
let validPhone = false;

// ====================
// NAME
// ====================

nameInput.addEventListener("input", () => {

    const value = nameInput.value.trim();

    if(value.length >= 2 && value.length <= 50){
        validName = true;
        document.getElementById("nameMsg")
            .innerHTML = "✅ Hợp lệ";
    }else{
        validName = false;
        document.getElementById("nameMsg")
            .innerHTML = "❌ 2-50 ký tự";
    }

    checkForm();
});

// ====================
// EMAIL
// ====================

emailInput.addEventListener("input", () => {

    const email = emailInput.value;

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(email)){
        validEmail = true;

        document.getElementById("emailError")
            .textContent = "";
    }else{
        validEmail = false;

        document.getElementById("emailError")
            .textContent = "Email không hợp lệ";
    }

    checkForm();
});

// ====================
// PASSWORD STRENGTH
// ====================

passwordInput.addEventListener("input", () => {

    const pwd = passwordInput.value;

    const bar =
        document.getElementById("strengthBar");

    const msg =
        document.getElementById("passwordMsg");

    if(pwd.length < 8){

        bar.style.width = "33%";
        bar.style.background = "red";

        msg.textContent = "Yếu";

        validPassword = false;

    }else if(
        /[A-Za-z]/.test(pwd) &&
        /\d/.test(pwd) &&
        !/[!@#$%^&*]/.test(pwd)
    ){

        bar.style.width = "66%";
        bar.style.background = "orange";

        msg.textContent = "Trung bình";

        validPassword = true;

    }else if(
        /[a-z]/.test(pwd) &&
        /[A-Z]/.test(pwd) &&
        /\d/.test(pwd) &&
        /[!@#$%^&*]/.test(pwd)
    ){

        bar.style.width = "100%";
        bar.style.background = "green";

        msg.textContent = "Mạnh";

        validPassword = true;
    }

    validateConfirm();
    checkForm();
});

// ====================
// CONFIRM PASSWORD
// ====================

confirmInput.addEventListener("input",
    validateConfirm
);

function validateConfirm(){

    if(
        confirmInput.value &&
        confirmInput.value === passwordInput.value
    ){
        validConfirm = true;

        document.getElementById("confirmMsg")
            .innerHTML = "✅ Khớp";
    }else{
        validConfirm = false;

        document.getElementById("confirmMsg")
            .innerHTML = "❌ Không khớp";
    }
}

// ====================
// PHONE FORMAT
// ====================

phoneInput.addEventListener("input", () => {

    let value =
        phoneInput.value.replace(/\D/g,"");

    value = value.substring(0,10);

    if(value.length > 4){
        value =
            value.slice(0,4) +
            "-" +
            value.slice(4);
    }

    if(value.length > 8){
        value =
            value.slice(0,8) +
            "-" +
            value.slice(8);
    }

    phoneInput.value = value;

    const digits =
        value.replace(/\D/g,"");

    if(digits.length === 10){

        validPhone = true;

        document.getElementById("phoneMsg")
            .innerHTML = "✅ Hợp lệ";

    }else{

        validPhone = false;

        document.getElementById("phoneMsg")
            .innerHTML = "❌ Cần 10 chữ số";
    }

    checkForm();
});

// ====================
// ENABLE SUBMIT
// ====================

function checkForm(){

    submitBtn.disabled = !(
        validName &&
        validEmail &&
        validPassword &&
        validConfirm &&
        validPhone
    );
}

// ====================
// SUBMIT
// ====================

form.addEventListener("submit", e => {

    e.preventDefault();

    document
        .getElementById("modal")
        .classList.remove("hidden");

    document
        .getElementById("userInfo")
        .innerHTML = `
            <p><b>Họ tên:</b> ${nameInput.value}</p>
            <p><b>Email:</b> ${emailInput.value}</p>
            <p><b>Phone:</b> ${phoneInput.value}</p>
        `;
});

// ====================
// CLOSE MODAL
// ====================

document.addEventListener("click", e => {

    if(e.target.id === "closeModal"){

        document
            .getElementById("modal")
            .classList.add("hidden");
    }
});
