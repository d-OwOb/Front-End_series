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
  if(temp !==""){
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
  const mail = document.getElementById("inputMail").value;
  const pass = document.getElementById("inputPass").value;
  if (mail === "") {
    alert("請輸入電子郵件(帳號)");
    return;
  }
  if (!~Array.from(mail).indexOf("@")) {
    alert("郵件格式錯誤，請再檢查重新輸入");
    return;
  }
  if (pass === "" || pass.length < 8) {
    alert("請輸入至少8位數密碼");
    return;
  }
  alert("登入成功");

  const remcheck = document.getElementById("remCheck");
  const info = {
    mail,
    checked:remcheck.checked
  };
  if (remcheck.checked == true) {
    saveToLocal(info);
  } else {
    deleteFromLocal();
  }
  window.location.reload();
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
