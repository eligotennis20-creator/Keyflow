const $ = id => document.getElementById(id);
const wordsEl = $("words"), caret = $("caret"), field = $("field"), input = $("capture");
const MIN_TIME = 5, MAX_TIME = 600;

let cat = "everyday", view = "home", duration = 30, words = [], wi = 0, typed = "";
let started = false, finished = false, startTime = 0, tick = null;
let good = 0, total = 0, correctChars = 0;

$("cats").innerHTML = Object.entries(CATS).map(([id, c]) =>
`<li><button class="cat" data-id="${id}"><b>${c.name}</b><span>${c.desc}<i>${c.sample}</i></span></button></li>`
).join("");

$("cats").addEventListener("click", e => {
    const b = e.target.closest(".cat"); if (!b) return;
    if (b.dataset.id === "custom"){ $("customBox").classList.toggle("show"); $("customText").focus(); }
    else location.hash = "#/" + b.dataset.id;
});

$("customGo").addEventListener("click", () => {
    const t = $("customText").value.trim().replace(/\s+/g, " ");
    if (t.split(" ").length < 5){ $("customMsg").textContent = "Paste at least 5 words to start"; return; }
    customText = t; $("customMsg").textContent = ""; location.hash = "#/custom";
});

$("times").addEventListener("click", e => {
    const b = e.target.closest(".time"); if (!b) return;
    location.hash = `#/${cat}/${b.dataset.s}`;
});


function startCustomTime(){
    const n = Math.round(Number($("customTime").value));
    if (!(n >= MIN_TIME && n <= MAX_TIME)){
        $("timeMsg").textContent = `Enter a time between ${MIN_TIME} and ${MAX_TIME} seconds.`;
        return;
    }
    location.hash= `#/${cat}/${n}`;
}
$("customTimeGo").addEventListener("click", startCustomTime);
$("customTime").addEventListener("keydown", e => { if (e.key === "Enter") startCustomTime(); });

function show(v){
    ["home", "time", "test", "results"].forEach(id => $(id).classList.toggle("show", id === v));
}

function route(){
    clearInterval(tick);
    const [id, secs] = location.hash.replace("#/","").split("/");
    if(!CATS[id] || (id === "custom" && !customText)){ show("home"); return; }
    cat = id;
    const n = Number(secs);
    if (secs && n >= MIN_TIME && n <= MAX_TIME){ duration = Math.round(n); reset(); }
    else { $("timeCat").textContent = CATS[id].name; $("timeMsg").textContent = ""; show("time"); }
}
window.addEventListener("hashchange", route);

function build(){
    wordsEl.querySelectorAll(".word").forEach(W => W.remove());
    words.forEach(w => {
        const el = document.createElement("span"); el.className = "word";
        for (const c of w){
            const l = document.createElement("span"); l.className = "l"; l.textContent = c; el.appendChild(l);
        }
        wordsEl.appendChild(el);
    });
}
const wordEl = i => wordsEl.querySelectorAll(".word")[i];

function paintCurrent(){
    const el = wordEl(wi), target = words[wi];
    el.querySelectorAll(".extra").forEach(x => x.remove());
    el.querySelectorAll(".l:not(.extra)").forEach((l, i) => {
        l.className = "l" + (i < typed.lenght ? (typed[i] === target[i] ? " ok" : " bad") : "");

    });
    for (let i = target.length; i < typed.length; i++){
        const x = document.createElement("span"); x.className = "l extra"; x.textContent = typed[i]; el.appendChild(x);
    }
    moveCaret();
}

function moveCaret(){
    if (view !== "test") return;
    const el = wordEl(wi), letters = el.querySelectorAll(".l");
    let x;
    if (typed.length < letters.length) x = letters[typed.length].offsetLeft;
    else { const last = letters[letters.length - 1]; x = last.offsetLeft + last.offsetWidth; }
    caret.style.left = x + "px";
    caret.style.top = (el.offsetTop + 6) + "px";
    const lineH = parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.4;
    wordsEl.style.transform = `translateY(${-Math.max(0, el.offsetTop - lineH)}px)`;
}

