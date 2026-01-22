document.addEventListener("DOMContentLoaded", () => {
    const signBtn = document.querySelector(".lp-signBtn");
    if (signBtn) {
        signBtn.addEventListener("click", () => {
            window.location.href = "signin.html";
        });
    }

    const notifyBtn = document.querySelector(".lp-registerNotify");
    if (notifyBtn) {
        notifyBtn.addEventListener("click", () => {
            alert("You will be notified when Subzero launches!");
        });
    }
});
