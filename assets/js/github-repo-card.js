document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".github-repo-card").forEach(loadRepository);
});

function loadRepository(card) {
  const owner = card.dataset.owner;
  const repo = card.dataset.repo;

  fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      "Accept": "application/vnd.github+json"
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  })
  .then(repository => renderRepository(card, repository))
  .catch(() => renderError(card, owner, repo));

}

function renderRepository(card, repository) {
  const language = repository.language || "";
  const color = languageColor(language);

  card.innerHTML = `
        <div class="github-repo-card__title">
            📌
            <a href="${repository.html_url}"
               target="_blank"
               rel="noopener noreferrer">
                ${repository.name}
            </a>
        </div>

        <div class="github-repo-card__description">
          ${renderEmoji(repository.description)}
        </div>

        <div class="github-repo-card__footer">
            <span class="github-repo-card__language">
                <span class="github-language-dot"
                      style="background:${color}"></span>
                ${language || "Unknown"}
            </span>

            <span>⭐ ${repository.stargazers_count}</span>
        </div>
    `;
}

function renderError(card, owner, repo) {
  card.innerHTML = `
        <div class="github-repo-card--error">
            <div class="github-repo-card__title">
                📌 ${repo}
            </div>

            <div class="github-repo-card__description">
                Failed to fetch repository details:<br>
                ${owner}/${repo}
            </div>
        </div>
    `;
}

const LANGUAGE_COLORS = {
  Scala: "#dc322f",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  TypeScript: "#3178c6"
};

function languageColor(language) {
  return LANGUAGE_COLORS[language] || "#8b949e";
}

const EMOJI = {
    tiger: "🐯",
    wrench: "🔧",
    leaves: "🍃",
    paperclip: "📎",
    file_folder: "📁"
};

function renderEmoji(text) {
  if (!text) {
    return "";
  }

  return text.replace(
      /:([a-z0-9_+-]+):/g,
    (match, name) => EMOJI[name] || match
  );
}