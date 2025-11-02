(function(){
  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));

  const swapHeading = () => {
    const h = qa("main h2")[0];
    if (h && /Introduction\s*Form/i.test(h.textContent)) h.textContent = "Introduction HTML";
  };

  const coursesFromDom = () =>
    qa("#courses .course").map(r => ({
      department: r.querySelector('[name="dept"]')?.value?.trim() || "",
      number: r.querySelector('[name="num"]')?.value?.trim() || "",
      name: r.querySelector('[name="name"]')?.value?.trim() || "",
      reason: r.querySelector('[name="reason"]')?.value?.trim() || ""
    }));

  const linksFromForm = f => {
    const names = ["GitHub","GitHub Page","freeCodeCamp","Codecademy","LinkedIn"];
    return ["link1","link2","link3","link4","link5"]
      .map((n,i)=>({ n, i }))
      .map(({n,i}) => {
        const href = f[n]?.value?.trim();
        return href ? { name: names[i] || `Link ${i+1}`, href } : null;
      })
      .filter(Boolean);
  };

  const formToJson = f => {
    const fileInput = f.querySelector('[name="picFile"]');
    const chosen = fileInput?.files && fileInput.files[0];
    const image = chosen ? URL.createObjectURL(chosen) : (f.picUrl?.value?.trim() || "images/korea.jpg");

    return {
      firstName: f.firstName?.value?.trim() || "Thomas",
      preferredName: f.nickName?.value?.trim() || "Tom",
      middleInitial: f.middleInitial?.value?.trim() || "J",
      lastName: f.lastName?.value?.trim() || "Clayton",
      divider: "~",
      mascotAdjective: f.mascotAdj?.value?.trim() || "Thirsty",
      mascotAnimal: f.mascotAnimal?.value?.trim() || "Cheetah",
      image,
      imageCaption: f.picCaption?.value?.trim() || "Me in Seoul, Korea",
      personalStatement: f.personalStatement?.value?.trim() || "I'm always curious about how things work and love learning through hands-on experience, whether that's tuning cars, building subwoofer systems, or programming new projects.",
      personalBackground: f.b1?.value?.trim() || "I was born and raised in North Carolina, growing up around Raleigh before moving to Charlotte for school. I'm half Korean and love exploring different cultures and foods.",
      professionalBackground: f.b2?.value?.trim() || "I've worked on multiple technical and creative projects through my coursework at UNC Charlotte, and I'm developing my brand, Thirsty Cheetah, which focuses on automotive customization and design.",
      academicBackground: f.b3?.value?.trim() || "I'm currently studying Information Technology at UNC Charlotte, taking classes like Web Development, Computer Systems, and Statistics. I'm interested in the intersection between technology and creativity.",
      subjectBackground: f.b5?.value?.trim() || "I enjoy courses that combine coding, design, and problem-solving, such as ITIS 3135 and ITIS 2181, where I've learned practical skills that help me build my projects from concept to deployment.",
      primaryComputer: f.b4?.value?.trim() || "I mainly use a Windows 11 desktop that I built myself, along with a laptop for on-the-go coursework and web development testing.",
      courses: coursesFromDom(),
      links: linksFromForm(f)
    };
  };

  const showJson = obj => {
    const holder = q("#holder");
    const section = document.createElement("section");
    section.id = "jsonView";

    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.className = "language-json";
    code.id = "jsonCode";
    code.textContent = JSON.stringify(obj, null, 2);

    pre.appendChild(code);
    section.appendChild(pre);

    const p = document.createElement("p");
    p.innerHTML = `<a href="#" id="backToForm">Back to form</a>`;
    section.appendChild(p);

    holder.innerHTML = "";
    holder.appendChild(section);

    if (window.hljs && typeof window.hljs.highlightElement === "function") {
      window.hljs.highlightElement(code);
    }

    q("#backToForm").addEventListener("click", e => {
      e.preventDefault();
      location.reload();
    });
  };

  const init = () => {
    const form = q("#f");
    const btn = q("#genJson");
    if (!form || !btn) return;
    btn.addEventListener("click", () => {
      const data = formToJson(form);
      swapHeading();
      showJson(data);
    });
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
