const DEVTO_USERNAME = "anselmojacyntho";

const translations = {
  pt: {
    htmlLang: "pt-BR",
    languageTitle: "Idioma",
    downloadResume: "Baixar curriculo",
    summaryTitle: "Resumo profissional",
    skillsTitle: "Skills principais",
    postsTitle: "Publicações",
    postsLoading: "Carregando publicações...",
    postsEmpty: "Nenhuma publicação encontrada no DEV.to.",
    postsError: "Nao foi possivel carregar as publicações agora.",
    readArticle: "Ler publicação",
    readingTime: "min de leitura",
    location: "Santiago, Chile",
    resume: "assets/resume-pt.md",
    summary: [
      "Senior Backend Engineer com mais de 12 anos de experiência projetando APIs, modernizando sistemas legados e construindo plataformas corporativas de alta disponibilidade.",
      "Especialista em PHP/Laravel, arquitetura de software e integração de sistemas distribuídos. Atuei em projetos para empresas como AB InBev, Atento, OdontoPrev e ESPM, desde desenvolvimento hands-on até liderança técnica e evolução arquitetural.",
      "Atualmente concentro meus estudos em IA aplicada ao desenvolvimento de software e arquiteturas modernas para sistemas backend."
    ],
    skills: {
      "Linguagens": ["PHP", "Python", "JavaScript", "Ruby"],
      "Frameworks": ["Laravel", "Symfony", "Drupal", "Ruby on Rails", "React", "Next.js"],
      "Arquitetura": ["Software Architecture", "System Design", "REST APIs", "GraphQL", "Distributed Systems", "Event-driven Architecture", "Microservices", "Queue-based Processing"],
      "Cloud & DevOps": ["Docker", "Linux", "AWS", "CI/CD", "Git"],
      "IA": ["AI-assisted Development", "GitHub Copilot", "LLM Integration"]
    }
  },
  es: {
    htmlLang: "es",
    languageTitle: "Idioma",
    downloadResume: "Descargar curriculum",
    summaryTitle: "Resumen profesional",
    skillsTitle: "Skills principales",
    postsTitle: "Publicaciones",
    postsLoading: "Cargando publicaciones...",
    postsEmpty: "No se encontraron publicaciones en DEV.to.",
    postsError: "No fue posible cargar las publicaciones ahora.",
    readArticle: "Leer publicación",
    readingTime: "min de lectura",
    location: "Santiago, Chile",
    resume: "assets/resume-es.md",
    summary: [
      "Senior Backend Engineer con mas de 12 anos de experiencia disenando APIs, modernizando sistemas legacy y construyendo plataformas corporativas de alta disponibilidad.",
      "Especialista en PHP/Laravel, arquitectura de software e integracion de sistemas distribuidos. He trabajado en proyectos para empresas como AB InBev, Atento, OdontoPrev y ESPM, desde desarrollo hands-on hasta liderazgo tecnico y evolucion arquitectonica.",
      "Actualmente concentro mis estudios en IA aplicada al desarrollo de software y arquitecturas modernas para sistemas backend."
    ],
    skills: {
      "Lenguajes": ["PHP", "Python", "JavaScript", "Ruby"],
      "Frameworks": ["Laravel", "Symfony", "Drupal", "Ruby on Rails", "React", "Next.js"],
      "Arquitectura": ["Software Architecture", "System Design", "REST APIs", "GraphQL", "Distributed Systems", "Event-driven Architecture", "Microservices", "Queue-based Processing"],
      "Cloud & DevOps": ["Docker", "Linux", "AWS", "CI/CD", "Git"],
      "IA": ["AI-assisted Development", "GitHub Copilot", "LLM Integration"]
    }
  },
  en: {
    htmlLang: "en",
    languageTitle: "Language",
    downloadResume: "Download resume",
    summaryTitle: "Professional summary",
    skillsTitle: "Core skills",
    postsTitle: "Publications",
    postsLoading: "Loading publications...",
    postsEmpty: "No DEV.to publications found.",
    postsError: "Unable to load publications right now.",
    readArticle: "Read article",
    readingTime: "min read",
    location: "Santiago, Chile",
    resume: "assets/resume-en.md",
    summary: [
      "Senior Backend Engineer with more than 12 years of experience designing APIs, modernizing legacy systems, and building high-availability enterprise platforms.",
      "Specialized in PHP/Laravel, software architecture, and distributed systems integration. I have worked on projects for companies such as AB InBev, Atento, OdontoPrev, and ESPM, from hands-on development to technical leadership and architectural evolution.",
      "I currently focus my studies on AI applied to software development and modern architectures for backend systems."
    ],
    skills: {
      "Languages": ["PHP", "Python", "JavaScript", "Ruby"],
      "Frameworks": ["Laravel", "Symfony", "Drupal", "Ruby on Rails", "React", "Next.js"],
      "Architecture": ["Software Architecture", "System Design", "REST APIs", "GraphQL", "Distributed Systems", "Event-driven Architecture", "Microservices", "Queue-based Processing"],
      "Cloud & DevOps": ["Docker", "Linux", "AWS", "CI/CD", "Git"],
      "AI": ["AI-assisted Development", "GitHub Copilot", "LLM Integration"]
    }
  }
};

