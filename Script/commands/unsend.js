const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "siyam_h_unsend", // ইন্টারনাল কমান্ড নাম (সাধারণ ইংরেজি অক্ষরে রাখাই শ্রেয়)
  version: "2.1.0",
  hasPermssion: 0,
  credits: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", // আপনার দেওয়া নাম এখানে যুক্ত করা হলো
  description: "Unsend bot's sent message with custom triggers",
  commandCategory: "system",
  usages: "বট ডিলেট করো / ডিলিট করো বট / আনসেন্ট / s / siyam",
  cooldowns: 0
};

const lang = {
  returnCant: "কি unsent করমু? reply করে বলো সুনা 🫰",
  missingReply: "কি unsent করমু? reply করে বলো সুনা 🫰"
};

// মূল কমান্ড রান (যখন কেউ প্রিফিক্স দিয়ে নরমাল কমান্ড হিসেবে ব্যবহার করবে)
module.exports.run = async function ({ api, event }) {
  if (event.type !== "message_reply")
    return api.sendMessage(lang.missingReply, event.threadID, event.messageID);

  if (event.messageReply.senderID !== api.getCurrentUserID())
    return api.sendMessage(lang.returnCant, event.threadID, event.messageID);

  return api.unsendMessage(event.messageReply.messageID);
};

// ইভেন্ট হ্যান্ডলার (প্রিফিক্স ছাড়া বা টেক্সট ম্যাচিংয়ের জন্য)
module.exports.handleEvent = async function ({ api, event }) {
  try {
    if (!event.body) return;
    const body = event.body.trim().toLowerCase();

    // আপনার দেওয়া নতুন ট্রিগারগুলোর লিস্ট
    const triggers = [
      "বট ডিলেট করো",
      "ডিলিট করো বট",
      "আনসেন্ট",
      "ডিলিট কর বট",
      "ডিলেট করো বট",
      "s",
      "siyam"
    ];

    // প্রিফিক্স ফাইল চেক করার লজিক (প্রিফিক্স ছাড়া "" সবসময় কাজ করবে)
    let prefixes = [""];
    try {
      const prefixFile = path.join(__dirname, "prefix.js");
      if (fs.existsSync(prefixFile)) {
        const getPrefix = require(prefixFile);
        if (Array.isArray(getPrefix)) prefixes = ["", ...getPrefix];
        else if (typeof getPrefix === "string") prefixes = ["", getPrefix];
      }
    } catch (e) {
      // কোনো এরর হলে কোড ক্র্যাশ করবে না
    }

    // টেক্সট ট্রিগারের সাথে মিলছে কিনা তা চেক করা
    const isTriggered = prefixes.some(p =>
      triggers.some(t => body === (p + t).toLowerCase())
    );

    if (isTriggered) {
      if (event.type !== "message_reply")
        return api.sendMessage(lang.missingReply, event.threadID, event.messageID);

      if (event.messageReply.senderID !== api.getCurrentUserID())
        return api.sendMessage(lang.returnCant, event.threadID, event.messageID);

      return api.unsendMessage(event.messageReply.messageID);
    }
  } catch (err) {
    console.error("Error in unsend event:", err);
  }
};
