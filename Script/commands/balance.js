module.exports.config = {
  name: "bal",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Check your balance or someone else's balance",
  commandCategory: "Economy",
  usages: "[tag or reply or none]",
  cooldowns: 0,
  usePrefix: true
};

module.exports.run = async function ({ api, event, args, Currencies }) {
  const { threadID, messageID, senderID, mentions, messageReply } = event;

  // 𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗙𝗼𝗿𝗺𝗮𝘁𝘁𝗶𝗻𝗴 𝗛𝗲𝗹𝗽𝗲𝗿
  const formatMsg = (text) => {
    return `───────────────\n\n» ${text}\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;
  };

  try {
    // 𝗦𝗲𝗹𝗳 𝗕𝗮𝗹𝗮𝗻𝗰𝗲
    if (!args[0] && !messageReply) {
      const data = await Currencies.getData(senderID);
      const money = data.money || 0;
      
      const msgText = money === 0 
        ? "😅 𝗬𝗼𝘂 𝗵𝗮𝘃𝗲 𝗻𝗼 𝗺𝗼𝗻𝗲𝘆 𝗮𝘁 𝗮𝗹𝗹!" 
        : `💰 𝗬𝗼𝘂𝗿 𝗰𝘂𝗿𝗿𝗲𝗻𝘁 𝗯𝗮𝗹𝗮𝗻𝗰𝗲: ${money}$`;
        
      return api.sendMessage(formatMsg(msgText), threadID, messageID);
    }

    // 𝗠𝗲𝗻𝘁𝗶𝗼𝗻 𝗕𝗮𝗹𝗮𝗻𝗰𝗲
    if (Object.keys(mentions).length === 1) {
      const mentionID = Object.keys(mentions)[0];
      const name = mentions[mentionID].replace(/@/g, "");
      const data = await Currencies.getData(mentionID);
      const money = data.money || 0;
      
      const msgText = money === 0 
        ? `😅 ${name} 𝗵𝗮𝘃𝗲 𝗻𝗼 𝗺𝗼𝗻𝗲𝘆 𝗮𝘁 𝗮𝗹𝗹!` 
        : `💰 ${name}'𝘀 𝗰𝘂𝗿𝗿𝗲𝗻𝘁 𝗯𝗮𝗹𝗮𝗻𝗰𝗲: ${money}$`;
        
      return api.sendMessage({
        body: formatMsg(msgText),
        mentions: [{ tag: name, id: mentionID }]
      }, threadID, messageID);
    }

    // 𝗥𝗲𝗽𝗹𝘆 𝗕𝗮𝗹𝗮𝗻𝗰𝗲
    if (messageReply) {
      const replyID = messageReply.senderID;
      const name = messageReply.senderName || "User";
      const data = await Currencies.getData(replyID);
      const money = data.money || 0;
      
      const msgText = money === 0 
        ? `😅 ${name} 𝗵𝗮𝘃𝗲 𝗻𝗼 𝗺𝗼ﻨ𝗲𝘆 𝗮𝘁 𝗮𝗹𝗹!` 
        : `💰 ${name}'𝘀 𝗰𝘂𝗿𝗿𝗲𝗻𝘁 𝗯𝗮𝗹𝗮𝗻𝗰𝗲: ${money}$`;
        
      return api.sendMessage({
        body: formatMsg(msgText),
        mentions: [{ tag: name, id: replyID }]
      }, threadID, messageID);
    }

    // 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲 𝗔𝗹𝗲𝗿𝘁
    const usageAlert = `⚠️ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲!\n» 𝗨𝘀𝗲: ${global.config.PREFIX}${this.config.name} ${this.config.usages}`;
    return api.sendMessage(formatMsg(usageAlert), threadID, messageID);

  } catch (error) {
    const errorMsg = `❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${error.message}`;
    return api.sendMessage(formatMsg(errorMsg), threadID, messageID);
  }
};
