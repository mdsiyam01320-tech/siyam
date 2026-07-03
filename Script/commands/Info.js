const fs = require("fs-extra");
const request = require("request");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
    name: "info",
    version: "1.5.0",
    hasPermssion: 0,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Bot information command",
    commandCategory: "For users",
    hide: true,
    usages: "",
    cooldowns: 5,
};

function boldNum(num) {
    const boldDigits = {
        '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
        '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
    };
    return String(num).split('').map(char => boldDigits[char] || char).join('');
}

module.exports.run = async function ({ api, event, args, Users, Threads }) {
    const { threadID, messageID } = event;

    const { configPath } = global.client;
    delete require.cache[require.resolve(configPath)];
    const config = require(configPath);

    const { commands } = global.client;
    const threadSetting = (await Threads.getData(String(threadID))).data || {};
    const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : config.PREFIX;

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const totalUsers = global.data.allUserID.length;
    const totalThreads = global.data.allThreadID.length;

    const bHours = boldNum(hours);
    const bMinutes = boldNum(minutes);
    const bSeconds = boldNum(seconds);
    const bPing = boldNum(Date.now() - event.timestamp);
    const bModules = boldNum(commands.size);
    const bThreads = boldNum(totalThreads);
    const bUsers = boldNum(totalUsers);

    const msg = `───────────────

» 🤖 𝗕𝗢𝗧𝗧 𝗜𝗡𝗙𝗢
» 🤖 𝗕𝗼𝘁:─꯭─⃝‌‌𝘀𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁
» ☢️ 𝗣𝗿𝗲𝗳𝗶𝘅 : ${config.PREFIX}
» ♻️ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗕𝗼𝘅 : ${prefix}
» 🔶 𝗠𝗼𝗱𝘂𝗹𝗲𝘀 : ${bModules}
» 🔰 𝗣𝗶𝗻𝗴 : ${bPing}𝗺𝘀
───────────────
» 👑 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢
» 👑 𝗡𝗮𝗺𝗲 : 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍👑
» 📲 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : 𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸.𝗰𝗼𝗺/𝟲𝟭𝟱𝟵𝟭𝟯𝟳𝟭𝟭𝟴𝟲𝟭𝟳𝟵
───────────────
» 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 : 𝘄𝗮.𝗺𝗲/+𝟴𝟴𝟬𝟭𝟳𝟴𝟵𝟭𝟯𝟴𝟭𝟱𝟳
───────────────
» ⏳ 𝗔𝗖𝗧𝗜𝗩𝗜𝗧𝗜𝗘𝗦
» ⏳ 𝗔𝗰𝘁𝗶𝘃𝗲 𝗧𝗶𝗺𝗲 : ${bHours}𝗵 ${bMinutes}𝗺 ${bSeconds}𝘀
» 📣 𝗚𝗿𝗼𝘂𝗽𝘀 : ${bThreads}
» 🧿 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀 : ${bUsers}

───────────────
» ❤️ 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 🌺
» 🧚 ─꯭─⃝‌‌𝘀𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

    const imgLinks = [
        "https://i.imgur.com/Tl9fQ7K.jpeg",
        "https://i.imgur.com/Umf1j2H.jpeg"
    ];

    const imgLink = imgLinks[Math.floor(Math.random() * imgLinks.length)];
    const imgPath = path.join(__dirname, "cache", `info_${Date.now()}.jpg`);

    const callback = () => {
        if (fs.existsSync(imgPath)) {
            api.sendMessage(
                { body: msg, attachment: fs.createReadStream(imgPath) }, 
                threadID, 
                () => fs.unlinkSync(imgPath), 
                messageID
            );
        }
    };

    request(encodeURI(imgLink))
        .pipe(fs.createWriteStream(imgPath))
        .on("close", () => callback())
        .on("error", () => callback());
};
