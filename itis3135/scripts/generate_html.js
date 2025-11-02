(function(){
  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));

  const swapHeading = () => {
    const h = qa("main h2")[0];
    if (h && /Introduction\s*Form/i.test(h.textContent)) h.textContent = "Introduction HTML";
  };

  const coursesFromDom = () =>
    qa("#courses .course").map(r => ({
      dept: r.querySelector('[name="dept"]')?.value?.trim() || "",
      num: r.querySelector('[name="num"]')?.value?.trim() || "",
      name: r.querySelector('[name="name"]')?.value?.trim() || "",
      reason: r.querySelector('[name="reason"]')?.value?.trim() || ""
    }));

  const pickImage = f => {
    const fileInput = f.querySelector('[name="picFile"]');
    const chosen = fileInput?.files && fileInput.files[0];
    return chosen ? URL.createObjectURL(chosen) : (f.picUrl?.value?.trim() || "images/korea.jpg");
  };

  const buildHtml = f => {
    const first = f.firstName?.value?.trim() || "Thomas";
    const middle = f.middleName?.value?.trim() || "";
    const midInit = middle ? middle[0].toUpperCase() : "";
    const nick = f.nickName?.value?.trim() || "Tom";
    const last = f.lastName?.value?.trim() || "Clayton";
    const mascotAdj = f.mascotAdj?.value?.trim() || "Thirsty";
    const mascotAnimal = f.mascotAnimal?.value?.trim() || "Cheetah";
    const img = pickImage(f);
    const imgCap = f.picCaption?.value?.trim() || "Me in Seoul Korea";
    const b1 = f.b1?.value?.trim() || "";
    const b2 = f.b2?.value?.trim() || "";
    const b3 = f.b3?.value?.trim() || "";
    const b4 = f.b4?.value?.trim() || "";
    const b6 = f.b6?.value?.trim() || "";
    const b7 = f.b7?.value?.trim() || "";
    const quote = f.quote?.value?.trim() || "";
    const quoteAuthor = f.quoteAuthor?.value?.trim() || "";
    const courses = coursesFromDom();

    const coursesHtml = courses.map(c =>
      `        <li><strong>${c.dept} ${c.num} – ${c.name}:</strong> ${c.reason}</li>`
    ).join("\n");

    return [
      `<h2>Introduction HTML</h2>`,
      `<h3>${first}${midInit ? " " + midInit + "." : ""} "${nick}" ${last} || ${mascotAdj} ${mascotAnimal}</h3>`,
      `<figure>`,
      `    <img`,
      `        src="${img}"`,
      `        alt="Photo of ${first} ${last}"`,
      `    />`,
      `    <figcaption>${imgCap}</figcaption>`,
      `</figure>`,
      `<ul>`,
      `    <li><strong>Personal Background:</strong> ${b1}</li>`,
      `    <li><strong>Professional Background:</strong> ${b2}</li>`,
      `    <li><strong>Academic Background:</strong> ${b3}</li>`,
      `    <li><strong>Primary Computer:</strong> ${b4}</li>`,
      `    <li><strong>Courses</strong>`,
      `        <ul>`,
      coursesHtml || ``,
      `        </ul>`,
      `    </li>`,
      `    <li><strong>Funny/Interesting Item to Remember Me by:</strong> ${b6}</li>`,
      `    <li><strong>I’d also like to share:</strong> ${b7}</li>`,
      `</ul>`,
      quote ? `<p><strong>Favorite Quote:</strong> "${quote}" — ${quoteAuthor}</p>` : ``
    ].filter(Boolean).join("\n");
  };

  const renderHtmlCode = htmlString => {
    const holder = q("#holder");
    const section = document.createElement("section");
    section.id = "htmlView";
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.className = "language-html";
    code.id = "htmlCode";
    code.textContent = htmlString;
    pre.appendChild(code);
    section.appendChild(pre);
    const p = document.createElement("p");
    p.innerHTML = `<a href="#" id="backToForm">Back to form</a>`;
    section.appendChild(p);
    holder.innerHTML = "";
    holder.appendChild(section);
    if (window.hljs && typeof window.hljs.highlightElement === "function") window.hljs.highlightElement(code);
    document.getElementById("backToForm").addEventListener("click", e => {
      e.preventDefault();
      location.reload();
    });
  };

  const init = () => {
    const form = q("#f");
    const btn = q("#genHtml");
    if (!form || !btn) return;
    btn.addEventListener("click", () => {
      const html = buildHtml(form);
      swapHeading();
      renderHtmlCode(html);
    });
  };

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
