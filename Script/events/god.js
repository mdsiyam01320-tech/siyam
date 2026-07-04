module.exports.config = {
  name: "god",
  eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
  version: "1.0.0",
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Record bot activity notifications!",
  envConfig: {
    enable: true
  }
};

module.exports.run = async function({ api, event, Threads }) {
  const logger = require("../../utils/log");
  if (!global.configModule[this.config.name].enable) return;
  
  let task = "";
  
  switch (event.logMessageType) {
    case "log:thread-name": {
      const oldName = (await Threads.getData(event.threadID)).name || "𝗡𝗮𝗺𝗲 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝗲𝘅𝗶𝘀𝘁";
      const newName = event.logMessageData.name || "𝗡𝗮𝗺𝗲 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝗲𝘅𝗶𝘀𝘁";
      task = `𝗨𝘀𝗲𝗿 𝗰𝗵𝗮𝗻𝗴𝗲𝗱 𝗴𝗿𝗼𝘂𝗽 𝗻𝗮𝗺𝗲 𝗳𝗿𝗼𝗺: '${oldName}' 𝘁𝗼 '${newName}'`;
      await Threads.setData(event.threadID, { name: newName });
      break;
    }
    case "log:subscribe": {
      if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        task = "𝗧𝗵𝗲 𝘂𝘀𝗲𝗿 𝗮𝗱𝗱𝗲𝗱 𝘁𝗵𝗲 𝗯𝗼𝘁 𝘁𝗼 𝗮 𝗻𝗲𝘄 𝗴𝗿𝗼𝘂𝗽!";
      }
      break;
    }
    case "log:unsubscribe": {
      if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
        task = "𝗧𝗵𝗲 𝘂𝘀𝗲𝗿 𝗸𝗶𝗰𝗸𝗲𝗱 𝘁𝗵𝗲 𝗯𝗼𝘁 𝗼𝘂𝘁 𝗼𝗳 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽!";
      }
      break;
    }
    default: 
      break;
  }

  if (task.length === 0) return;

  const timeString = new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });


  const formReport = `───────────────\n\n` +
                     `» 📢 𝗕𝗼𝘁 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻\n\n` +
                     `» 𝗧𝗵𝗿𝗲𝗮𝗱 𝗜𝗗: ${event.threadID}\n` +
                     `» 𝗔𝗰𝘁𝗶𝗼𝗻: ${task}\n` +
                     `» 𝗔𝘂𝘁𝗵𝗼𝗿 𝗜𝗗: ${event.author}\n` +
                     `» 𝗧𝗶𝗺𝗲: ${timeString}\n\n` +
                     `───────────────\n` +
                     `» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

  // config.json থেকে মেইন অ্যাডমিনদের আইডি ডায়নামিকালি নেওয়ার মেকানিজম
  const receivers = global.config.ADMINBOT || [];

  for (const id of receivers) {
    try {
      await api.sendMessage(formReport, id);
    } catch (error) {
      logger(formReport, "[ Logging Event ]");
    }
  }
};
