const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "file",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "List, delete or view command files code",
  commandCategory: "Admin",
  usages: "file | file <name> | file all",
  cooldowns: 0,
  usePrefix: true
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  if (event.senderID !== handleReply.author) return;

  const nums = event.body
    .split(" ")
    .map(n => parseInt(n))
    .filter(n => !isNaN(n));

  if (!nums.length) return;

  let msg = "";

  for (const num of nums) {
    const target = handleReply.files[num - 1];
    if (!target) continue;

    const targetPath = path.join(__dirname, target);
    if (!fs.existsSync(targetPath)) continue;

    const stat = fs.statSync(targetPath);

    if (stat.isDirectory()) {
      fs.rmSync(targetPath, { recursive: true, force: true });
      msg += `[Folder🗂️] ${target}\n`;
    } else {
      fs.unlinkSync(targetPath);
      msg += `[File📄] ${target}\n`;
    }
  }

  if (!msg) {
    return api.sendMessage(
      `───────────────\n\n» ❌ 𝗡𝗼𝘁𝗵𝗶𝗻𝗴 𝗱𝗲𝗹𝗲𝘁𝗲𝗱.\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
      event.threadID,
      event.messageID
    );
  }

  return api.sendMessage(
    `───────────────\n\n» ✅ 𝗗𝗲𝗹𝗲𝘁𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆:\n\n${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
    event.threadID,
    event.messageID
  );
};

module.exports.run = async function ({ api, event, args }) {
  let files = fs.readdirSync(__dirname);
  
  if (args[0] && args[0] !== "all") {
    let fileName = args.join(" ").trim();
    
    if (!fileName.endsWith(".js")) {
      fileName += ".js";
    }

    const targetPath = path.join(__dirname, fileName);

    if (fs.existsSync(targetPath)) {
      try {
        const fileContent = fs.readFileSync(targetPath, "utf-8");
        return api.sendMessage(
          `───────────────\n\n» 📄 𝗖𝗼𝗱𝗲 𝗼𝗳 ${fileName}:\n\n${fileContent}\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
          event.threadID,
          event.messageID
        );
      } catch (err) {
        return api.sendMessage(
          `───────────────\n\n» ❌ 𝗔𝗣𝗜 𝗘𝗿𝗿𝗼𝗿 𝗖𝗮𝗹𝗹 𝗦𝗶𝘆𝗮𝗺. ${err.message}\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
          event.threadID,
          event.messageID
        );
      }
    } else {
      return api.sendMessage(
        `───────────────\n\n» ❌ 𝗦𝗶𝘆𝗮𝗺 𝗕𝗼𝘀𝘀 𝗡𝗲𝗶\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
        event.threadID,
        event.messageID
      );
    }
  }

  let msg = "";
  let i = 1;

  if (!files.length) {
    return api.sendMessage(
      `───────────────\n\n» ❌ 𝗡𝗼 𝗳𝗶𝗹𝗲𝘀 𝗳𝗼𝘂𝗻𝗱.\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
      event.threadID,
      event.messageID
    );
  }

  for (const file of files) {
    const stat = fs.statSync(path.join(__dirname, file));
    msg += `${i++}. ${stat.isDirectory() ? "[Folder🗂️]" : "[File📄]"} ${file}\n`;
  }

  return api.sendMessage(
    `───────────────\n\n» ⚠️ 𝗥𝗲𝗽𝗹𝘆 𝘄𝗶𝘁𝗵 𝗻𝘂𝗺𝗯𝗲𝗿(𝘀) 𝘁𝗼 𝗱𝗲𝗹𝗲𝘁𝗲 (𝘀𝗽𝗮𝗰𝗲 𝘀𝗲𝗽𝗮𝗿𝗮𝘁𝗲𝗱)\n\n${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
    event.threadID,
    (err, info) => {
      if (err) return;
      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        files
      });
    }
  );
};
