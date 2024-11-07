document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Send the data to the backend (if implemented)
    fetch('/rsvp', {  // Update URL to relative path
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
    })
    // Rest of the code remains the same
    .then(response => {
        if (response.ok) {
            alert('Thank you for your RSVP!');
            this.reset(); // Reset the form
        } else {
            alert('There was an error saving your RSVP.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error saving your RSVP.');
    });
});
