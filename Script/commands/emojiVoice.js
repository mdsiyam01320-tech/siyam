module.exports.config = {
    name: "voice",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Emoji, Bot, Siyam or Tag voice triggers",
    commandCategory: "noprefix",
    usages: "[Emoji / Bot / Siyam / Tag]",
    cooldowns: 0
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const emojiAudioMap = {
    "🥱": "https://files.catbox.moe/9pou40.mp3",
    "😁": "https://files.catbox.moe/60cwcg.mp3",
    "😌": "https://files.catbox.moe/epqwbx.mp3",
    "🥺": "https://files.catbox.moe/wc17iq.mp3",
    "🤭": "https://files.catbox.moe/cu0mpy.mp3",
    "😅": "https://files.catbox.moe/jl3pzb.mp3",
    "😏": "https://files.catbox.moe/z9e52r.mp3",
    "😞": "https://files.catbox.moe/tdimtx.mp3",
    "🤫": "https://files.catbox.moe/0uii99.mp3",
    "🍼": "https://files.catbox.moe/p6ht91.mp3",
    "🤔": "https://files.catbox.moe/hy6m6w.mp3",
    "🥰": "https://files.catbox.moe/dv9why.mp3",
    "🤦": "https://files.catbox.moe/ivlvoq.mp3",
    "😘": "https://files.catbox.moe/sbws0w.mp3",
    "😑": "https://files.catbox.moe/p78xfw.mp3",
    "😢": "https://files.catbox.moe/shxwj1.mp3",
    "🙊": "https://files.catbox.moe/3bejxv.mp3",
    "🤨": "https://files.catbox.moe/4aci0r.mp3",
    "😡": "https://files.catbox.moe/shxwj1.mp3",
    "🙈": "https://files.catbox.moe/3qc90y.mp3",
    "😍": "https://files.catbox.moe/qjfk1b.mp3",
    "😭": "https://files.catbox.moe/itm4g0.mp3",
    "😱": "https://files.catbox.moe/mu0kka.mp3",
    "😻": "https://files.catbox.moe/y8ul2j.mp3",
    "😿": "https://files.catbox.moe/tqxemm.mp3",
    "💔": "https://files.catbox.moe/6yanv3.mp3",
    "🤣": "https://files.catbox.moe/2sweut.mp3",
    "🥹": "https://files.catbox.moe/jf85xe.mp3",
    "😩": "https://files.catbox.moe/b4m5aj.mp3",
    "🫣": "https://files.catbox.moe/ttb6hi.mp3",
    "🐸": "https://files.catbox.moe/utl83s.mp3"
};

module.exports.handleEvent = async ({ api, event }) => {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerBody = body.trim().toLowerCase();
    let audioUrl = null;

    if (
        lowerBody === "বট" || 
        lowerBody === "bot" || 
        lowerBody === "baby" || 
        lowerBody === "বেবি"
    ) {
        audioUrl = "https://files.catbox.moe/demo1.mp3";
    } 
    else if (
        lowerBody === "সিয়াম" || 
        lowerBody === "সিয়াম ভাই" || 
        lowerBody === "siyam" || 
        lowerBody === "siyam bhai"
    ) {
        audioUrl = "https://files.catbox.moe/demo2.mp3";
    } 
    else if (
        body.includes("@RJ siyam") || 
        body.includes("@পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ")
    ) {
        audioUrl = "https://files.catbox.moe/demo3.mp3";
    } 
    else if (body.length <= 2) {
        audioUrl = emojiAudioMap[body.trim()];
    }

    if (!audioUrl) return;

    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const fileExt = audioUrl.split('.').pop().split(/[?#]/)[0] || "mp3";
    const filePath = path.join(cacheDir, `voice_${Date.now()}.${fileExt}`);

    try {
        const response = await axios({
            method: 'GET',
            url: audioUrl,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            api.sendMessage({
                attachment: fs.createReadStream(filePath)
            }, threadID, () => {
                fs.unlink(filePath, (err) => {
                    if (err) console.error(err);
                });
            }, messageID);
        });

        writer.on('error', (err) => {
            console.error(err);
            api.sendMessage("ইমুজি দিয়ে লাভ নাই\nযাও মুড়ি খাও জান😘", threadID, messageID);
        });

    } catch (error) {
        console.error(error);
        api.sendMessage("ইমুজি দিয়ে লাভ নাই\nযাও মুড়ি খাও জান😘", threadID, messageID);
    }
};

module.exports.run = () => {};
