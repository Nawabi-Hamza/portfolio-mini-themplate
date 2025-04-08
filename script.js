// Click events for buttons
const portfolio = document.getElementById("portfolio");
const portfolioBtn = document.getElementById("portfolio-btn");
const skills = document.getElementById("skills");
const skillsBtn = document.getElementById("skills-btn");

portfolioBtn.addEventListener("click", (event) => {
  skills.style.display = "none";
  portfolio.style.display = "flex";
  skillsBtn.classList.remove("active-btn");
  portfolioBtn.classList.add("active-btn");
});

skillsBtn.addEventListener("click", (event) => {
  skills.style.display = "flex";
  portfolio.style.display = "none";
  portfolioBtn.classList.remove("active-btn");
  skillsBtn.classList.add("active-btn");
});

// Light & Dark Theme
document.addEventListener("DOMContentLoaded", () => {
  const toggleThemeButton = document.getElementById("toggleTheme");
  const themeIcon = document.querySelector('img[alt="theme icon"]');
  const githubLogo = document.querySelector('img[alt="github logo"]');
  const linkedinLogo = document.querySelector('img[alt="linkedin logo"]');
  const emailLogo = document.querySelector('img[alt="email logo"]');

  const lightLogos = {
    github: "assets/github_light.png",
    linkedin: "assets/linkedin_light.png",
    email: "assets/email_light.png",
    theme: "assets/theme_light.png",
  };

  const darkLogos = {
    github: "assets/github_dark.png",
    linkedin: "assets/linkedin_dark.png",
    email: "assets/email_dark.png",
    theme: "assets/theme_dark.png",
  };

  function setTheme(isDark) {
    githubLogo.src = isDark ? darkLogos.github : lightLogos.github;
    linkedinLogo.src = isDark ? darkLogos.linkedin : lightLogos.linkedin;
    emailLogo.src = isDark ? darkLogos.email : lightLogos.email;
    themeIcon.src = isDark ? darkLogos.theme : lightLogos.theme;
  }

  toggleThemeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("isDark", isDark);

    setTheme(isDark);
  });

  const loadTheme = () => {
    const isDark = localStorage.getItem("isDark") === "true";
    document.body.classList.toggle("dark-theme", isDark);

    setTheme(isDark);
  };

  // Load saved theme from local storage or default to light theme
  loadTheme();
});



const url = window.location.href
console.log(url.split("=")[1])

// script.js
async function loadPortfolio() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) return;

  const response = await fetch("data.json");
  const data = await response.json();

  const person = data.find((p) => p.id === id);
  if (!person) return;

  document.querySelector("h1").textContent = person.name;
  document.querySelector("h2").textContent = person.title;
  document.querySelector(".hero-pic img").src = person.image;

  // Social links
  document.querySelectorAll(".logo-container a")[0].href = person.github;
  document.querySelectorAll(".logo-container a")[1].href = person.linkedin;
  document.querySelectorAll(".logo-container a")[2].href = `mailto:${person.email}`;

  // CV + Contact
  document.querySelector(".cta a").href = person.cv;
  document.querySelectorAll(".cta a")[1].href = `mailto:${person.email}`;

  // Experience
  const experienceEls = document.querySelectorAll(".experience h2");
  experienceEls[0].innerHTML = `<b>${person.experience.fullStackYears}</b><br />Years<br />Full Stack`;
  experienceEls[1].innerHTML = `<b>${person.experience.bcsYears}</b><br />Years<br />B.C.S`;
  experienceEls[2].innerHTML = `<b>${person.experience.employers}</b><br />Satisfied<br />Employers`;

  // Projects
  const portfolioEl = document.getElementById("portfolio");
  portfolioEl.innerHTML = "";
  person.projects.forEach((project) => {
    const div = document.createElement("div");
    div.className = "wrapper project-wrapper";
    div.innerHTML = `<a href="#"><img src="${project}" alt="Project" /></a>`;
    portfolioEl.appendChild(div);
  });

  // Skills
  const frontendSkills = document.querySelector(".frontend-skills");
  frontendSkills.innerHTML = person.skills.frontend.map(skill => `<p>${skill}</p>`).join("");

  const backendSkills = document.querySelector(".backend-skills");
  backendSkills.innerHTML = person.skills.backend.map(skill => `<p>${skill}</p>`).join("");
}

loadPortfolio();
