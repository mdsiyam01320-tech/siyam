const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    version: "1.0.1",
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    cooldowns: 0,
    hasPermssion: 0,
    usePrefix: true
  },

  run: async ({ api, args, event }) => {
    const { threadID, messageID } = event;
    const input = args.join(" ").trim();

    let AI_API;

    try {
      const res = await axios.get(
        "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/main/SAHU-API.json"
      );
      AI_API = res.data?.ai;
      if (!AI_API) throw new Error();
    } catch (e) {
      // Backup Working API Endpoint to ensure bot never fails
      AI_API = "https://api.samirxpnb.ru.com/sandai";
    }

    const askAI = async (text) => {
      try {
        const res = await axios.get(`${AI_API}?q=${encodeURIComponent(text)}`);
        const replyText = (
          res.data?.answer ||
          res.data?.response ||
          res.data?.reply ||
          res.data?.result ||
          "⚠️ 𝗡𝗼 𝗿𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗳𝗿𝗼𝗺 𝗔I."
        );
        return `───────────────\n» 🤖 𝗔𝗜 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘:\n\n${replyText}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;
      } catch (e) {
        return "───────────────\n» ❌ 𝗔𝗜 𝗘𝗿𝗿𝗼𝗿! 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗹𝗮𝘁𝗲𝗿.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";
      }
    };

    const react = (emoji) =>
      api.setMessageReaction(emoji, messageID, () => {}, true);

    if (event.type === "message_reply" && event.messageReply.body && !input) {
      react("⏳");
      const reply = await askAI(event.messageReply.body);
      await api.sendMessage(reply, threadID, messageID);
      return react("✅");
    }

    if (!input) {
      const usageMsg = "───────────────\n» 🤖 𝗔𝗜 𝗠𝗼𝗱𝗲 𝗨𝘀𝗮𝗴𝗲:\n» • /𝗮𝗶 [𝘆𝗼𝘂𝗿 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻]\n» • 𝗥𝗲𝗽𝗹𝘆 𝗮𝗻𝘆 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝘄𝗶𝘁𝗵 / Signs\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";
      return api.sendMessage(usageMsg, threadID, messageID);
    }

    react("⏳");
    const reply = await askAI(input);
    await api.sendMessage(reply, threadID, messageID);
    return react("✅");
  }
};
