module.exports.config = {
  name: "kickall",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Remove all group members.",
  commandCategory: "box chat",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event, getText, args }) {
  const { threadID, messageID, senderID } = event;
  
  const config = global.config || {};
  const botAdmins = config.ADMINBOT || [];

  try {
    const info = await api.getThreadInfo(threadID);
    const botID = api.getCurrentUserID();

    if (!info.adminIDs.some(item => item.id == botID)) {
      return api.sendMessage(
`───────────────
» ❎ আগে বটকে গ্রুপ এডমিন দিন 
» 😊 তারপর আবার চেষ্টা করুন.
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }

    let listUserID = [];

    if (botAdmins.includes(senderID)) {
      listUserID = info.participantIDs.filter(ID => ID != botID && !botAdmins.includes(ID));
    } else if (info.adminIDs.some(item => item.id == senderID)) {
      listUserID = info.participantIDs.filter(ID => ID != botID && !botAdmins.includes(ID));
    } else {
      return api.sendMessage(
`───────────────
» ❌ 𝗢𝗻𝗹𝘆 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻𝘀 𝗼𝗿 
» 🧚 𝗚𝗿𝗼𝘂𝗽 𝗔𝗱𝗺𝗶𝗻𝘀 𝗰𝗮𝗻 𝘂𝘀𝗲 
» 👑 𝘁𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱.
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }

    api.sendMessage(
`───────────────
» ⚠️ 𝗦𝘁𝗮𝗿𝘁 𝗱𝗲𝗹𝗲𝘁𝗶𝗻𝗴 𝗮𝗹𝗹 
» 🛸 𝗺𝗲𝗺𝗯𝗲𝗿𝘀. 
» 👋 𝗕𝘆𝗲 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲.
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID);

    for (const id of listUserID) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      api.removeUserFromGroup(id, threadID);
    }

  } catch (err) {
    return api.sendMessage(
`───────────────
» ❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱.
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
  }
};
