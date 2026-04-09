(() => {
  const STORAGE_KEY = "ytShortsAutoScrollEnabled";

  const toggle = document.getElementById("enabledToggle");
  const statusText = document.getElementById("statusText");

  if (!(toggle instanceof HTMLInputElement) || !(statusText instanceof HTMLElement)) {
    return;
  }

  function setStatus(isEnabled) {
    statusText.textContent = isEnabled
      ? "สถานะ: เปิดใช้งาน Auto Scroll"
      : "สถานะ: ปิดใช้งาน Auto Scroll";
  }

  function setEnabled(isEnabled) {
    toggle.checked = isEnabled;
    setStatus(isEnabled);
  }

  chrome.storage.local.get(STORAGE_KEY, (result) => {
    const isEnabled = typeof result[STORAGE_KEY] === "boolean" ? result[STORAGE_KEY] : true;
    setEnabled(isEnabled);
  });

  toggle.addEventListener("change", () => {
    const isEnabled = toggle.checked;
    chrome.storage.local.set({ [STORAGE_KEY]: isEnabled }, () => {
      setStatus(isEnabled);
    });
  });
})();
