document.addEventListener("DOMContentLoaded", () => {

    // Sign In
    const signinBtn = document.getElementById("signin-btn");
    if(signinBtn){
        signinBtn.addEventListener("click", async () => {
            const email = document.getElementById("signin-email").value;
            const password = document.getElementById("signin-password").value;

            try{
                const res = await fetch("http://localhost:3000/api/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if(data.success){
                    window.location.href = "dashboard.html";
                } else {
                    alert("Error: " + data.message);
                }
            }catch(err){
                alert("Server not reachable");
            }
        });
    }

    // Sign Up
    const signupBtn = document.getElementById("signup-btn");
    if(signupBtn){
        signupBtn.addEventListener("click", async () => {
            const username = document.getElementById("signup-username").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            try{
                const res = await fetch("http://localhost:3000/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password })
                });
                const data = await res.json();
                if(data.success){
                    window.location.href = "dashboard.html";
                } else {
                    alert("Error: " + data.message);
                }
            }catch(err){
                alert("Server not reachable");
            }
        });
    }

});
