let pass = document.getElementById("password");
let bar = document.getElementById("bar");
let text = document.getElementById("text");
let percent = document.getElementById("percent");
let tips = document.getElementById("tips");
let toggle = document.getElementById("toggle");

// CHECK PASSWORD
pass.addEventListener("input", () => {
    let val = pass.value;
    let score = 0;
    let msg = [];

    if (val.length >= 8) score++; else msg.push("Min 8 characters");
    if (/[A-Z]/.test(val)) score++; else msg.push("Add uppercase");
    if (/[a-z]/.test(val)) score++; else msg.push("Add lowercase");
    if (/[0-9]/.test(val)) score++; else msg.push("Add number");
    if (/[\W]/.test(val)) score++; else msg.push("Add symbol");

    let strength = (score / 5) * 100;

    bar.style.width = strength + "%";
    percent.innerHTML = strength + "% Strength";

    if (strength <= 40) {
        bar.style.background = "red";
        text.innerHTML = "Weak ❌";
    } else if (strength <= 80) {
        bar.style.background = "orange";
        text.innerHTML = "Medium ⚠️";
    } else {
        bar.style.background = "green";
        text.innerHTML = "Strong ✅";
    }

    tips.innerHTML = "";
    msg.forEach(m => {
        let li = document.createElement("li");
        li.innerText = m;
        tips.appendChild(li);
    });

    // SAVE PASSWORD (no duplicates)
    if (val.length > 0) {
        let old = JSON.parse(localStorage.getItem("passwords")) || [];
        if (!old.includes(val)) {
            old.push(val);
            localStorage.setItem("passwords", JSON.stringify(old));
        }
    }
});

// SHOW/HIDE
toggle.onclick = () => {
    pass.type = pass.type === "password" ? "text" : "password";
};

// GENERATE PASSWORD
function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < 12; i++) {
        pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    pass.value = pwd;
    pass.dispatchEvent(new Event("input"));
}

// COPY PASSWORD
function copyPassword() {
    navigator.clipboard.writeText(pass.value);
    alert("Copied!");
}

// DARK/LIGHT MODE
function toggleMode() {
    document.body.classList.toggle("light");
}