const axios = require("axios");

module.exports.config = {
  name: "flux",
  version: "2.0",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Flux Image Generator",
  commandCategory: "𝗜𝗠𝗔𝗚𝗘 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗢𝗥",
  usage: "{pn} [prompt] --ratio 1024x1024\n{pn} [prompt]",
  countDown: 15,
};

module.exports.run = async ({ event, args, api }) => {
  const dipto = "https://www.noobs-api.rf.gd/dipto";
  const prompt = args.join(" ");

  if (!prompt) {
    return api.sendMessage(
      `───────────────\n\n» ❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗽𝗿𝗼𝗺𝗽𝘁! \n𝗧𝗿𝘆: flux 𝗮 𝗰𝘂𝘁𝗲 𝗰𝗮𝘁 --𝗿𝗮𝘁𝗶𝗼 𝟭𝟲:𝟵\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
      event.threadID,
      event.messageID
    );
  }

  try {
    const [prompt2, ratio = "1:1"] = prompt.includes("--ratio")
      ? prompt.split("--ratio").map(s => s.trim())
      : [prompt, "1:1"];

    const startTime = Date.now();

    const waitMessage = await api.sendMessage(
      `───────────────\n\n» ⏳ 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗻𝗴 𝗶𝗺𝗮𝗴𝗲, 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁... 😘\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, 
      event.threadID
    );
    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    const apiurl = `${dipto}/flux?prompt=${encodeURIComponent(prompt2)}&ratio=${encodeURIComponent(ratio)}`;
    const response = await axios.get(apiurl, { responseType: "stream" });

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.unsendMessage(waitMessage.messageID);

    return api.sendMessage({
      body: `───────────────\n\n» 🎨 𝗛𝗲𝗿𝗲'𝘀 𝘆𝗼𝘂𝗿 𝗶𝗺𝗮𝗴𝗲! (𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗶𝗻 ${timeTaken} 𝘀𝗲𝗰𝗼𝗻𝗱𝘀)\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
      attachment: response.data,
    }, event.threadID, event.messageID);

  } catch (e) {
    console.error(e);
    api.setMessageReaction("❌", event.messageID, () => {}, true);
    return api.sendMessage(
      `───────────────\n\n» ❌ 𝗔𝗣𝗜 𝗘𝗿𝗿𝗼𝗿 𝗖𝗮𝗹𝗹 𝗦𝗶𝘆𝗮𝗺. ${e.message}\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, 
      event.threadID, 
      event.messageID
    );
  }
};
