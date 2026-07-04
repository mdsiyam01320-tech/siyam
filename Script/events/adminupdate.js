module.exports.config = {
  name: "adminUpdate",
  eventType: ["log:thread-admins","log:thread-name", "log:user-nickname","log:thread-icon","log:thread-call","log:thread-color"],
  version: "1.0.1",
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Update team information quickly",
  envConfig: {
    sendNoti: true,
  }
};

module.exports.run = async function ({ event, api, Threads, Users }) {
  const fs = require("fs");
  var iconPath = __dirname + "/emoji.json";
  if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
  const { threadID, logMessageType, logMessageData } = event;
  const { setData, getData } = Threads;

  const thread = global.data.threadData.get(threadID) || {};  
  if (typeof thread["adminUpdate"] != "undefined" && thread["adminUpdate"] == false) return;  

  try {  
    let dataThread = (await getData(threadID)).threadInfo || {};  
    let msgText = "";

    switch (logMessageType) {  
      case "log:thread-admins": {  
        if (logMessageData.ADMIN_EVENT == "add_admin") {  
          dataThread.adminIDs.push({ id: logMessageData.TARGET_ID });  
          msgText = `📢 𝗡𝗢𝗧𝗜𝗖𝗘\n\n» 𝐔𝐩𝐝𝐚𝐭𝐞 𝐮𝐬𝐞𝐫 ${logMessageData.TARGET_ID}\n» 𝐀𝐝𝐦𝐢𝐧 𝐏𝐨𝐰𝐞𝐫 𝐀𝐜𝐭𝐢𝐯𝐚𝐭𝐞! 🧙‍♂️🔮\n» অফিসিয়ালি এখন তুই 𝐕𝐈Play 😎🎩`;
        }  
        else if (logMessageData.ADMIN_EVENT == "remove_admin") {  
          dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);  
          msgText = `📢 𝗡𝗢𝗧𝗜𝗖𝗘\n\n» 𝐔𝐩𝐝𝐚𝐭𝐞 𝐮𝐬𝐞𝐫 ${logMessageData.TARGET_ID}\n» বেশি চুল পাকনামি করার কারণে 🥴 তোকে এডমিন থেকে লাথি মেরে বের করে দেওয়া হল! 😂`;
        }  
        break;  
      }  

      case "log:thread-icon": {  
        let preIcon = JSON.parse(fs.readFileSync(iconPath));  
        dataThread.threadIcon = event.logMessageData.thread_icon || "👍";  
        msgText = `⚙️ 𝗚𝗥𝗢𝗨𝗣 𝗨𝗣𝗗𝗔𝗧𝗘\n\n» 𝐆𝐫𝐨𝐮𝐩 𝐢𝐜𝐨𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐜𝐡𝐚𝐧𝐠𝐞𝐝.\n» 𝐎𝐫𝐢𝐠𝐢𝐧𝐚𝐥 𝐢𝐜𝐨𝐧: ${preIcon[threadID] || "𝘂𝗻𝗸𝗻𝗼𝘄𝗻"}`;
        preIcon[threadID] = dataThread.threadIcon;  
        fs.writeFileSync(iconPath, JSON.stringify(preIcon));  
        break;  
      }  

      case "log:thread-call": {  
        if (logMessageData.event === "group_call_started") {  
          const name = await Users.getNameUser(logMessageData.caller_id);  
          msgText = `📞 𝗚𝗥𝗢𝗨𝗣 𝗨𝗣𝗗𝗔𝗧𝗘\n\n» ${name} 𝐒𝐓𝐀𝐑𝐓𝐄block 𝐀 ${(logMessageData.video) ? '𝐕𝐈𝐃𝐄𝐎 ' : ''}𝐂𝐀𝐋𝐋.`;  
        } else if (logMessageData.event === "group_call_ended") {  
          const callDuration = logMessageData.call_duration;  
          const hours = Math.floor(callDuration / 3600);  
          const minutes = Math.floor((callDuration - (hours * 3600)) / 60);  
          const seconds = callDuration - (hours * 3600) - (minutes * 60);  
          msgText = `📞 𝗚𝗥𝗢𝗨𝗣 𝗨𝗣𝗗𝗔𝗧𝗘\n\n» ${(logMessageData.video) ? '𝐕𝐢𝐝𝐞𝐨' : ''} 𝐜𝐚𝐥𝐥 𝐡𝐚𝐬 𝐞𝐧𝐝𝐞𝐝.\n» 𝐂𝐚𝐥𝐥 𝐝𝐮𝐫𝐚𝐭𝐢𝐨𝐧: ${hours}:${minutes}:${seconds}`;  
        } else if (logMessageData.joining_user) {  
          const name = await Users.getNameUser(logMessageData.joining_user);  
          msgText = `📞 𝗚𝗥𝗢𝗨𝗣 𝗨𝗣𝗗𝗔𝗧𝗘\n\n» ${name} 𝐉𝐨𝐢𝐧𝐞𝐝 𝐭𝐡𝐞 ${(logMessageData.group_call_type == '1') ? '𝐕𝐢𝐝𝐞𝐨' : ''} 𝐜𝐚𝐥𝐥.`;  
        }  
        break;  
      }  

      case "log:thread-color": {  
        dataThread.threadColor = event.logMessageData.thread_color || "🌤";  
        msgText = `🎨 𝗚𝗥𝗢𝗨𝗣 𝗨𝗣𝗗𝗔𝗧𝗘\n\n» ${event.logMessageBody.replace("Theme", "𝐜𝐨𝐥𝐨𝐫")}`;  
        break;  
      }  
        
      case "log:user-nickname": {  
        dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;  
        if (typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && !dataThread.adminIDs.some(item => item.id == event.author) || event.author == api.getCurrentUserID()) return;  
        msgText = `📢 𝗡𝗢𝗧𝗜𝗖𝗘\n\n» 𝐔𝐩𝐝𝐚𝐭𝐞 𝐮𝐬𝐞𝐫 𝐧𝐢𝐜𝐤𝐧𝐚𝐦𝐞𝐬 ${logMessageData.participant_id}\n» 𝐓𝐨: ${(logMessageData.nickname.length == 0) ? "𝐨𝐫𝐢𝐠𝐢𝐧𝐚𝐥 𝐧𝐚𝐦𝐞": logMessageData.nickname}`;  
        break;  
      }  

      case "log:thread-name": {  
        dataThread.threadName = event.logMessageData.name || "𝐍𝐨 𝐧𝐚𝐦𝐞";  
        msgText = `📢 𝗡𝗢𝗧𝗜𝗖𝗘\n\n» 𝐔𝐩𝐝𝐚𝐭𝐞 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐧𝐚𝐦𝐞 𝐭𝐨: ${dataThread.threadName}`;  
        break;  
      }  
    }  

    if (msgText.length > 0 && global.configModule[this.config.name].sendNoti) {
      
      const finalMsg = `───────────────\n\n» ${msgText}\n\n───────────────\n» ─꯭─⃝‌‌🧚𝗦𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁─⃝‌‌🧚`;
      
      api.sendMessage(finalMsg, threadID, async (error, info) => {  
        if (global.configModule[this.config.name].autoUnsend && info) {  
          await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));  
          return api.unsendMessage(info.messageID);  
        }  
      });
    }

    await setData(threadID, { threadInfo: dataThread });  
  } catch (e) { 
    console.log(e); 
  }
};
