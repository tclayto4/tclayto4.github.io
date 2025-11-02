(function(){
  function q(s){return document.querySelector(s);}
  function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s));}
  function getVal(el){return el && el.value ? el.value.trim() : "";}

  function swapHeading(){
    var h = qa("main h2")[0];
    if (h && /Introduction\s*Form/i.test(h.textContent)) h.textContent = "Introduction HTML";
  }

  function coursesFromDom(){
    return qa("#courses .course").map(function(r){
      var d = r.querySelector('[name="dept"]');
      var n = r.querySelector('[name="num"]');
      var nm = r.querySelector('[name="name"]');
      var rs = r.querySelector('[name="reason"]');
      return {
        dept: getVal(d) || "",
        num: getVal(n) || "",
        name: getVal(nm) || "",
        reason: getVal(rs) || ""
      };
    });
  }

  function pickImage(f){
    var fileInput = f.querySelector('[name="picFile"]');
    var chosen = fileInput && fileInput.files && fileInput.files[0];
    var picUrl = f.picUrl ? getVal(f.picUrl) : "";
    return chosen ? URL.createObjectURL(chosen) : (picUrl || "images/korea.jpg");
  }

  function buildHtml(f){
    var first = getVal(f.firstName) || "Thomas";
    var middle = getVal(f.middleName) || "";
    var midInit = middle ? middle.charAt(0).toUpperCase() : "";
    var nick = getVal(f.nickName) || "Tom";
    var last = getVal(f.lastName) || "Clayton";
    var mascotAdj = getVal(f.mascotAdj) || "Thirsty";
    var mascotAnimal = getVal(f.mascotAnimal) || "Cheetah";
    var img = pickImage(f);
    var imgCap = getVal(f.picCaption) || "Me in Seoul Korea";
    var b1 = getVal(f.b1) || "";
    var b2 = getVal(f.b2) || "";
    var b3 = getVal(f.b3) || "";
    var b4 = getVal(f.b4) || "";
    var b6 = getVal(f.b6) || "";
    var b7 = getVal(f.b7) || "";
    var quote = getVal(f.quote) || "";
    var quoteAuthor = getVal(f.quoteAuthor) || "";
    var courses = coursesFromDom();

    var header = "<h3>" + first + (midInit ? " " + midInit + "." : "") + ' "' + nick + '" ' + last + " || " + mascotAdj + " " + mascotAnimal + "</h3>";
    var coursesHtml = courses.map(function(c){
      return "        <li><strong>" + c.dept + " " + c.num + " – " + c.name + ":</strong> " + c.reason + "</li>";
    }).join("\n");

    var parts = [];
    parts.push("<h2>Introduction HTML</h2>");
    parts.push(header);
    parts.push("<figure>");
    parts.push("    <img");
    parts.push('        src="' + img + '"');
    parts.push('        alt="Photo of ' + first + " " + last + '"');
    parts.push("    />");
    parts.push("    <figcaption>" + imgCap + "</figcaption>");
    parts.push("</figure>");
    parts.push("<ul>");
    parts.push("    <li><strong>Personal Background:</strong> " + b1 + "</li>");
    parts.push("    <li><strong>Professional Background:</strong> " + b2 + "</li>");
    parts.push("    <li><strong>Academic Background:</strong> " + b3 + "</li>");
    parts.push("    <li><strong>Primary Computer:</strong> " + b4 + "</li>");
    parts.push("    <li><strong>Courses</strong>");
    parts.push("        <ul>");
    if (coursesHtml) parts.push(coursesHtml);
    parts.push("        </ul>");
    parts.push("    </li>");
    parts.push("    <li><strong>Funny/Interesting Item to Remember Me by:</strong> " + b6 + "</li>");
    parts.push("    <li><strong>I’d also like to share:</strong> " + b7 + "</li>");
    parts.push("</ul>");
    if (quote) parts.push('<p><strong>Favorite Quote:</strong> "' + quote + '" — ' + quoteAuthor + "</p>");
    return parts.join("\n");
  }

  function renderHtmlCode(htmlString){
    var holder = q("#holder");
    var section = document.createElement("section");
    section.id = "htmlView";
    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.className = "language-html";
    code.id = "htmlCode";
    code.textContent = htmlString;
    pre.appendChild(code);
    section.appendChild(pre);
    var p = document.createElement("p");
    p.innerHTML = '<a href="#" id="backToForm">Back to form</a>';
    section.appendChild(p);
    holder.innerHTML = "";
    holder.appendChild(section);
    if (window.hljs && typeof window.hljs.highlightElement === "function"){ window.hljs.highlightElement(code); }
    q("#backToForm").addEventListener("click", function(e){ e.preventDefault(); location.reload(); });
  }

  function init(){
    var form = q("#f");
    var btn = q("#genHtml");
    if (!form || !btn) return;
    btn.addEventListener("click", function(){
      var html = buildHtml(form);
      swapHeading();
      renderHtmlCode(html);
    });
  }

  if (document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();
