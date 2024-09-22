"use strict";
document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var _a;
        const currentTab = tabs[0];
        const currentDomain = new URL(currentTab.url).hostname;
        // 显示当前域名
        document.getElementById("domainLabel").innerText = `Domain: ${currentDomain}`;
        // 保存用户指定的字段
        (_a = document.getElementById("apply")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            const field = document.getElementById("field").value || "title";
            chrome.storage.sync.get("domainRules", (data) => {
                const domainRules = data.domainRules || {};
                domainRules[currentDomain] = { field };
                chrome.storage.sync.set({ domainRules }, () => {
                    alert(`Rule for ${currentDomain} saved!`);
                });
            });
        });
    });
});
