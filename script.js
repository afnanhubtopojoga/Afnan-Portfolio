document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. THEME TOGGLE LOGIC ---
    const darkModeBtn = document.getElementById("darkModeToggle");
    const body = document.body;
    
    if (localStorage.getItem("theme") === "light") {
        body.classList.remove("dark-theme");
        if(darkModeBtn) darkModeBtn.innerText = "Dark Mode";
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            body.classList.toggle("dark-theme");
            if (body.classList.contains("dark-theme")) {
                localStorage.setItem("theme", "dark");
                darkModeBtn.innerText = "Light Mode";
            } else {
                localStorage.setItem("theme", "light");
                darkModeBtn.innerText = "Dark Mode";
            }
        });
    }

    // --- 2. INTERACTIVE GLASSMORPHISM (Mouse Tracking) ---
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 3. MOBILE NAVBAR TOGGLE ---
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // --- 4. BACK TO TOP BUTTON ---
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.remove("hidden");
        } else {
            backToTop.classList.add("hidden");
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- 5. CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); 
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll(".error-msg").forEach(el => el.innerText = "");

            // Validate Name
            const name = document.getElementById("fullName").value.trim();
            if (name.length < 3) {
                document.getElementById("nameError").innerText = "Name must be at least 3 characters long.";
                isValid = false;
            }

            // Validate Email
            const email = document.getElementById("email").value.trim();
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailPattern.test(email)) {
                document.getElementById("emailError").innerText = "Please enter a valid email address.";
                isValid = false;
            }

            // Validate Password
            const password = document.getElementById("password").value;
            const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passPattern.test(password)) {
                document.getElementById("passwordError").innerText = "Password must be 8+ chars with an uppercase letter and a number.";
                isValid = false;
            }

            // Validate Date of Birth
            const dob = document.getElementById("dob").value;
            if (!dob) {
                document.getElementById("dobError").innerText = "Date of Birth is required.";
                isValid = false;
            } else {
                const birthYear = new Date(dob).getFullYear();
                const currentYear = new Date().getFullYear();
                if (currentYear - birthYear < 16) {
                    document.getElementById("dobError").innerText = "You must be at least 16 years old.";
                    isValid = false;
                }
            }

            // Validate Gender
            const gender = document.getElementById("gender").value;
            if (gender === "") {
                document.getElementById("genderError").innerText = "Please select your gender.";
                isValid = false;
            }

            // Validate File Upload
            const photoInput = document.getElementById("profilePhoto");
            if (photoInput && photoInput.files.length === 0) {
                document.getElementById("photoError").innerText = "Identity Module (photo) is required.";
                isValid = false;
            } else if (photoInput && photoInput.files.length > 0) {
                const ext = photoInput.files[0].name.split('.').pop().toLowerCase();
                if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
                    document.getElementById("photoError").innerText = "Only JPG and PNG formats are allowed.";
                    isValid = false;
                }
            }

            // Validate Checkbox
            const terms = document.getElementById("terms").checked;
            if (!terms) {
                document.getElementById("termsError").innerText = "You must verify the transmission (agree to terms).";
                isValid = false;
            }

            // Success Handling
            if (isValid) {
                document.getElementById("successMessage").classList.remove("hidden");
                contactForm.reset();
                setTimeout(() => {
                    document.getElementById("successMessage").classList.add("hidden");
                }, 4000);
            }
        });
    }

    // --- 6. ADVANCED NEURAL BMI CALCULATOR ---
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    
    if (calculateBtn) {
        calculateBtn.addEventListener("click", () => {
            const weight = parseFloat(document.getElementById("weight").value);
            const height = parseFloat(document.getElementById("height").value) / 100; 
            const resultCard = document.getElementById("resultCard");
            
            if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
                alert("System Error: Enter valid positive numbers for mass and height.");
                return;
            }

            const bmi = (weight / (height * height)).toFixed(1);
            const scoreElement = document.getElementById("bmiScore");
            scoreElement.innerText = bmi;

            let category = "";
            let color = "";
            let shadowColor = "";
            let position = 0; 
            let recommendation = "";

            if (bmi < 18.5) {
                category = "Underweight";
                color = "#00f2fe"; 
                shadowColor = "rgba(0, 242, 254, 0.6)";
                position = (bmi / 18.5) * 25; 
                recommendation = "Status: Underweight. Diagnostics suggest an increase in caloric intake and strength training.";
            } else if (bmi >= 18.5 && bmi < 24.9) {
                category = "Optimal State";
                color = "#00ff88"; 
                shadowColor = "rgba(0, 255, 136, 0.6)";
                position = 25 + ((bmi - 18.5) / 6.4) * 25; 
                recommendation = "Status: Optimal. Systems running perfectly. Maintain current nutrition and activity parameters.";
            } else if (bmi >= 25 && bmi < 29.9) {
                category = "Overweight";
                color = "#ffc700"; 
                shadowColor = "rgba(255, 199, 0, 0.6)";
                position = 50 + ((bmi - 25) / 4.9) * 25; 
                recommendation = "Status: Elevated. Minor parameter adjustment recommended. Increase cardiovascular routines.";
            } else {
                category = "Critical Risk (Obese)";
                color = "#ff0055"; 
                shadowColor = "rgba(255, 0, 85, 0.6)";
                position = 75 + Math.min(((bmi - 30) / 10) * 25, 25); 
                recommendation = "Status: Critical. Health parameters exceeding safe limits. Consult medical protocols immediately.";
            }

            const badge = document.getElementById("bmiCategory");
            badge.innerText = category;
            badge.style.color = color;
            badge.style.borderColor = color;
            badge.style.boxShadow = `0 0 15px ${shadowColor}`;
            
            scoreElement.style.color = color;
            scoreElement.style.textShadow = `0 0 25px ${shadowColor}`;
            
            document.getElementById("healthRec").innerText = recommendation;
            document.getElementById("bmiIndicator").style.left = `${position}%`;

            resultCard.classList.remove("hidden");
        });

        resetBtn.addEventListener("click", () => {
            document.getElementById("weight").value = "";
            document.getElementById("height").value = "";
            document.getElementById("resultCard").classList.add("hidden");
        });
    }
});