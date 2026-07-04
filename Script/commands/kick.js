module.exports.config = {
  name: "kick",
  version: "1.0.1", 
  hasPermssion: 2,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "the person you need to remove from the group by tag",
  commandCategory: "System", 
  usages: "[tag]", 
  cooldowns: 0,
};

module.exports.languages = {
  "vi": {
    "error": "Đã có lỗi xảy ra, vui lòng thử lại sau",
    "needPermssion": "Cần quyền quản trị viên nhóm\nVui lòng thêm và thử lại!",
    "missingTag": "Bạn phải tag người cần kick"
  },
  "en": {
    "error": "𝗘𝗿𝗿𝗼𝗿! 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱. 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗹𝗮𝘁𝗲𝗿!",
    "needPermssion": "𝗡𝗲𝗲𝗱 𝗴𝗿𝗼𝘂𝗽 𝗮𝗱𝗺𝗶𝗻\n𝗣𝗹𝗲𝗮𝘀𝗲 𝗮𝗱𝗱 𝗮𝗻𝗱 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻!",
    "missingTag": "𝗬𝗼𝘂 𝗻𝗲𝗲𝗱 𝘁𝗮𝗴 𝘀𝗼𝗺𝗲 𝗽𝗲𝗿𝘀𝗼𝗻 𝘁𝗼 𝗸𝗶𝗰𝗸"
  }
};

module.exports.run = async function({ api, event, getText, Threads }) {
  var mention = Object.keys(event.mentions);
  try {
    let dataThread = (await Threads.getData(event.threadID)).threadInfo;
    
    if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID())) {
      return api.sendMessage(
`───────────────
» ❌ ${getText("needPermssion")}
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
    }
    
    if (!mention[0]) {
      return api.sendMessage(
`───────────────
» ❗ 𝗬𝗼𝘂 𝗵𝗮𝘃𝗲 𝘁𝗼 
» 👋 𝘁𝗮𝗴 𝘁𝗵𝗲 𝗻𝗲𝗲𝗱 𝘁𝗼 𝗸𝗶𝗰𝗸
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
    }

    const config = global.config || {};
    const botAdmins = config.ADMINBOT || [];

    if (!botAdmins.includes(event.senderID)) {
      return api.sendMessage(
`───────────────
» ❌ 𝗢𝗻𝗹𝘆 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻𝘀 
» 😩 𝗰𝗮𝗻 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱.
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
    }

    for (const o in mention) {
      const targetID = mention[o];

      if (botAdmins.includes(targetID)) {
        api.sendMessage(
`───────────────
» ⚠️ মামা উনি তো আমার বস 😊
» 😠 বস কে কিক দেওয়া যাবে না 🤦
» 🙄 আরেকবার কমান্ড করলে 😑 
» 🌝 তরে লাথি দিমু 😹?
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
        continue;
      }

      setTimeout(() => {
        api.removeUserFromGroup(targetID, event.threadID);
      }, 3000);
    }
  } catch { 
    return api.sendMessage(
`───────────────
» ❌ ${getText("error")}
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID); 
  }
};
