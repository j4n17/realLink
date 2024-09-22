"use strict";
chrome.storage.sync.get("domainRules", (data) => {
    const domainRules = data.domainRules || {};
    const currentDomain = window.location.hostname;
    // 如果当前域名有对应规则
    if (domainRules[currentDomain]) {
        const { field } = domainRules[currentDomain];
        const anchorTags = document.querySelectorAll("a");
        anchorTags.forEach((anchor) => {
            const realUrl = anchor.getAttribute(field);
            // 如果存在该字段的值，替换 href
            if (realUrl) {
                anchor.setAttribute("href", realUrl);
            }
        });
    }
});
