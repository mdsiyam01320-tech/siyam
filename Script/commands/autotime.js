module.exports.config = {
    name: "autotime",
    version: "2.0.0",
    hasPermssion: 0, // ০ মানে সাধারণ ইউজাররাও অন/অফ করতে পারবে
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "গ্রুপে প্রতি ঘন্টায় সময় অনুযায়ী স্বয়ংক্রিয় মেসেজ পাঠানো এবং অন/অফ কন্ট্রোল",
    commandCategory: "Box Chat",
    usages: "[on / off]",
    cooldowns: 3
};

// সময় অনুযায়ী মেসেজের ডাটাবেজ
const timeMessages = [
    { timer: "1:00:00 AM", message: "─── ⏰ রাত ১:০০ ⏰ ───\n\nরাত ১টা বাজে! সবাই ঘুমায় গেছে হয়তো, চলে গেলাম ভাই 🥺 ঘুম আসে না😭 আমার বউ নাই!" },
    { timer: "2:00:00 AM", message: "─── ⏰ রাত ২:০০ ⏰ ───\n\nরাত ২টা বাজে! কিছু মানুষ এখনো প্রেম করতাসো নাকি কাজ করতাছো??, পড়ে নিও 🥀" },
    { timer: "3:00:00 AM", message: "─── ⏰ রাত ৩:০০ ⏰ ───\n\nরাত ৩টা বাজে! কিছু কিছু মানুষ এখনো জেগে আসে🤭🤭 একটু পর ফজর নামাজ পড়ে নিও সবাই" },
    { timer: "4:00:00 AM", message: "─── ⏰ ভোর ৪:০০ ⏰ ───\n\nভোর ৪টা বাজে! এশারের আযান দিতেছে , নামাজ পড়ে ঘুমাও 😒" },
    { timer: "5:00:00 AM", message: "─── ⏰ ভোর ৫:০০ ⏰ ───\n\nভোর ৫টা বাজে! ঘুম থেকে উঠো সবাই, নামাজ পড়ে নাও এবং পড়াশুনা করো সব" },
    { timer: "6:00:00 AM", message: "─── ⏰ সকাল ৬:০০ ⏰ ───\n\nসকাল ৬টা বাজে! সবাই দাঁত মুখ ধুয়ে কিছু খেয়ে নাও এবং পড়তে বসো সবাই" },
    { timer: "7:00:00 AM", message: "─── ⏰ সকাল ৭:০০ ⏰ ───\n\nসকাল ৭টা বাজে! ফ্রেশ হয়ে ব্রেকফাস্ট করে নাও🤗🤗 স্কুল-কলেজ এর সময় হইসে" },
    { timer: "8:00:00 AM", message: "─── ⏰ সকাল ৮:০০ ⏰ ───\n\nসকাল ৮টা বাজে! স্কুল শুটিং এর সময় হইসে নাকি কাজ এ যাবা যাও🤗 ❤️" },
    { timer: "9:00:00 AM", message: "─── ⏰ সকাল ৯:০০ ⏰ ───\n\nসকাল ৯টা বাজে! সবাই মন দিয়ে কাজ করো,,!😒😊" },
    { timer: "10:00:00 AM", message: "─── ⏰ সকাল ১০:০০ ⏰ ───\n\nসকাল ১০টা বাজে! সবাই আড্ডা ও দিতেছো নাকি কাজ করতেছো?🤨 নাকি পড়তে বসলা??" },
    { timer: "11:00:00 AM", message: "─── ⏰ সকাল ১১:০০ ⏰ ───\n\nসকাল ১১টা বাজে! সবাই একটু রিলাক্স করো🤗❤️" },
    { timer: "12:00:00 PM", message: "─── ⏰ দুপুর ১২:০০ ⏰ ───\n\nদুপুর ১২টা বেজে গেছে, গোসল করে নাও এবং নামাজের প্রস্তুতি নাও" },
    { timer: "1:00:00 PM", message: "─── ⏰ দুপুর ১:০০ ⏰ ───\n\nদুপুর ১টা বাজে! সবাই দুপুরের খাবার খেয়ে নাও 😍." },
    { timer: "2:00:00 PM", message: "─── ⏰ দুপুর ২:০০ ⏰ ───\n\nদুপুর ২টা বাজে! সবাই একটু রেস্ট নাও অথবা কাজ থাকলে করো" },
    { timer: "3:00:00 PM", message: "─── ⏰ বিকাল ৩:০০ ⏰ ───\n\nবিকাল ৩টা বাজে! আসরের আযান দিবে, নামাজ পড়ে নিও সবাই" },
    { timer: "4:00:00 PM", message: "─── ⏰ বিকাল ৪:০০ ⏰ ───\n\nবিকাল ৪টা বাজে! একটু মাঠে যাও, খেলাধুলা করলে শরীর ভালো থাকে 😻" },
    { timer: "5:00:00 PM", message: "─── ⏰ বিকাল ৫:০০ ⏰ ───\n\nবিকাল ৫টা বাজে! সন্ধ্যা হয়ে এলো, সবাই বাসায় ফিরে আসো😶" },
    { timer: "6:00:00 PM", message: "─── ⏰ সন্ধ্যা ৬:০০ ⏰ ───\n\nসন্ধ্যা ৬টা বাজে! হাতমুখ ধুয়ে পড়তে বসো সবাই" },
    { timer: "7:00:00 PM", message: "─── ⏰ সন্ধ্যা ৭:০০ ⏰ ───\n\nসন্ধ্যা ৭টা বাজে! পরিবারের সাথে সময় কাটাও" },
    { timer: "8:00:00 PM", message: "─── ⏰ রাত ৮:০০ ⏰ ───\n\nরাত ৮টা বাজে! এশারের আযান দিচ্ছে, নামাজ পড়ে নাও ok🤗" },
    { timer: "9:00:00 PM", message: "─── ⏰ রাত ৯:০০ ⏰ ───\n\nরাত ৯টা বাজে! সবাই রাতের খাবার খেয়ে নাও 🤗" },
    { timer: "10:00:00 PM", message: "─── ⏰ রাত ১০:০০ ⏰ ───\n\nরাত ১০টা বাজে! সবাই আড্ডা বন্ধ করে ঘুমানোর প্রস্তুতি নাও 😒" },
    { timer: "11:00:00 PM", message: "─── ⏰ রাত ১১:০০ ⏰ ───\n\nরাত ১১টা বাজে! যারা যারা প্রেম করতাসো একটু কম করো😛 আর যারা সিঙ্গেল ঘুমাও" },
    { timer: "12:00:00 AM", message: "─── ⏰ রাত ১২:০০ ⏰ ───\n\nরাত ১২টা বাজে! মানুষ ঘুমায়😑 আমি শুধু জেগে থাকি, কেউ মনে হয় মিস করছে😩" }
];

