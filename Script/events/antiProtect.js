const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
  name: "antiProtect",
  version: "3.0.0",
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Protect group name and photo",
  eventType: ["log:thread-name", "log:thread-icon"],
  cooldowns: 3
};

module.exports.run = async function ({ api, event }) {
  try {
    const threadID = event.threadID;
    const senderID = event.author || event.senderID;

    const dir = `${__dirname}/../../cache/antiProtect/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const dataFile = dir + `${threadID}.json`;

    const threadInfo = await api.getThreadInfo(threadID);
    const adminIDs = (threadInfo.adminIDs || []).map(i => i.id);
    const botID = api.getCurrentUserID();
    const isAdmin = adminIDs.includes(senderID);
    const botAdmin = adminIDs.includes(botID);
    if (!botAdmin) return;

    if (!fs.existsSync(dataFile)) {
      const snap = {
        name: threadInfo.threadName || "",
        image: threadInfo.imageSrc || null
      };
      fs.writeFileSync(dataFile, JSON.stringify(snap, null, 2));
      return;
    }

    const old = JSON.parse(fs.readFileSync(dataFile));

    if (isAdmin || senderID == botID) {
      const snap = {
        name: threadInfo.threadName,
        image: threadInfo.imageSrc
      };
      fs.writeFileSync(dataFile, JSON.stringify(snap, null, 2));
      return;
    }

    switch (event.logMessageType) {

      case "log:thread-name": {
        await api.setTitle(old.name, threadID).catch(() => {});
        
        const msgName = `───────────────\n\n» 🚫 𝐆𝐫𝐨𝐮𝐩 𝐧𝐚𝐦𝐞 𝐜𝐡𝐚𝐧𝐠𝐞 𝐛𝐥𝐨𝐜𝐤𝐞𝐝!\n» 👤 𝐔𝐬2𝐞𝐫: ${senderID}\n» 𝐑𝐞𝐯𝐞𝐫𝐭𝐞𝐝 𝐭𝐨: "${old.name}"\n\n───────────────\n» ─꯭─⃝‌‌🧚𝗦𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁─⃝‌‌🧚`;
        return api.sendMessage(msgName, threadID);
      }

      case "log:thread-icon": {
        try {
          if (old.image) {
            const res = await axios.get(old.image, { responseType: "arraybuffer" });
            const buf = Buffer.from(res.data, "binary");
            await api.changeGroupImage(buf, threadID);
          }
        } catch {}
      
        const msgIcon = `───────────────\n\n» 🚫 𝐆𝐫𝐨𝐮𝐩 𝐩𝐡𝐨𝐭𝐨 𝐜𝐡𝐚𝐧𝐠𝐞 𝐛𝐥𝐨𝐜𝐤𝐞𝐝!\n» 👤 𝐔𝐬𝐞𝐫: ${senderID}\n» 𝐎𝐥𝐝 𝐩𝐡𝐨𝐭𝐨 𝐫𝐞𝐬𝐭𝐨𝐫𝐞𝐝.\n\n───────────────\n» ─꯭─⃝‌‌🧚𝗦𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁─⃝‌‌🧚`;
        return api.sendMessage(msgIcon, threadID);
      }
    }
  } catch (e) {
    console.log("antiProtect Error:", e);
  }
};
