"use strict";
document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const currentDomain = new URL(currentTab.url).hostname;
        // 显示当前域名
        document.getElementById("domainLabel").innerText = `Domain: ${currentDomain}`;
    });
});
