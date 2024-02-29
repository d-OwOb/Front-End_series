STATE_KEY = "product_card_login_info";

function saveToLocal(info) {
  localStorage.setItem(STATE_KEY, JSON.stringify(info));
}

function getFromLocal() {
  const mail = localStorage.getItem(STATE_KEY);
  if (mail !== null) {
    return mail;
  }
  return "";
}

function deleteFromLocal() {
  localStorage.removeItem(STATE_KEY);
}

function initialInput() {
  const inputMail = document.getElementById("inputMail");
  const remcheck = document.getElementById("remCheck");
  const temp = getFromLocal();
  if (temp !== "") {
    const info = JSON.parse(temp);
    inputMail.value = info.mail;
    remcheck.checked = info.checked;
  }
}

function PassTypeToggle() {
  const target = document.getElementById("inputPass");
  if (target.type == "password") {
    target.type = "text";
  } else {
    target.type = "password";
  }
  const btn = document.getElementById("pass-control");
  btn.classList.toggle("visable");
}

function LoginCheck() {
  if (document.getElementById("inputErrorNotice_mail")) {
    const item = document.getElementById("inputErrorNotice_mail");
    item.remove();
  }
  if (document.getElementById("inputErrorNotice_pass")) {
    const item = document.getElementById("inputErrorNotice_pass");
    item.remove();
  }

  const mail = document.getElementById("inputMail").value;
  const pass = document.getElementById("inputPass").value;

  const inputErrorNotice_mail = document.createElement("div");
  const inputErrorNotice_pass = document.createElement("div");
  inputErrorNotice_mail.classList.add("inputErrorNotice");
  inputErrorNotice_pass.classList.add("inputErrorNotice");

  let errorNum = 0;
  if (mail === "") {
    console.log("in1");
    inputErrorNotice_mail.id = "inputErrorNotice_mail";

    const insert_block = document.getElementById("insert_block_email");
    insert_block.classList.add("inputError");
    inputErrorNotice_mail.innerText = "請輸入電子信箱";
    const email = document.getElementById("email");
    email.appendChild(inputErrorNotice_mail);
    console.log("end1");
    errorNum++;
  } else if (!~Array.from(mail).indexOf("@")) {
    console.log("in2");
    inputErrorNotice.id = "inputErrorNotice_mail";

    const insert_block = document.getElementById("insert_block_email");
    insert_block.classList.add("inputError");
    inputErrorNotice.innerText = "請輸入正確格式(包含@)的電子信箱";
    const email = document.getElementById("email");
    email.appendChild(inputErrorNotice);
    errorNum++;
  }

  if (pass.length < 8 || pass.length > 16) {
    console.log("in3");
    inputErrorNotice_pass.id = "inputErrorNotice_pass";

    const insert_block = document.getElementById("insert_block_password");
    insert_block.classList.add("inputError");
    inputErrorNotice_pass.innerText = "請輸入密碼(8位~16位)";
    const password = document.getElementById("password");
    password.appendChild(inputErrorNotice_pass);
    errorNum++;
  }

  if (errorNum !== 0) {
    return;
  }

  const remcheck = document.getElementById("remCheck");
  const info = {
    mail,
    checked: remcheck.checked,
  };
  if (remcheck.checked == true) {
    saveToLocal(info);
  } else {
    deleteFromLocal();
  }
  alert("登入成功");
  window.location.reload();
}

function mailRecheck() {
  const input = document.getElementById("inputMail");
  const notice = document.getElementById("inputErrorNotice_mail");
  const insert_block = document.getElementById("insert_block_email");
  if (~Array.from(input.value).indexOf("@") && notice) {
    insert_block.classList.remove("inputError");
    notice.remove();
  }
}

function passRecheck(e) {
  const input = document.getElementById("inputPass");
  const notice = document.getElementById("inputErrorNotice_pass");
  const insert_block = document.getElementById("insert_block_password");
  console.log(input.value);
  if (input.value.length >= 8 && input.value.length <= 16 && notice) {
    console.log("in");
    notice.remove();
    insert_block.classList.remove("inputError");
  }
}

//----------------------------------------------------------------------

initialInput();

const passControlBtn = document.getElementById("pass-control");
passControlBtn.addEventListener("click", (e) => {
  PassTypeToggle();
});

const form = document.getElementById("loginBtn");
form.addEventListener("click", (e) => {
  e.preventDefault();
  LoginCheck();
});

const inputMail = document.getElementById("inputMail");
inputMail.addEventListener("change", (e) => {
  mailRecheck();
});

const inputpass = document.getElementById("inputPass");
inputpass.addEventListener("change", (e) => {
  passRecheck(e);
});
