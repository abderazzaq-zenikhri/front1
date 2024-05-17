const plane1Btn = document.querySelector("#plane-1");
const plane2Btn = document.querySelector("#plane-2");

// handle auth in nav
function logout() {
  console.log(`click`);
  localStorage.removeItem(`session`);
  window.location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  const accountNavItem = document.getElementById("account-nav-item");
  const accountNavList = document.getElementById("account-nav-list");
  const session = JSON.parse(localStorage.getItem("session"));

  if (session) {
    if (!session.isAdmin) {
      accountNavItem.innerHTML =
        '<a class="main-nav-link nav-cta" href="/account.html">My Account</a>';
    }
    if (session.isAdmin) {
      accountNavItem.innerHTML =
        '<a class="main-nav-link nav-cta" href="/admin.html">Dashboard</a>';
    }
    accountNavList.innerHTML += `<li><a id="logout-btn" href="#" class="main-nav-link nav-cta">Logout</a></li>`;
  } else {
    accountNavItem.innerHTML =
      '<a class="main-nav-link nav-cta" href="/sign-in.html">Login</a>';
  }
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", logout);
});

// handle planes clicks
const handleSubscriptionCreation = async (plane) => {
  const session = JSON.parse(localStorage.getItem("session"));

  if (!session) {
    return (window.location.href = "/sign-up.html");
  }
  if (session?.isAdmin) {
    return alert("Admins cant make subscriptions!");
  }
  localStorage.setItem("plane", JSON.stringify(plane));

  // api req : making subscriptoin
  const email = session.email;
  const data = { email, plane };

  const response = await fetch(
    "https://zed-food-api.vercel.app/api/subscription/create",
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
