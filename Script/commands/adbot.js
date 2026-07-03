module.exports.config = {
    name: "ckbot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Get information about user, box, or admin",
    commandCategory: "Media",
    usages: "",
    cooldowns: 4,
    dependencies: {
        "axios": "",
        "fs-extra": ""
    }
};

module.exports.run = async ({ api, event, args }) => {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    // ===== হেল্প মেসেজ (সহজ বাংলায় কনভার্ট করা) =====
    if (args.length == 0) {
        return api.sendMessage(
`───────────────

» ℹ️ 𝗕𝗼𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗨𝘀𝗮𝗴𝗲𝘀:

   » ${prefix}${this.config.config.name} 𝘂𝘀𝗲𝗿 => আপনার নিজের ইনফরমেশন দেখতে।
   » ${prefix}${this.config.config.name} 𝘂𝘀𝗲𝗿 @[𝗧𝗮𝗴] => যাকে ট্যাগ করবেন তার ইনফরমেশন দেখতে।
   » ${prefix}${this.config.config.name} 𝗯𝗼𝘅 => এই গ্রুপের (𝗕𝗼𝘅) ইনফরমেশন দেখতে।
   » ${prefix}${this.config.config.name} 𝗮𝗱𝗺𝗶𝗻 => বটের মেইন এডমিনের ইনফরমেশন দেখতে।

───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
            event.threadID,
            event.messageID
        );
    }

    const pathImg = __dirname + `/cache/ckbot_${event.threadID}.png`;

    // ===== Box Info =====
    if (args[0] == "box") {
        let targetThreadID = args[1] ? args[1] : event.threadID;
        let threadInfo = await api.getThreadInfo(targetThreadID);
        let img = threadInfo.imageSrc;
        let male = threadInfo.userInfo.filter(u => u.gender === "MALE").length;
        let female = threadInfo.userInfo.filter(u => u.gender === "FEMALE").length;
        let approval = threadInfo.approvalMode ? "𝗧𝘂𝗿𝗻 𝗼𝗻" : "𝗧𝘂𝗿𝗻 𝗼𝗳𝗳";

        let msg = `───────────────\n\n» 📦 𝗕𝗢𝗫 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡\n\n   » 𝗚𝗿𝗼𝘂𝗽 𝗻𝗮𝗺𝗲 : ${threadInfo.threadName}\n   » 𝗧𝗜𝗗 : ${targetThreadID}\n   » 𝗔𝗽𝗽𝗿𝗼𝘃𝗲𝗱 : ${approval}\n   » 𝗘𝗺𝗼𝗷𝗶 : ${threadInfo.emoji}\n\n» 📊 𝗠𝗘𝗠𝗕𝗘𝗥 𝗦𝗧𝗔𝗧𝗦\n\n   » 𝗠𝗲𝗺𝗯𝗲𝗿𝘀 : ${threadInfo.participantIDs.length} | 𝗔𝗱𝗺𝗶𝗻𝘀 : ${threadInfo.adminIDs.length}\n   » 𝗠𝗮𝗹𝗲 : ${male} | 𝗙𝗲𝗺𝗮𝗹𝗲 : ${female}\n   » 𝗧𝗼𝘁𝗮𝗹 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀 : ${threadInfo.messageCount}\n\n───────────────\n\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

        if (!img) return api.sendMessage(msg, event.threadID, event.messageID);

        try {
            const response = await axios.get(img, { responseType: "arraybuffer" });
            fs.writeFileSync(pathImg, Buffer.from(response.data, "utf-8"));
            return api.sendMessage({ body: msg, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
        } catch (err) {
            return api.sendMessage(msg, event.threadID, event.messageID);
        }
    }

    // ===== Admin Info (সম্পূর্ণ ডায়নামিক ও আপনার নাম সেট করা) =====
    if (args[0] == "admin") {
        let msg = `───────────────\n\n» 👑 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡\n\n   » 𝗡𝗮𝗺𝗲 : 𝗦𝗜𝗬𝗔𝗠-𝗛𝗔𝗦𝗔𝗡\n   » 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : https://facebook.com/100044713412032\n   » 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 ${global.config.BOTNAME} 𝗯𝗼𝘁.\n\n───────────────\n\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;
        
        try {
            const response = await axios.get(`https://graph.facebook.com/100044713412032/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" });
            fs.writeFileSync(pathImg, Buffer.from(response.data, "utf-8"));
            return api.sendMessage({ body: msg, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
        } catch (err) {
            return api.sendMessage(msg, event.threadID, event.messageID);
        }
    }

    // ===== User Info =====
    if (args[0] == "user") {
        let id;
        if (!args[1]) {
            id = event.type == "message_reply" ? event.messageReply.senderID : event.senderID;
        } else if (Object.keys(event.mentions).length > 0) {
            id = Object.keys(event.mentions)[0];
        } else {
            id = args[1];
        }

        let data = await api.getUserInfo(id);
        let username = data[id].vanity;
        let profileUrl = username ? `https://facebook.com/${username}` : `https://facebook.com/profile.php?id=${id}`;
        let isFriend = data[id].isFriend ? "𝗬𝗲𝘀" : "𝗡𝗼";
        let name = data[id].name;
        let gender = data[id].gender == 2 ? "𝗠𝗮𝗹𝗲" : data[id].gender == 1 ? "𝗙𝗲𝗺𝗮𝗹𝗲" : "𝗡𝗼𝘁 𝘀𝗽𝗲𝗰𝗶𝗳𝗶𝗲𝗱";

        let msg = `───────────────\n\n» 👤 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡\n\n   » 𝗡𝗮𝗺𝗲 : ${name}\n   » 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗨𝗥𝗟 : ${profileUrl}\n   » 𝗨𝗜𝗗 : ${id}\n   » 𝗚𝗲𝗻𝗱𝗲𝗿 : ${gender}\n   » 𝗙𝗿𝗶𝗲𝗻𝗱 𝘄𝗶𝘁𝗵 𝗯𝗼𝘁 : ${isFriend}\n\n───────────────\n\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

        try {
            const response = await axios.get(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" });
            fs.writeFileSync(pathImg, Buffer.from(response.data, "utf-8"));
            return api.sendMessage({ body: msg, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
        } catch (err) {
            return api.sendMessage(msg, event.threadID, event.messageID);
        }
    }
};
