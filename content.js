(() => {
  const STORAGE_KEY = "ytShortsAutoScrollEnabled";
  const ADVANCE_COOLDOWN_MS = 1500;
  const END_THRESHOLD_SECONDS = 0.2;

  let isEnabled = true;
  let lastAdvanceAt = 0;
  const watchedVideos = new WeakSet();

  const now = () => Date.now();

  function withinCooldown() {
    return now() - lastAdvanceAt < ADVANCE_COOLDOWN_MS;
  }

  function advanceToNextShort() {
    if (!isEnabled || withinCooldown()) {
      return;
    }

    lastAdvanceAt = now();

    const nextSelectors = [
      "ytd-reel-player-overlay-renderer #navigation-button-down button",
      "#navigation-button-down button",
      "button[aria-label*='Next']",
      "button[title*='Next']"
    ];

    for (const selector of nextSelectors) {
      const button = document.querySelector(selector);
      if (button instanceof HTMLElement && !button.disabled) {
        button.click();
        return;
      }
    }

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowDown",
        code: "ArrowDown",
        keyCode: 40,
        which: 40,
        bubbles: true,
        cancelable: true
      })
    );

    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }

  function attachToVideo(video) {
    if (!(video instanceof HTMLVideoElement) || watchedVideos.has(video)) {
      return;
    }

    watchedVideos.add(video);

    const maybeAdvance = () => {
      if (!isEnabled || video.duration <= 0 || withinCooldown()) {
        return;
      }

      const remaining = video.duration - video.currentTime;
      if (remaining <= END_THRESHOLD_SECONDS) {
        advanceToNextShort();
      }
    };

    video.addEventListener("ended", advanceToNextShort);
    video.addEventListener("timeupdate", maybeAdvance);
  }

  function scanAndAttachVideos() {
    document.querySelectorAll("video").forEach((video) => {
      attachToVideo(video);
    });
  }

  function watchForNewVideos() {
    const observer = new MutationObserver(() => {
      scanAndAttachVideos();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function setupHotkey() {
    document.addEventListener("keydown", (event) => {
      if (event.altKey && event.key.toLowerCase() === "s") {
        isEnabled = !isEnabled;

        persistEnabledState();
        if (chrome?.storage?.local) {
          chrome.storage.local.set({ [STORAGE_KEY]: isEnabled });
        }

        console.info(
          `[YT Shorts Auto Scroll] ${isEnabled ? "enabled" : "disabled"} (Alt+S)`
        );
      }
    });
  }

  function loadSettings() {
    if (!chrome?.storage?.local) {
      return;
    }

    chrome.storage.local.get(STORAGE_KEY, (result) => {
      if (typeof result[STORAGE_KEY] === "boolean") {
        isEnabled = result[STORAGE_KEY];
      }
    });
  }


  function watchSettingChanges() {
    if (!chrome?.storage?.onChanged) {
      return;
    }

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== "local" || !changes[STORAGE_KEY]) {
        return;
      }

      const nextValue = changes[STORAGE_KEY].newValue;
      if (typeof nextValue === "boolean") {
        isEnabled = nextValue;
      }
    });
  }

  function init() {
    if (!location.pathname.startsWith("/shorts/")) {
      return;
    }

    loadSettings();
    scanAndAttachVideos();
    watchForNewVideos();
    setupHotkey();
    watchSettingChanges();
  }

  init();
})();
