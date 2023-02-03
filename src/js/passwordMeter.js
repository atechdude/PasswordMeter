class PasswordChecker {
    static instance = null;

    static getInstance(options) {
        if (!PasswordChecker.instance) {
            PasswordChecker.instance = new PasswordChecker(options);
        }
        return PasswordChecker.instance;
    }

    constructor(options) {
        "use strict";
        this.passwordField = options.passwordField;
        this.strongRegex = options.strongRegex || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{10,16}$/;
        this.mediumRegex = options.mediumRegex || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,9}$/;
        this.weakRegex = options.weakRegex || /^[a-zA-Z]{0,16}$/;
        this.displayElement = options.displayElement;
        this.submitButtonClass = options.submitButtonClass;
        this.strongDisplayText = options.strongDisplayText || "Strong";
        this.strongClass = options.strongClass || "strong";
        this.mediumDisplayText = options.mediumDisplayText || "Medium";
        this.mediumClass = options.mediumClass || "medium";
        this.weakDisplayText = options.weakDisplayText || "Weak";
        this.weakClass = options.weakClass || "weak";

        const passwordField = document.querySelector(this.passwordField);

        passwordField.addEventListener("keyup",
            (e) => {
                this.checkPassword(e.target.value);
            });

        passwordField.addEventListener("keydown",
            (e) => {
                this.checkPassword(e.target.value);
            });
    }


    updateDisplayAndButton(val, regex, displayText, className, submitButtonEnabled) {
        const displayElement = document.querySelector(this.displayElement);
        let submitButton = null;
        if (this.submitButtonClass) {
            const form = displayElement.closest("form");
            submitButton = form.querySelector(this.submitButtonClass);
        }
        displayElement.textContent = displayText;
        displayElement.classList.remove(this.strongClass, this.mediumClass, this.weakClass);
        displayElement.classList.add(className);
        
        if (submitButton) {
            if (submitButtonEnabled) {
                submitButton.removeAttribute("disabled");
            } else {
                submitButton.setAttribute("disabled", true);
            }
        }
    }

    checkPassword(val) {

        if (val.length === 0) {
            return;
        }
        if (this.strongRegex.test(val)) {
            this.updateDisplayAndButton(val, this.strongRegex, this.strongDisplayText, this.strongClass, true);
        } else if (this.mediumRegex.test(val)) {
            this.updateDisplayAndButton(val, this.mediumRegex, this.mediumDisplayText, this.mediumClass, true);
        } else if (this.weakRegex.test(val)) {
            this.updateDisplayAndButton(val, this.weakRegex, this.weakDisplayText, this.weakClass, false);
        }
    }
}