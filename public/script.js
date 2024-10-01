document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        rollNo: document.getElementById('rollNo').value,
        age: document.getElementById('age').value,
        department: document.getElementById('department').value
    };

    // Send the form data to the server
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Student data submitted successfully');
        // Reset form
        document.getElementById('studentForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('downloadExcel').addEventListener('click', function() {
    // Trigger the server to generate and download the Excel file
    window.location.href = '/download-excel';
});
