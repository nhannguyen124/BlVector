// (() => {
//     "use strict";
  
//     console.log(`
//   ╔═══════════════════════════════════════════╗
//   ║                                           ║
//   ║   🐼 Panda-Vanguard Anti-Bypass System    ║
//   ║   Version: 2.0.0                          ║
//   ║   Status: Active                          ║
//   ║   Mode: Enhanced Protection               ║
//   ║                                           ║
//   ╚═══════════════════════════════════════════╝
//     `);
  
//     // Constants for detection
//     const REFRESH_KEY = "_vanguardLastRefresh";
//     const REFRESH_LIMIT = 2;
//     const REFRESH_WINDOW = 5000;
  
//     const signatures = {
//       fearSpecific: [
//         "iwoozie.baby",
//         "linkvertise.com/?iwantreferrer=",
//         "F.E.A.R is processing",
//         "DirectPaste detected",
//         "/api/challenger/encrypted-bytes",
//       ],
//       suspiciousIds: ["cjlaly", "lkuag"],
//       suspiciousDomains: ["iwoozie.baby", "lootlink.com", "novemberdismount.com"],
//       suspiciousStyles: ["z-index: 2147483647", "opacity: 0.01", "position: fixed"],
//     };
  
//     let hasDetectedBypass = false;
//     let cleanupAttempts = 0;
//     const MAX_CLEANUP_ATTEMPTS = 2;
  
//     // Prevent rapid refresh attempts
//     function checkRefresh() {
//       const lastRefresh = sessionStorage.getItem(REFRESH_KEY);
//       const now = Date.now();
  
//       if (lastRefresh) {
//         const refreshCount = parseInt(sessionStorage.getItem("_vanguardRefreshCount") || "0");
//         const timeDiff = now - parseInt(lastRefresh);
  
//         if (timeDiff < REFRESH_WINDOW) {
//           const newCount = refreshCount + 1;
//           sessionStorage.setItem("_vanguardRefreshCount", newCount.toString());
  
//           if (newCount >= REFRESH_LIMIT) {
//             handleDetection("Rapid refresh detected");
//             return true;
//           }
//         } else {
//           sessionStorage.setItem("_vanguardRefreshCount", "0");
//         }
//       }
  
//       sessionStorage.setItem(REFRESH_KEY, now.toString());
//       return false;
//     }
  
//     // Block userscript APIs
//     function blockUserscriptAPIs() {
//       const apis = ["GM_xmlhttpRequest", "GM_getValue", "GM_setValue", "GM_info"];
//       apis.forEach((api) => {
//         Object.defineProperty(window, api, {
//           get: function () {
//             handleDetection("Userscript API access attempted");
//             return function () {
//               return null;
//             };
//           },
//           configurable: false,
//         });
//       });
//     }
  
//     // Monitor network activity
//     function setupNetworkProtection() {
//       const originalFetch = window.fetch;
//       window.fetch = function (...args) {
//         const url = args[0]?.url || args[0];
//         if (typeof url === "string") {
//           if (signatures.fearSpecific.some((pattern) => url.toLowerCase().includes(pattern))) {
//             handleDetection("Suspicious network request detected");
//             return Promise.reject("Blocked");
//           }
//         }
//         return originalFetch.apply(this, args);
//       };
  
//       const originalOpen = XMLHttpRequest.prototype.open;
//       XMLHttpRequest.prototype.open = function (...args) {
//         const url = args[1];
//         if (typeof url === "string") {
//           if (signatures.fearSpecific.some((pattern) => url.toLowerCase().includes(pattern))) {
//             handleDetection("Suspicious XMLHttpRequest detected");
//             throw new Error("Blocked");
//           }
//         }
//         return originalOpen.apply(this, args);
//       };
//     }
  
//     // Monitor and prevent DOM tampering
//     const observer = new MutationObserver((mutations) => {
//       if (hasDetectedBypass || cleanupAttempts >= MAX_CLEANUP_ATTEMPTS) return;
  
//       mutations.forEach((mutation) => {
//         mutation.addedNodes.forEach((node) => {
//           if (node.nodeType === 1) {
//             // Check for suspicious IDs
//             if (signatures.suspiciousIds.some((id) => node.id?.includes(id))) {
//               handleSuspiciousElement(node);
//             }
  
//             // Check for suspicious styles
//             if (
//               node.getAttribute("style") &&
//               signatures.suspiciousStyles.some((style) =>
//                 node.getAttribute("style").includes(style)
//               )
//             ) {
//               handleSuspiciousElement(node);
//             }
  
//             // Check for suspicious links or scripts
//             if (node.tagName === "A" || node.tagName === "SCRIPT") {
//               if (
//                 signatures.suspiciousDomains.some((domain) =>
//                   node.href?.includes(domain) || node.src?.includes(domain)
//                 )
//               ) {
//                 handleSuspiciousElement(node);
//               }
//             }
//           }
//         });
//       });
//     });
  
//     function handleSuspiciousElement(element) {
//       cleanupAttempts++;
//       if (cleanupAttempts < MAX_CLEANUP_ATTEMPTS) {
//         console.log("[Vanguard] Removing suspicious element");
//         element.remove();
//       } else {
//         handleDetection("Multiple suspicious elements detected");
//       }
//     }
  
//     // Detect and handle bypass attempts
//     function handleDetection(reason) {
//       if (hasDetectedBypass) return;
//       hasDetectedBypass = true;
  
//       console.log("[Vanguard] 🚨 Detection:", reason);
//       alert("❌ Unauthorized bypass attempt detected ❌");
  
//       // Cleanup suspicious elements
//       document
//         .querySelectorAll(
//           signatures.suspiciousIds.map((id) => `[id*="${id}"]`).join(",")
//         )
//         .forEach((el) => el.remove());
  
//       setTimeout(() => {
//         window.location.href = "https://pandadevelopment.net";
//       }, 1500);
//     }
  
//     // Block developer tools
//     function blockDevTools() {
//       document.addEventListener("keydown", (event) => {
//         if (
//           (event.ctrlKey || event.metaKey) &&
//           ["I", "J", "U", "C", "S"].includes(event.key.toUpperCase())
//         ) {
//           handleDetection("Developer tools shortcut detected");
//           event.preventDefault();
//         }
//       });
  
//       const originalConsoleLog = console.log;
//       Object.defineProperty(console, "log", {
//         value: function (...args) {
//           if (
//             args.some((arg) =>
//               typeof arg === "string" &&
//               signatures.fearSpecific.some((pattern) => arg.includes(pattern))
//             )
//           ) {
//             handleDetection("Unauthorized console usage detected");
//           } else {
//             originalConsoleLog.apply(console, args);
//           }
//         },
//         configurable: false,
//       });
//     }
  
//     // Initialize protection
//     function initialize() {
//       console.log("[Vanguard] Initializing protection...");
  
//       // Run refresh check
//       if (checkRefresh()) {
//         throw new Error("Blocked rapid refresh");
//       }
  
//       blockUserscriptAPIs();
//       setupNetworkProtection();
//       blockDevTools();
  
//       // Start DOM monitoring
//       observer.observe(document.documentElement, {
//         childList: true,
//         subtree: true,
//         attributes: true,
//       });
  
//       console.log("[Vanguard] Protection active");
//     }
  
//     // Start protection when DOM is ready
//     if (document.readyState === "loading") {
//       document.addEventListener("DOMContentLoaded", initialize);
//     } else {
//       initialize();
//     }
//   })();
