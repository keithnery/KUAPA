const sourceSelect = document.getElementById("source-language");
const targetSelect = document.getElementById("target-language");
const swapButton = document.getElementById("swap");
const sourceText = document.getElementById("source-text");
const targetText = document.getElementById("target-text");

const commonLanguages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Português" }
];

const indigenousLanguages = [
    { code: "tp", name: "Tupi Potiguara" },
    { code: "yt", name: "Yaathe" }
];

const messages = {
    en: "No translation yet.",
    pt: "Ainda não há tradução."
};

let toIndigenous = true;
let hasTranslation = false;
let dictionary = [];

async function loadDictionary() {
    try {
        const response = await fetch("dictionary.json");
        dictionary = await response.json();
        updateTranslation();
    } catch (error) {
        console.error("Error loading dictionary:", error);
    }
}

function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translate(text, source, target) {
    text = text.trim();

    for (const item of dictionary) {
        if (!item[source]?.length || !item[target]?.length) continue;

        for (const sentence of item[source]) {
            if (sentence.includes("{x}")) {
                const pattern = escapeRegex(sentence).replace(escapeRegex("{x}"), "(.*)");
                const match = text.match(new RegExp("^" + pattern + "$", "i"));
                if (match) {
                    return item[target][0].replace("{x}", match[1]);
                }
            } else if (sentence === text.toLowerCase()) {
                return item[target][0];
            }
        }
    }

    return null;
}

function getCommonLanguage() {
    return toIndigenous ? sourceSelect.value : targetSelect.value;
}

function updateTranslation() {
    const text = sourceText.value.trim();

    targetText.classList.remove("no-translation");
    hasTranslation = false;

    if (text === "") {
        targetText.value = "";
        return;
    }

    const result = translate(text, sourceSelect.value, targetSelect.value);  

    if (result === null) {
        targetText.value = messages[getCommonLanguage()];
        targetText.classList.add("no-translation");
    } else {
        targetText.value = result;
        hasTranslation = true;
    }
}

function fillSelect(select, languages, selectedCode) {
    select.innerHTML = "";
    for (const language of languages) {
        select.add(new Option(language.name, language.code));
    }
    select.value = selectedCode;
}

function swapDirection() {
    const oldSource = sourceSelect.value;
    const oldTarget = targetSelect.value;

    toIndigenous = !toIndigenous;

    fillSelect(sourceSelect, toIndigenous ? commonLanguages : indigenousLanguages, oldTarget);
    fillSelect(targetSelect, toIndigenous ? indigenousLanguages : commonLanguages, oldSource);

    sourceText.value = hasTranslation ? targetText.value : "";
    updateTranslation();
}

sourceText.addEventListener("input", updateTranslation);
sourceSelect.addEventListener("change", updateTranslation);
targetSelect.addEventListener("change", updateTranslation);
swapButton.addEventListener("click", swapDirection);

loadDictionary();

const logo = document.querySelector("#logo img");
const forestSound = new Audio("assets/mata.mp3");

const startAt = 12;
const duration = 6;
let stopTimer;

logo.addEventListener("click", () => {
    clearTimeout(stopTimer);
    forestSound.currentTime = startAt;
    forestSound.play();
    stopTimer = setTimeout(() => forestSound.pause(), duration * 1000);
});