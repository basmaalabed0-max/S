const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const screens = $$(".screen");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   النجوم
========================= */

const stars = $("#stars");

for (let i = 0; i < 75; i++) {
  const star = document.createElement("span");

  star.className = "star";

  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${2.5 + Math.random() * 3}s`;

  stars.appendChild(star);
}


/* =========================
   البداية
========================= */

$$("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.next);
  });
});


/* =========================
   المغلفات
========================= */

const envelopeMessages = [
  "مش لازم تكوني قوية طول الوقت.",

  "خدي وقتك… بس لا تنسي إن الأيام الثقيلة بتعدّي.",

  "اللي راح، راح… وربنا قادر يعوّضك بشي ما خطر ببالك.",

  "وفي حدا من بعيد، نفسه يشوف ضحكتك ترجع زي زمان. 🫂",

  "واشتقتلك 😒 وانتي عارفة انو حياتي مش حلوة بدونك 🤔<br>بكفي قلة ادب 🤌🏻 بس برضو خدي وقتك وكوني بخير 🫂"
];

const envelopeGrid = $("#envelopeGrid");

envelopeMessages.forEach((message, index) => {

  const envelope = document.createElement("button");

  envelope.className = "envelope";

  envelope.innerHTML = `
    <span class="envelope-number">${index + 1}</span>

    <span class="envelope-shape"></span>
    <span class="envelope-flap"></span>

    <span class="envelope-label">
      افتحي 💌
    </span>

    <span class="envelope-message">
      ${message}
    </span>
  `;

  envelope.addEventListener("click", () => {

    if (envelope.classList.contains("opened")) return;

    envelope.classList.add("opened");

    if ($$(".envelope.opened").length === envelopeMessages.length) {
      $("#toDoors").classList.remove("hidden");
    }

  });

  envelopeGrid.appendChild(envelope);
});


$("#toDoors").addEventListener("click", () => {
  showScreen("doors");
});


/* =========================
   الأبواب
========================= */

const doors = [
  {
    number: "01",
    emoji: "❤️",
    title: "شو مخبّي وراه؟ 👀",
    decor: "🦋 ✨ 🦋 ✨",
    body: `
      ما في شي كبير… بس حبيت أخبّي هون شوية حلو إلك 🦋💜
      <span class="door-small">ابتسمي 🤍</span>
    `
  },

  {
    number: "02",
    emoji: "🩷",
    title: "يمكن تلاقي شي حلو هون",
    decor: "✨ · ✨ · ✨",
    body: `
      ياريت لو عندي القدرة إني أوصي الدنيا عليكِ إنها ما تأذيكِ أبدًا…
      ياريت لو أقدر أجمع سعادة الدنيا كلها وأحطها بقلبكِ. 🤍
    `
  },

  {
    number: "03",
    emoji: "🍷",
    title: "ممنوع الفضول 🤨 😂",
    decor: "🌸 💗 🌸",
    body: `
      للفضول… 🤨
      واضح إنك ماشية صح، كمّلي 😂🌸
      <span class="door-small">لسه في شي مستنيكِ 🤍</span>
    `
  },

  {
    number: "04",
    emoji: "💜",
    title: "آخر باب… يمكن 😏",
    decor: "🌙 ✨ · ✨",
    body: `
      وصلتي لآخر باب… 🌙
      وثقتِ في الحكاية لحد هون، فلا توقفي هسه. 🤍
      <span class="door-small">جاهزة لآخر جولة؟ 🎡</span>
    `
  }
];

const doorGrid = $("#doorGrid");

doors.forEach((door, index) => {

  const button = document.createElement("button");

  button.className = `door door-${index + 1}`;

  button.innerHTML = `
    <span class="door-number">${door.number}</span>
    <span class="door-symbol">${door.emoji}</span>
    <span class="door-title">${door.title}</span>
  `;

  button.addEventListener("click", () => {
    openDoor(door, index);
  });

  doorGrid.appendChild(button);
});


const doorModal = $("#doorModal");
const doorModalTitle = $("#doorModalTitle");
const doorModalBody = $("#doorModalBody");
const doorDecor = $("#doorDecor");


function openDoor(door, index) {

  doorModalTitle.textContent = door.title;
  doorModalBody.innerHTML = door.body;
  doorDecor.textContent = door.decor;

  doorModal.classList.add("show");
  doorModal.setAttribute("aria-hidden", "false");

  if (index === 3) {

    doorModalBody.style.animation = "none";

    setTimeout(() => {
      doorModalBody.style.animation = "fadeIn 1.2s ease";
    }, 50);

  }
}


function closeDoorModal() {

  doorModal.classList.remove("show");
  doorModal.setAttribute("aria-hidden", "true");

}


$("#closeDoor").addEventListener("click", closeDoorModal);
$("#closeDoorCta").addEventListener("click", closeDoorModal);


/* =========================
   إغلاق النوافذ بالخلفية
========================= */

$$(".modal-backdrop").forEach(backdrop => {

  backdrop.addEventListener("click", () => {

    if (doorModal.classList.contains("show")) {
      closeDoorModal();
    }

    if ($("#resultModal").classList.contains("show")) {
      closeResultModal();
    }

  });

});


/* =========================
   فتح الأبواب
========================= */

const doorButtons = () => $$(".door");

doorButtons().forEach(button => {

  button.addEventListener("click", () => {

    setTimeout(() => {

      button.dataset.opened = "true";

      if (
        doorButtons().every(
          door => door.dataset.opened === "true"
        )
      ) {
        $("#toWheel").classList.remove("hidden");
      }

    }, 50);

  });

});


$("#toWheel").addEventListener("click", () => {
  showScreen("wheel");
});


/* =========================
   العجلة 🎡
========================= */

const wheel = $("#wheelEl");
const spinButton = $("#spinBtn");


const wheelResults = [

  {
    icon: "💌",
    label: "رسالة",
    title: "",
    body: "بس حبيت أذكّرك إنك أحلى وأحن حد بالكون. 🤍"
  },

  {
    icon: "🫂",
    label: "طلب",
    title: "",
    body: "هسه بدّي منك تبعتيلي صورة لابتسامتك… حتى لو مصطنعة 😂🤌🏻"
  },

  {
    icon: "🌸",
    label: "مهمة صغيرة",
    title: "",
    body: "قومي جيبي إشي بتحبيه وكافئي حالك فيه… بدون تأنيب ضمير 😌"
  },

  {
    icon: "🎲",
    label: "اختيار غريب",
    title: "",
    body: "اختاري رقم من 1 لـ10… وما تسألي ليه 🤨😂",
    numbers: true
  },

  {
    icon: "💜",
    label: "رسالة ثانية",
    title: "",
    body: "وجودك بحياتي من الأشياء اللي ما بعتبرها عادية أبدًا. 🫂"
  },

  {
    icon: "🎲",
    label: "حظك اليوم",
    title: "",
    body: "حظك اليوم يقول: بكرا ألطف من اليوم… فاستني شوي 🤍"
  },

  {
    icon: "✨",
    label: "أمنية",
    title: "",
    body: "تمني أمنية صغيرة إلك… وما تحكيها لحدا. 🤍"
  },

  {
    icon: "🎁",
    label: "مفاجأة",
    title: "",
    body: "وصلتي لهون؟ طيب استني… لسه في شي إلك. 👀"
  }

];


/* =========================
   نتائج الأرقام
========================= */

const numberResults = {

  1: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  2: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  3: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  4: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  5: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  6: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  7: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  8: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  9: "ابعتي ريكورد إلي 🤷🏼‍♀️😂",
  10: "ابعتي ريكورد إلي 🤷🏼‍♀️😂"

};


let remainingWheelIndices =
  wheelResults.map((_, index) => index);

let wheelRotation = 0;
let spinning = false;
let selectedWheelIndex = null;


/* ألوان القطع */

const wheelColors = [
  "#8c4c85",
  "#533a8e",
  "#914e68",
  "#62458d",
  "#9b5b7c",
  "#493a79",
  "#83527d",
  "#57418c"
];


/* =========================
   رسم العجلة
========================= */

function renderWheel() {

  const segmentCount = remainingWheelIndices.length;

  /*
    إذا خلصت الخيارات كلها
  */

  if (segmentCount === 0) {

    wheel.style.background = "#533a8e";

    spinButton.disabled = true;

    return;
  }


  const segmentAngle = 360 / segmentCount;


  /*
    بناء ألوان العجلة حسب
    الخيارات المتبقية
  */

  const gradientParts =
    remainingWheelIndices.map((originalIndex, i) => {

      const start = i * segmentAngle;
      const end = (i + 1) * segmentAngle;

      return `${wheelColors[originalIndex]} ${start}deg ${end}deg`;

    });


  wheel.style.background =
    `conic-gradient(${gradientParts.join(", ")})`;


  /*
    حذف أسماء الخيارات القديمة
  */

  wheel
    .querySelectorAll(".wheel-label")
    .forEach(label => label.remove());


  /*
    إعادة كتابة الخيارات الموجودة
  */

  remainingWheelIndices.forEach((originalIndex, i) => {

    const result = wheelResults[originalIndex];

    const label = document.createElement("div");

    label.className = "wheel-label";


    const angle =
      i * segmentAngle +
      segmentAngle / 2;


    label.innerHTML = `
      <div>${result.icon}</div>
      <div>${result.label}</div>
    `;


    label.style.transform =
      `translate(-50%, -50%) rotate(${angle}deg) translateY(-145px) rotate(-${angle}deg)`;


    wheel.appendChild(label);

  });

}


/* أول رسم للعجلة */

renderWheel();


/* =========================
   لف العجلة
========================= */

spinButton.addEventListener("click", () => {

  if (
    spinning ||
    remainingWheelIndices.length === 0
  ) {
    return;
  }


  spinning = true;

  spinButton.disabled = true;


  /*
    نختار فقط من الخيارات
    التي لم تظهر بعد
  */

  const randomPosition =
    Math.floor(
      Math.random() *
      remainingWheelIndices.length
    );


  selectedWheelIndex =
    remainingWheelIndices[randomPosition];


  const segmentCount =
    remainingWheelIndices.length;


  const segmentAngle =
    360 / segmentCount;


  /*
    زاوية مركز القطعة المختارة
  */

  const targetLocalAngle =
    360 -
    (randomPosition * segmentAngle) -
    (segmentAngle / 2);


  /*
    معرفة زاوية العجلة الحالية
  */

  const currentRotation =
    ((wheelRotation % 360) + 360) % 360;


  /*
    مقدار التصحيح حتى تقف القطعة
    تحت السهم
  */

  const correction =
    (
      targetLocalAngle -
      currentRotation +
      360
    ) % 360;


  /*
    عدد اللفات الإضافية
  */

  const extraSpins =
    6 + Math.floor(Math.random() * 3);


  const rotationAmount =
    extraSpins * 360 +
    correction;


  wheelRotation += rotationAmount;


  wheel.style.transform =
    `rotate(${wheelRotation}deg)`;


  /*
    بعد انتهاء الحركة
  */

  setTimeout(() => {

    spinning = false;

    spinButton.disabled = false;

    showWheelResult(selectedWheelIndex);

  }, 5200);

});


/* =========================
   نتيجة العجلة
========================= */

const resultModal = $("#resultModal");
const resultIcon = $("#resultIcon");
const resultLabel = $("#resultLabel");
const resultTitle = $("#resultTitle");
const resultBody = $("#resultBody");
const resultContinue = $("#resultContinue");
const numberPicker = $("#numberPicker");


function showWheelResult(index) {

  const result = wheelResults[index];


  resultIcon.textContent =
    result.icon;


  resultLabel.textContent =
    result.label;


  resultTitle.textContent =
    result.title;


  resultBody.textContent =
    result.body;


  numberPicker.innerHTML = "";

  numberPicker.classList.add("hidden");


  /*
    إذا كانت النتيجة اختيار رقم
  */

  if (result.numbers) {

    numberPicker.classList.remove("hidden");


    for (let i = 1; i <= 10; i++) {

      const numberButton =
        document.createElement("button");


      numberButton.textContent = i;


      numberButton.addEventListener("click", () => {

        showNumberResult(i);

      });


      numberPicker.appendChild(numberButton);

    }

  }


  resultModal.classList.add("show");

  resultModal.setAttribute(
    "aria-hidden",
    "false"
  );

}


/* =========================
   نتيجة الرقم
========================= */

function showNumberResult(number) {

  const text =
    numberResults[number];


  resultLabel.textContent =
    `رقم ${number} 🎲`;


  resultBody.textContent =
    text;


  numberPicker.classList.add("hidden");

}


/* =========================
   إغلاق نتيجة العجلة
========================= */

function closeResultModal() {

  resultModal.classList.remove("show");

  resultModal.setAttribute(
    "aria-hidden",
    "true"
  );

}


resultContinue.addEventListener("click", () => {

  closeResultModal();


  /*
    نحذف الخيار الذي ظهر
    من الخيارات المتبقية
  */

  if (selectedWheelIndex !== null) {

    remainingWheelIndices =
      remainingWheelIndices.filter(
        index =>
          index !== selectedWheelIndex
      );


    selectedWheelIndex = null;


    /*
      إعادة رسم العجلة
      بالخيارات المتبقية فقط
    */

    renderWheel();

  }


  /*
    إذا خلصت كل الخيارات الثمانية
  */

  if (
    remainingWheelIndices.length === 0
  ) {

    setTimeout(() => {

      $("#toBreath").classList.remove("hidden");

    }, 400);

  }

});


/* =========================
   الانتقال بعد العجلة
========================= */

$("#toBreath").addEventListener("click", () => {

  showScreen("breath");

});


$("#toVideo").addEventListener("click", () => {

  showScreen("videoScreen");

});


/* =========================
   الفيديو
========================= */

const video = $("#salmaVideo");
const toLetter = $("#toLetter");


video.addEventListener("ended", () => {

  toLetter.classList.remove("hidden");

});


toLetter.addEventListener("click", () => {

  showScreen("letter");

  startLetter();

});


/*
  إذا حصل خطأ في الفيديو،
  يظل زر الانتقال متاحًا
*/

video.addEventListener("error", () => {

  toLetter.classList.remove("hidden");

});


/* =========================
   الرسالة الأخيرة
========================= */

const finalParagraphs = [

  {
    text:
      "إذا أصابـكِ ضـيق، سـتجدني أنا وقـلبي نتـسع لـكِ دائمـاً.. 💜🫂",
    strong: true
  },

  {
    text:
      "أتمنى أكون قدرت ولو بشيء بسيط إني أغيرلك جو ويكون عجبك، مع إني يعني لا بقدم ولا بأخر… بس ما بحب أشوفك زعلانة."
  },

  {
    text:
      "وأنا عارفة إنو مش بإيدك الزعل، بس يعني… بعرفش أشوفك زعلانة وخلص. 🫂"
  },

  {
    text:
      "ويمكن مش بعمل إشي يخليكي أحسن، وإنتِ قلتي ما بدك حد ومش جعبالك، بس برضو إنتِ مش أي حد.",
    strong: true
  },

  {
    text:
      "وبحاول يعني إني، حتى لو مش قريبة أو عندك، يعني هو صعب… بس بحاول إني أكون وقت ما بدك. 💜",
    strong: true
  },

  {
    text:
      "فالله يسعدك ويهون عليكي، وتضلي مطمّنة دايمًا، وربنا يحفظك بعينه اللي ما بتنام."
  },

  {
    text:
      "واستودعتك الله الذي لا تضيع ودائعه. 🙏💜"
  },

  {
    text:
      "وبس والله… لف يو 🫂",
    strong: true
  }

];


let letterStarted = false;


function startLetter() {

  if (letterStarted) return;


  letterStarted = true;


  const letterText = $("#letterText");
  const letterCard = $("#letterCard");
  const letterEnd = $("#letterEnd");


  letterText.innerHTML = "";


  letterCard.classList.add("visible");


  let delay = 600;


  finalParagraphs.forEach(paragraph => {

    const p = document.createElement("p");


    p.className =
      `letter-paragraph${
        paragraph.strong ? " strong" : ""
      }`;


    p.textContent =
      paragraph.text;


    p.style.animationDelay =
      `${delay}ms`;


    letterText.appendChild(p);


    delay +=
      paragraph.strong
        ? 2300
        : 1700;

  });


  setTimeout(() => {

    letterEnd.classList.add("show");

  }, delay + 500);

}


/* =========================
   إغلاق النوافذ بزر ESC
========================= */

document.addEventListener("keydown", event => {

  if (event.key !== "Escape") return;


  closeDoorModal();

  closeResultModal();

});