let currentLanguage = localStorage.getItem("portfolioLanguage") || "pt";
let devtoArticles = [];
let postsState = "loading";

const selectors = {
  download: document.querySelector("[data-download]"),
  languageSelect: document.querySelector("[data-language-select]"),
  posts: document.querySelector("[data-posts]"),
  postsStatus: document.querySelector("[data-posts-status]"),
  skills: document.querySelector("[data-skills]"),
  summary: document.querySelector("[data-summary]")
};

function setTextContent(language) {
  const dictionary = translations[language];

  document.documentElement.lang = dictionary.htmlLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  selectors.download.href = dictionary.resume;
  selectors.download.setAttribute("download", dictionary.resume.split("/").pop());
}

function renderSummary(language) {
  selectors.summary.innerHTML = translations[language].summary
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function renderSkills(language) {
  const skills = translations[language].skills;

  selectors.skills.innerHTML = Object.entries(skills)
    .map(([group, items]) => `
      <article class="skill-group">
        <h3>${group}</h3>
        <ul class="tag-list">
          ${items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    `)
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value, language) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat(translations[language].htmlLang, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function renderPosts(language) {
  const dictionary = translations[language];

  if (!devtoArticles.length) {
    selectors.posts.innerHTML = "";
    selectors.postsStatus.textContent = dictionary[postsState] || dictionary.postsLoading;
    return;
  }

  selectors.postsStatus.textContent = "";
  selectors.posts.innerHTML = devtoArticles
    .map((article) => {
      const tags = article.tag_list || [];
      const publishedAt = formatDate(article.published_at || article.published_timestamp, language);
      const readingTime = article.reading_time_minutes
        ? `${article.reading_time_minutes} ${dictionary.readingTime}`
        : "";
      const meta = [publishedAt, readingTime].filter(Boolean).join(" | ");

      return `
        <article class="post-card">
          <h3><a href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer">${escapeHtml(article.title)}</a></h3>
          <p class="post-meta">${meta}</p>
          ${article.description ? `<p class="post-description">${escapeHtml(article.description)}</p>` : ""}
          <div class="post-tags" aria-label="Tags">
            ${tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}
          </div>
          <a href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer">${dictionary.readArticle}</a>
        </article>
      `;
    })
    .join("");
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "pt";
  localStorage.setItem("portfolioLanguage", currentLanguage);

  setTextContent(currentLanguage);
  renderSummary(currentLanguage);
  renderSkills(currentLanguage);
  renderPosts(currentLanguage);

  selectors.languageSelect.value = currentLanguage;
}

async function loadDevtoArticles() {
  const dictionary = translations[currentLanguage];
  postsState = "postsLoading";
  selectors.postsStatus.textContent = dictionary.postsLoading;

  try {
    const url = `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=10&t=${Date.now()}`;
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.forem.api-v1+json"
      }
    });

    if (!response.ok) {
      throw new Error(`DEV.to returned ${response.status}`);
    }

    devtoArticles = await response.json();

    if (!devtoArticles.length) {
      postsState = "postsEmpty";
      selectors.postsStatus.textContent = translations[currentLanguage].postsEmpty;
      return;
    }

    postsState = "loaded";
    renderPosts(currentLanguage);
  } catch (error) {
    postsState = "postsError";
    selectors.posts.innerHTML = "";
    selectors.postsStatus.textContent = translations[currentLanguage].postsError;
  }
}

selectors.languageSelect.addEventListener("change", () => applyLanguage(selectors.languageSelect.value));

applyLanguage(currentLanguage);
loadDevtoArticles();
