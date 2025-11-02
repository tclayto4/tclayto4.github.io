(function(){
  function q(s){return document.querySelector(s);}
  function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s));}

  function swapHeading(){
    var h = qa("main h2")[0];
    if (h && /Introduction\s*Form/i.test(h.textContent)) h.textContent = "Introduction JSON";
  }

  function getVal(el){ return el && el.value ? el.value.trim() : ""; }

  function coursesFromDom(){
    return qa("#courses .course").map(function(r){
      var d = r.querySelector('[name="dept"]');
      var n = r.querySelector('[name="num"]');
      var nm = r.querySelector('[name="name"]');
      var rs = r.querySelector('[name="reason"]');
      return {
        department: getVal(d) || "",
        number: getVal(n) || "",
        name: getVal(nm) || "",
        reason: getVal(rs) || ""
      };
    });
  }

  function linksFromForm(f){
    var names = ["GitHub","GitHub Page","freeCodeCamp","Codecademy","LinkedIn"];
    var keys = ["link1","link2","link3","link4","link5"];
    var out = [];
    for (var i=0;i<keys.length;i++){
      var inp = f[keys[i]];
      var href = getVal(inp);
      if (href) out.push({ name: names[i] || ("Link " + (i+1)), href: href });
    }
    return out;
  }

  function pickImage(f){
    var fileInput = f.querySelector('[name="picFile"]');
    var chosen = fileInput && fileInput.files && fileInput.files[0];
    var picUrl = f.picUrl ? getVal(f.picUrl) : "";
    return chosen ? URL.createObjectURL(chosen) : (picUrl || "images/korea.jpg");
  }

  function formToJson(f){
    return {
      firstName: getVal(f.firstName) || "Thomas",
      preferredName: getVal(f.nickName) || "Tom",
      middleInitial: getVal(f.middleInitial) || "S",
      lastName: getVal(f.lastName) || "Clayton",
      divider: "~",
      mascotAdjective: getVal(f.mascotAdj) || "Thirsty",
      mascotAnimal: getVal(f.mascotAnimal) || "Cheetah",
      image: pickImage(f),
      imageCaption: getVal(f.picCaption) || "Me in Seoul, Korea",
      personalStatement: getVal(f.personalStatement) || "I'm always curious about how things work and love learning through hands-on experience, whether that's tuning cars, building subwoofer systems, or programming new projects.",
      personalBackground: getVal(f.b1) || "I was born and raised in North Carolina, growing up around Raleigh before moving to Charlotte for school. I'm half Korean and love exploring different cultures and foods.",
      professionalBackground: getVal(f.b2) || "I've worked on multiple technical and creative projects through my coursework at UNC Charlotte, and I'm developing my brand, Thirsty Cheetah, which focuses on automotive customization and design.",
      academicBackground: getVal(f.b3) || "I'm currently studying Information Technology at UNC Charlotte, taking classes like Web Development, Computer Systems, and Statistics. I'm interested in the intersection between technology and creativity.",
      subjectBackground: getVal(f.b5) || "I enjoy courses that combine coding, design, and problem-solving, such as ITIS 3135 and ITIS 2181, where I've learned practical skills that help me build my projects from concept to deployment.",
      primaryComputer: getVal(f.b4) || "I mainly use a Windows 11 desktop that I built myself, along with a laptop for on-the-go coursework and web development testing.",
      courses: coursesFromDom(),
      links: linksFromForm(f)
    };
  }

  function showJson(obj){
    var holder = q("#holder");
    var section = document.createElement("section");
    section.id = "jsonView";

    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.className = "language-json";
    code.id = "jsonCode";
    code.textContent = JSON.stringify(obj, null, 2);

    pre.appendChild(code);
    section.appendChild(pre);

    var p = document.createElement("p");
    p.innerHTML = '<a href="#" id="backToForm">Back to form</a>';
    section.appendChild(p);

    holder.innerHTML = "";
    holder.appendChild(section);

    if (window.hljs && typeof window.hljs.highlightElement === "function"){
      window.hljs.highlightElement(code);
    }

    q("#backToForm").addEventListener("click", function(e){
      e.preventDefault();
      location.reload();
    });
  }

  function init(){
    var form = q("#f");
    var btn = q("#genJson");
    if (!form || !btn) return;
    btn.addEventListener("click", function(){
      var data = formToJson(form);
      swapHeading();
      showJson(data);
    });
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
(function(){
  function q(s){return document.querySelector(s);}
  function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s));}

  function swapHeading(){
    var h = qa("main h2")[0];
    if (h && /Introduction\s*Form/i.test(h.textContent)) h.textContent = "Introduction JSON";
  }

  function getVal(el){ return el && el.value ? el.value.trim() : ""; }

  function coursesFromDom(){
    return qa("#courses .course").map(function(r){
      var d = r.querySelector('[name="dept"]');
      var n = r.querySelector('[name="num"]');
      var nm = r.querySelector('[name="name"]');
      var rs = r.querySelector('[name="reason"]');
      return {
        department: getVal(d) || "",
        number: getVal(n) || "",
        name: getVal(nm) || "",
        reason: getVal(rs) || ""
      };
    });
  }

  function linksFromForm(f){
    var names = ["GitHub","GitHub Page","freeCodeCamp","Codecademy","LinkedIn"];
    var keys = ["link1","link2","link3","link4","link5"];
    var out = [];
    for (var i=0;i<keys.length;i++){
      var inp = f[keys[i]];
      var href = getVal(inp);
      if (href) out.push({ name: names[i] || ("Link " + (i+1)), href: href });
    }
    return out;
  }

  function pickImage(f){
    var fileInput = f.querySelector('[name="picFile"]');
    var chosen = fileInput && fileInput.files && fileInput.files[0];
    var picUrl = f.picUrl ? getVal(f.picUrl) : "";
    return chosen ? URL.createObjectURL(chosen) : (picUrl || "images/korea.jpg");
  }

  function formToJson(f){
    return {
      firstName: getVal(f.firstName) || "Thomas",
      preferredName: getVal(f.nickName) || "Tom",
      middleInitial: getVal(f.middleInitial) || "S",
      lastName: getVal(f.lastName) || "Clayton",
      divider: "~",
      mascotAdjective: getVal(f.mascotAdj) || "Thirsty",
      mascotAnimal: getVal(f.mascotAnimal) || "Cheetah",
      image: pickImage(f),
      imageCaption: getVal(f.picCaption) || "Me in Seoul, Korea",
      personalStatement: getVal(f.personalStatement) || "I'm always curious about how things work and love learning through hands-on experience, whether that's tuning cars, building subwoofer systems, or programming new projects.",
      personalBackground: getVal(f.b1) || "I was born and raised in North Carolina, growing up around Raleigh before moving to Charlotte for school. I'm half Korean and love exploring different cultures and foods.",
      professionalBackground: getVal(f.b2) || "I've worked on multiple technical and creative projects through my coursework at UNC Charlotte, and I'm developing my brand, Thirsty Cheetah, which focuses on automotive customization and design.",
      academicBackground: getVal(f.b3) || "I'm currently studying Information Technology at UNC Charlotte, taking classes like Web Development, Computer Systems, and Statistics. I'm interested in the intersection between technology and creativity.",
      subjectBackground: getVal(f.b5) || "I enjoy courses that combine coding, design, and problem-solving, such as ITIS 3135 and ITIS 2181, where I've learned practical skills that help me build my projects from concept to deployment.",
      primaryComputer: getVal(f.b4) || "I mainly use a Windows 11 desktop that I built myself, along with a laptop for on-the-go coursework and web development testing.",
      courses: coursesFromDom(),
      links: linksFromForm(f)
    };
  }

  function showJson(obj){
    var holder = q("#holder");
    var section = document.createElement("section");
    section.id = "jsonView";

    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.className = "language-json";
    code.id = "jsonCode";
    code.textContent = JSON.stringify(obj, null, 2);

    pre.appendChild(code);
    section.appendChild(pre);

    var p = document.createElement("p");
    p.innerHTML = '<a href="#" id="backToForm">Back to form</a>';
    section.appendChild(p);

    holder.innerHTML = "";
    holder.appendChild(section);

    if (window.hljs && typeof window.hljs.highlightElement === "function"){
      window.hljs.highlightElement(code);
    }

    q("#backToForm").addEventListener("click", function(e){
      e.preventDefault();
      location.reload();
    });
  }

  function init(){
    var form = q("#f");
    var btn = q("#genJson");
    if (!form || !btn) return;
    btn.addEventListener("click", function(){
      var data = formToJson(form);
      swapHeading();
      showJson(data);
    });
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
