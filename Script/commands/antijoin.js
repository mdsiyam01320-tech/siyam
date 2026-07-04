module.exports.config = {
    name: "antijoin",
    version: "1.0.0",
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    hasPermssion: 1,
    description: "গ্রুপে নতুন মেম্বার জয়েন হওয়া বন্ধ বা চালু করুন।",
    usages: "antijoin",
    commandCategory: "system",
    cooldowns: 0
};

module.exports.run = async ({ api, event, Threads }) => {
    try {
        const info = await api.getThreadInfo(event.threadID);
        
        // বট নিজে অ্যাডমিন কিনা তা চেক করার এরর হ্যান্ডলিং
        if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) {
            return api.sendMessage(
                `───────────────\n` +
                `» ⚠️ 𝗔𝗗𝗠𝗜𝗡 𝗥𝗘𝗤𝗨𝗜𝗥𝗘𝗗\n` +
                `» এই মামা আগে আমাকে মানে 😊বটকে অ্যাডমিন দিয়ে আবার চেষ্টা কর 🫶।\n` +
                `───────────────\n` +
                `» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, 
                event.threadID, event.messageID
            );
        }

        const data = (await Threads.getData(event.threadID)).data || {};
        
        // অ্যান্টি-জয়েন স্ট্যাটাস পরিবর্তন
        if (typeof data.newMember == "undefined" || data.newMember == false) {
            data.newMember = true;
        } else {
            data.newMember = false;
        }

        await Threads.setData(event.threadID, { data });
        global.data.threadData.set(parseInt(event.threadID), data);
        
        const status = data.newMember ? "চালু (ON)" : "বন্ধ (OFF)";

        return api.sendMessage(
            `───────────────\n` +
            `» 🛡️ 𝗔𝗡𝗧𝗜-𝗝𝗢𝗜𝗡 𝗦𝗧𝗔𝗧𝗨𝗦\n` +
            `» অ্যান্টি-জয়েন সফলভাবে ${status} করা হয়েছে।\n` +
            `» 🤖 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆: ─꯭─⃝‌‌𝗦𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁\n` +
            `───────────────\n` +
            `» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, 
            event.threadID, event.messageID
        );

    } catch (error) {
        // যেকোনো অপ্রত্যাশিত ভুলের জন্য সুরক্ষিত ক্যাচ ব্লক
        return api.sendMessage(
            `───────────────\n` +
            `» ❌ 𝗘𝗥𝗥𝗢𝗥 𝗔𝗟𝗘𝗥𝗧\n` +
            `» একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।❎ অথবা কল 🧚সিয়াম ভাই 🫶+8801789138157✅\n` +
            `───────────────\n` +
            `» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, 
            event.threadID, event.messageID
        );
    }
};
