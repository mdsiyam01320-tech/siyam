const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
 description: "Show Owner Info",
 commandCategory: "info",
 usages: "admin",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┌───────────────⭓
│ 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
├───────────────
│ 👤 𝐍𝐚𝐦𝐞 : 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
│ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫 : 𝗠𝗮𝗹𝗲
│ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧 : 𝗦𝗶𝗻𝗴𝗹𝗲
│ 🎂 𝐀𝐠𝐞 : 𝟭𝟳+
│ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 : 𝗜𝘀𝗹𝗮𝗺
│ 🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 𝗖𝗹𝗮𝘀𝘀 𝟭𝟬
│ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : 𝗞𝗶𝘀𝗵𝗼𝗿𝗲𝗴𝗮𝗻𝗷
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:
│ https://fb.com/61591371186179
│ 💬 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽:
│ https://wa.me/01789138157
└───────────────⭓

┌───────────────⭓
│ 🕒 𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗧𝗶𝗺𝗲
├───────────────
│ ${time}
└───────────────⭓
 `,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.imgur.com/idyXtoO.jpeg")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
