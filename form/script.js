document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let gender = document.getElementById("gender").value;
    let course = document.getElementById("course").value;
    let address = document.getElementById("address").value.trim();

    if (!name || !email || !age || !phone || !gender || !course || !address) {
        alert("Please fill all fields");
        return;
    }

    if (!email.includes("@")) {
        alert("Invalid email");
        return;
    }

    if (phone.length !== 10) {
        alert("Phone must be 10 digits");
        return;
    }

    if (age < 1 || age > 100) {
        alert("Enter valid age");
        return;
    }

    alert(
        "Registration Successful 🎉\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Course: " + course
    );

    document.getElementById("myForm").reset();
});