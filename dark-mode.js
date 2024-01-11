const sun = document.querySelector(".sun")
const moon = document.querySelector(".moon")

const userTheme = localStorage.getItem("theme")
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

const iconToggle = () => {
    moon.classList.toggle("hidden")
    sun.classList.toggle("hidden")
}

const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark")
        moon.classList.add("hidden")
        return
    }
    sun.classList.add("hidden")
}

const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
        iconToggle()
        return
    }
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
    iconToggle()
}

sun.addEventListener("click", () => themeSwitch())

moon.addEventListener("click", () => themeSwitch())

themeCheck()