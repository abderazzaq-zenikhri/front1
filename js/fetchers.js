export const handleSubscriptionCreation = async (plane) => {
  console.log("click");

  localStorage.setItem("plane", JSON.stringify(plane));

  const session = JSON.parse(localStorage.getItem("session"));
  if (!session) {
    window.location.href = "/sign-up.html";
  }

  // api req : making subscriptoin
  const email = session.email;
  const data = { email, plane: plane.plane };

  const response = await fetch(
    "http://localhost:3000/api/subscription/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    window.location.href = "/account";
  } else {
    const errorMessage = await response.text();
    alert("subscription failed: " + errorMessage);
  }
};
