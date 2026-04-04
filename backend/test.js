fetch("http://localhost:5000/api/admission/submit-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "siyam", email: "test@test.com", phone: "999", course: "BCA" })
}).then(res => res.json()).then(console.log).catch(console.error);