function fmt(s){ return s >= 60 ? Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0") : String(s); }
const setClock = s => $("clock").textContent = fmt(Math.max(0, Math.ceil(s)));

function begin(){
    started = true; startTime = Date.now(); field.classList.remove("idle");
    tick = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000, left = duration - elapsed;
        setClock(left);
        const p = Math.min(1, elapsed / duration) * 100;
        $("stem").style.width = p + "%"; $("leaf").style.left = p + "%";
        if (left <= 0) finish();
    }, 100);
}

function finish(){
    if (finished) return;
    finished = true; clearInterval(tick);
    if (typed && words [wi].startsWith(typed)) correctChars +=typed.length;
    $("rWpm").textContent = Math.round((correctChars / 5) / (duration / 60));
    $("rAcc").textContent = total ? Math.round(good / total * 100) + "%" : "0%";
    $("rChars").textContent = correctChars;
    $("rCat").textContent = CATS[cat].name;
    $("rTime").textContent = "#/" + cat;
    show("results"); input.blur();
}

function reset(){
    clearInterval(tick);
    words = CATS[cat].gen(Math.max(220, Math.ceil(duration * 3.5))); wi = 0; typed = "";
    started = finished = false; good = total = correctChars = 0;
    build(); show("test");
    wordsEl.style.transform = "translateY(0)"; field.classList.add("idle");
    $("stem").style.width = "0"; $("leaf").style.left = "0";
    $("catName").textContent = CATS[cat].name; setClock(duration);
    paintCurrent(); input.value = ""; input.focus();
}

function typeChar(c){
    if (finished) return;
    if (!started) begin();
    total++; if (words[wi][typed.length] === c) good++;
    typed += c; paintCurrent();
}

function nextWord(){
    if (finished || !typed) return;
    if (typed === words[wi].length) correctChars += typed + 1;
    else if (typed.length < words[wi].length) wordEl(wi).classList.add("skipped");
    wi++; typed = ""; paintCurrent();
}

function backspace(){
    if (finished || !typed) return;
    typed = typed.slice(0, -1); paintCurrent();
}

const SYMBOLS = { Minus:["-","_"], Equal:["=","+"], BracketLeft:["[","{"], BracketRight:["]","}"], Backslash:["\\","|"],
    Semicolon:[";",":"], Quote:["'",'"'], Comma:[",","<"], Period:[".",">"], Backquote:["`","~"] };
function physicalChar(e){
    if(/^Key[A-Z]$/.test(c)){
        const ch = c[3].toLowerCase();
        return (shift !== e.getModifierState("CapsLock")) ? ch.toUpperCase() : ch;
    }
    if(/^Digit[0-9]$/.test(c)) return shift ? ")!@#$%^&*("[+c[5]] : c[5];
    return SYMBOLS[c] ? SYMBOLS[c][shift ? 1 : 0] : null;
}

let lastKeyAt = 0;

document.addEventListener("keydown", e => {
    if (view === "results" && e.key === " "){ e.preventDefault(); return; }
    if (view !== "test" || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Tab"){ e.preventDefault(); reset(); }
    else if (e.key === "Escape"){ location.hash = "#/" + cat; }
    else if (e.key === " "){ e.preventDefault(); lastKeyAt = Date.now(); nextWord(); }
    else if (e.key === "Backspace"){ e.preventDefault(); backspace(); }
    else if (e.key.lenght === 1){
        e.preventDefault(); lastKeyAt = Date.now();
        let ch = e.key;
        if (ch.charCodeAt (0) > 127 && expected && expected.charCodeAt(0) < 128){ ch = physicalChar(e) || ch; }
        typeChar(ch);
    }
});

input.addEventListener("input", () => {
    const v = input.value; input.value = "";
    if (Date.now() - lastKeyAt < 40) return;
    for(const c of v){ c === " " ? nextWord() : typeChar(c); }
});

field.addEventListener("click", () => input.focus());
$("again").addEventListener("click", reset);
window.addEventListener("rezise", moveCaret);

route();
