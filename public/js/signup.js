const messageElement = document.querySelector("#message");
const loginBtn = document.querySelector(".login-btn");

const showMessage = (message, type) => {
    if (type) {
        messageElement.classList.add("success");
        messageElement.textContent = message;
    } else {
        messageElement.classList.add("error");
        messageElement.textContent = message;
    }
    setTimeout(() => {
        messageElement.removeAttribute("class");
        messageElement.textContent = "";
    }, 2500);
};
const isValid = (name, email, password) => {
    if (name.trim() === "") {
        showMessage("Enter User Name", false);
        return false;
    } else if (email.trim() === "") {
        showMessage("Enter Email Address", false);
        return false;
    } else if (password.trim() === "") {
        showMessage("Enter Password", false);
        return false;
    } else {
        return true;
    }
};
const loginNow = async (name, email, password) => {
    try {
        const url = "/auth/signup";
        loginBtn.textContent = "Processing..."
        const req = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        const res = await req.json();
        if(res?.success){
            let data = {user : res.user, token:res.token}
            localStorage.setItem("tempchat",JSON.stringify(data))
            showMessage(res?.message,true)
            setTimeout(() => {
                window.location.href="/"
            }, 2500);
        }else {
            showMessage(res?.message,false)
        }
    } catch (err) {
        console.error("Error : ", err);
        showMessage(res?.message,false)
    } finally {
        loginBtn.textContent = "Create Account"
    }
};
loginBtn.onclick = async () => {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (!isValid(name, email, password)) return;
    await loginNow(name.trim(), email.trim(), password.trim());
};