module.exports.onLoad = () => {
    const { existsSync, writeFileSync, mkdirSync } = require("fs-extra");
    const { join } = require("path");
    const dir = join(__dirname, "cache");
    const pathData = join(dir, "autotime.json");
    
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    if (!existsSync(pathData)) writeFileSync(pathData, "[]", "utf-8");
};

module.exports.handleEvent = async function({ api }) {
    // এই ফাংশনটি খালি রাখা হলো ফিশিং বা অন্য এরর এড়াতে
};

module.exports.run = async function({ event, api, args }) {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = require("fs-extra");
    const { join } = require("path");
    const pathData = join(__dirname, "cache", "autotime.json");

    let activatedThreads = JSON.parse(readFileSync(pathData, "utf-8"));

    if (args[0] === "on") {
        if (activatedThreads.includes(threadID)) {
            return api.sendMessage(
`───────────────
» ⚠️ 𝗔𝘂𝘁𝗼𝗧𝗶𝗺𝗲 অলরেডি এই গ্রুপে চালু আছে!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
        }
        activatedThreads.push(threadID);
        writeFileSync(pathData, JSON.stringify(activatedThreads, null, 4), "utf-8");
        return api.sendMessage(
`───────────────
» ✅ 𝗔u𝘁𝗼𝗧𝗶𝗺𝗲 সফলভাবে চালু করা হয়েছে!
» ⏰ এখন থেকে প্রতি ঘন্টায় এই গ্রুপে অটো টাইম মেসেজ পাঠানো হবে।
» ❌ বন্ধ করতে লিখুন: autotime off
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    } 
    
    else if (args[0] === "off") {
        if (!activatedThreads.includes(threadID)) {
            return api.sendMessage(
`───────────────
» ⚠️ 𝗔𝘂𝘁𝗼𝗧𝗶𝗺𝗲 এই গ্রুপে আগেই বন্ধ করা আছে!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
        }
        activatedThreads = activatedThreads.filter(id => id !== threadID);
        writeFileSync(pathData, JSON.stringify(activatedThreads, null, 4), "utf-8");
        return api.sendMessage(
`───────────────
» ❌ 𝗔𝘂𝘁𝗼𝗧𝗶𝗺𝗲 সফলভাবে বন্ধ করা হয়েছে!
» ⚙️ এই গ্রুপে আর কোনো অটো টাইম মেসেজ যাবে না।
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    } 
    
    else {
        return api.sendMessage(
`───────────────
» ⚙️ 𝗔𝘂𝘁𝗼𝗧𝗶𝗺𝗲 𝗖𝗼𝗻𝘁𝗿𝗼𝗹 𝗣𝗮𝗻𝗲𝗹
───────────────
» 🔓 চালু করতে লিখুন: autotime on
» 🔒 বন্ধ করতে লিখুন: autotime off
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }
};

// প্রতি ১ সেকেন্ড পর পর চেক করবে টাইম মিললে মেসেজ পাঠানোর জন্য
module.exports.onLoad = function({ api }) {
    const { readFileSync, existsSync, writeFileSync, mkdirSync } = require("fs-extra");
    const { join } = require("path");
    const pathData = join(__dirname, "cache", "autotime.json");

    if (!existsSync(join(__dirname, "cache"))) mkdirSync(join(__dirname, "cache"), { recursive: true });
    if (!existsSync(pathData)) writeFileSync(pathData, "[]", "utf-8");

    setInterval(() => {
        // বাংলাদেশ টাইম জোন অনুযায়ী বর্তমান সময় নেওয়া হচ্ছে
        const currentTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
        
        const matched = timeMessages.find(item => item.timer === currentTime);
        
        if (matched) {
            const activatedThreads = JSON.parse(readFileSync(pathData, "utf-8"));
            activatedThreads.forEach(threadID => {
                api.sendMessage(`${matched.message}\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID);
            });
        }
    }, 1000);
};
