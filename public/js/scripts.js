(function ($) {

    $('#registrationForm').on('submit', async function (e) {

        e.preventDefault();

        let data = JSON.stringify(Object.fromEntries(new FormData(e.target)));
        const response = await addUser(data);

        if (response.loggedIn) {
            alert('Registration completed, you are logged in!')
            window.location.href = response.redirectTo;
        }

    })


    async function addUser(data) {

        let fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: data
        };
        const response = await fetch('http://127.0.0.1:4003/auth/add-user', fetchOptions);
        return response.json();
    }



}(jQuery));
