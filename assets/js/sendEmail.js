function sendMail(contactForm) {
  emailjs.send("gmail","contact_resume",{
    "from_name": contactForm.name.value,
    "from_email": contactForm.emailaddress.value,
    "company": contactForm.company.value,
    "project_request": contactForm.projectsummary.value,
  })
  .then(
    function(response) {
    console.log("SUCCESS", response);
  }, 
  function(error) {
    console.log("FAILED", error)
  })
  .then(
    function(response) {
       alert("Your message has been sent");
        window.location = "contact.html";
    },
    function(error) {
        console.log("FAILED", error);
        alert('Your message could not be sent. Please try again');
        window.location = 'contact.html';
    }
);
return false;  // To block from loading a new page
;
}

