document.addEventListener("DOMContentLoaded",
    () => {
        // Define a container this should be and element on your page with a css class of container.
        // <div class="container"></div>
        const container = document.querySelector(".container");

        // These are the options which get passed to the constructor of the PasswordChecker
        const options = {
            passwordField: ".password",
            displayElement: ".password-strength",
            submitButtonClass: ".btn-create-account"
        };

        // Create an instance of our PassWordChecker
        const passwordChecker = PasswordChecker.getInstance(options);

        // Wire up Click Events for the Ajax-Container
        container.addEventListener("click",
            event => {
                event.preventDefault();
                const { target } = event;
                if (target.matches(".btn-create-account")) {
                    event.preventDefault();


                }
            });
    });