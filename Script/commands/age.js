module.exports = {
  config: {
    name: "age",
    version: "2.1",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    hasPermission: 0,
    commandCategory: "utility",
    cooldowns: 5,
    description: "Calculate age from birth date",
    usage: "[DD/MM/YYYY]",
    dependencies: {
      "moment-timezone": "",
      "fs-extra": "",
      "axios": ""
    }
  },

  run: async function ({ api, event, args }) {
    const fs = require("fs-extra");
    const moment = require("moment-timezone");
    const axios = require("axios");

    const id = event.threadID;

    try {
      if (!args[0]) {
        return api.sendMessage("───────────────\n» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝘆𝗼𝘂𝗿 𝗯𝗶𝗿𝘁𝗵 𝗱𝗮𝘁𝗲 𝗶𝗻 𝗗聯/𝗠𝗠/𝗬𝗬... 𝗳𝗼𝗿𝗺𝗮𝘁.\n» 𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝗮𝗴𝗲 𝟭𝟲/𝟭𝟮/𝟮𝟬𝟬𝟲\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", id, event.messageID);
      }

      const input = args[0];
      const dateParts = input.split('/');
      
      if (dateParts.length !== 3) {
        return api.sendMessage("───────────────\n» ❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗱𝗮𝘁𝗲 𝗳𝗼𝗿𝗺𝗮𝘁. 𝗣𝗹𝗲𝗮𝘀𝗲 𝘂𝘀𝗲 𝗗/𝗠𝗠/𝗬𝗬𝗬𝗬.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", id, event.messageID);
      }

      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);

      if (isNaN(day) || day < 1 || day > 31) {
        return api.sendMessage("───────────────\n» ❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗱𝗮𝘆 (𝟭-𝟯𝟭).\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", id, event.messageID);
      }
      if (isNaN(month) || month < 1 || month > 12) {
        return api.sendMessage("───────────────\n» ❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗺𝗼𝗻𝘁𝗵 (𝟭-𝟭𝟮).\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", id, event.messageID);
      }
      if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
        return api.sendMessage("───────────────\n» ❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝘆𝗲𝗮𝗿.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", id, event.messageID);
      }

      const birthDate = moment.tz(`${year}-${month}-${day}`, "YYYY-MM-DD", "Asia/Dhaka");
      const now = moment.tz("Asia/Dhaka");
      
      if (birthDate.isAfter(now)) {
        return api.sendMessage("───────────────\n» ❌ 𝗬𝗼𝘂 𝗰𝗮𝗻'𝘁 𝗯𝗲 𝗯𝗼𝗿𝗻 𝗶𝗻 𝘁𝗵𝗲 𝗳𝘂𝘁𝘂𝗿𝗲!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", id, event.messageID);
      }

      const duration = moment.duration(now.diff(birthDate));
      
      const years = duration.years();
      const months = duration.months();
      const days = duration.days();
      const totalMonths = years * 12 + months;
      const totalDays = Math.floor(duration.asDays());
      const totalHours = Math.floor(duration.asHours());

      const avatarPath = `${__dirname}/cache/${event.senderID}.jpg`;
      const avatarUrl = `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512`;
      
      try {
        const response = await axios.get(avatarUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(avatarPath);
        response.data.pipe(writer);
        
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
      } catch (e) {
        console.error("Avatar download failed, sending text only.");
      }

      const formattedMsg = `───────────────\n» 🎂 𝗔𝗚𝗘 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗢𝗥 🎂\n» 📅 𝗕𝗶𝗿𝘁𝗵: ${day}/${month}/${year}\n» ⏱️ 𝗔𝗴𝗲: ${years} 𝗬𝗲𝗮𝗿𝘀 ${months} 𝗠𝗼𝗻𝘁𝗵𝘀 ${days} 𝗗𝗮𝘆𝘀\n» 📊 𝗧𝗼𝘁𝗮𝗹 𝗠𝗼𝗻𝘁𝗵𝘀: ${totalMonths}\n» 📆 𝗧𝗼𝘁𝗮𝗹 𝗗𝗮𝘆𝘀: ${totalDays}\n» ⏳ 𝗧𝗼𝘁𝗮𝗹 𝗛𝗼𝘂𝗿𝘀: ${totalHours}\n» 🤖 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆: ─꯭─⃝‌‌𝗦𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

      const message = { body: formattedMsg };
      if (fs.existsSync(avatarPath)) {
        message.attachment = fs.createReadStream(avatarPath);
      }

      await api.sendMessage(message, id, event.messageID);
      if (fs.existsSync(avatarPath)) fs.unlinkSync(avatarPath);

    } catch (error) {
      console.error("Error in age command:", error);
      api.sendMessage("───────────────\n» ❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗽𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", id, event.messageID);
    }
  }
};
