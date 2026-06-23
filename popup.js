const STORAGE_KEY = "savedSites";
const form = document.getElementById("site-form");
const nameInput = document.getElementById("site-name");
const urlInput = document.getElementById("site-url");
const siteList = document.getElementById("site-list");
const emptyState = document.getElementById("empty-state");
const openAllButton = document.getElementById("open-all");
const template = document.getElementById("site-item-template");

function normalizeUrl(url) {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function getSites() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ [STORAGE_KEY]: [] }, (items) => {
      resolve(items[STORAGE_KEY]);
    });
  });
}

function saveSites(sites) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [STORAGE_KEY]: sites }, resolve);
  });
}

function openSite(url) {
  chrome.tabs.create({ url });
}

function renderSites(sites) {
  siteList.textContent = "";
  emptyState.style.display = sites.length ? "none" : "block";
  openAllButton.disabled = sites.length === 0;

  sites.forEach((site, index) => {
    const item = template.content.firstElementChild.cloneNode(true);
    const siteLink = item.querySelector(".site-link");
    const removeButton = item.querySelector(".remove-button");
    const title = document.createElement("strong");
    const hostLabel = document.createElement("span");
    const host = (() => {
      try {
        return new URL(site.url).host;
      } catch {
        return site.url;
      }
    })();

    title.textContent = site.name;
    hostLabel.textContent = host;
    siteLink.replaceChildren(title, hostLabel);
    siteLink.addEventListener("click", () => openSite(site.url));
    removeButton.addEventListener("click", async () => {
      const currentSites = await getSites();
      currentSites.splice(index, 1);
      await saveSites(currentSites);
      renderSites(currentSites);
    });

    siteList.appendChild(item);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const url = normalizeUrl(urlInput.value);

  if (!name || !url) {
    return;
  }

  const sites = await getSites();
  sites.unshift({ name, url });
  await saveSites(sites);
  renderSites(sites);
  form.reset();
  nameInput.focus();
});

openAllButton.addEventListener("click", async () => {
  const sites = await getSites();
  sites.forEach((site) => openSite(site.url));
});

(async function init() {
  const sites = await getSites();
  renderSites(sites);
})();