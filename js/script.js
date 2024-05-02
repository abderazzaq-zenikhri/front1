const myName = "Jonas Schmedtmann";
const h1 = document.querySelector(".heading-primary");
const plane1Btn = document.querySelector("#plane-1");
const plane2Btn = document.querySelector("#plane-2");

// handle planes clicks
const handleSubscriptionCreation = async (plane) => {
  console.log("click");

  localStorage.setItem("plane", JSON.stringify(plane));

  const session = JSON.parse(localStorage.getItem("session"));
  if (!session) {
    window.location.href = "/sign-up.html";
  }

  // api req : making subscriptoin
  const email = session.email;
  const data = { email, plane };

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
    window.location.href = "/account.html";
  } else {
    const errorMessage = await response.text();
    alert("subscription failed: " + errorMessage);
  }
};
plane1Btn.addEventListener(
  "click",
  handleSubscriptionCreation.bind(null, "STARTER")
);
plane2Btn.addEventListener(
  "click",
  handleSubscriptionCreation.bind(null, "COMPLETE")
);
///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
