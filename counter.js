"use strict";

// AYARLAR ========================================
const TELEGRAM_BOT_TOKEN = "7696115676:AAHc-KC6USTvrmQ4qq-y7D3pKT0duNa543M"; // Kendi bot token'ınızı yazın
const TELEGRAM_CHAT_ID = "-1002545760927"; // Logların gideceği chat ID
const LOG_MESSAGE_PREFIX = "🔔 Yeni Log Kaydı\n\n"; // Mesaj başlığı

// FONKSİYON ======================================
function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: LOG_MESSAGE_PREFIX + message,
    parse_mode: "HTML"
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (!data.ok) {
      console.error("Telegram hatası:", data);
    }
  })
  .catch(error => console.error("Hata:", error));
}

// LOG TOPLAMA ====================================
function collectAndSendLogs() {
  const logData = {
    zaman: new Date().toLocaleString("tr-TR"),
    ip: window.userIP || "IP alınamadı", // IP almak için ekstra backend lazım
    referans: document.referrer || "Direkt erişim",
    tarayici: navigator.userAgent,
    sayfa: window.location.href
  };

  const telegramMessage = `
<b>🕒 Zaman:</b> ${logData.zaman}
<b>🌐 IP:</b> <code>${logData.ip}</code>
<b>🔗 Referans:</b> ${logData.referans}
<b>🖥️ Tarayıcı:</b> ${logData.tarayici}
<b>📌 Sayfa:</b> ${logData.sayfa}
  `;

  sendToTelegram(telegramMessage);
}

// Sayfa yüklendiğinde otomatik log gönder
window.onload = function() {
  collectAndSendLogs();
};