const axios = require("axios");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

module.exports.config = {
  name: "install",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Create/Delete/Load modules",
  commandCategory: "System",
  usages: "[file.js code/link] / [del file.js]",
  cooldowns: 0
};

const loadModule = (nameModule) => {
  try {
    const p = path.join(__dirname, nameModule + ".js");
    delete require.cache[require.resolve(p)];
    const c = require(p);
    if (!c.config || !c.run) throw new Error();
    global.client.commands.delete(c.config.name);
    global.client.eventRegistered = global.client.eventRegistered.filter(e => e != c.config.name);
    global.client.commands.set(c.config.name, c);
    return true;
  } catch {
    return false;
  }
};

const unloadModule = (nameModule) => {
  global.client.commands.delete(nameModule);
  global.client.eventRegistered = global.client.eventRegistered.filter(e => e !== nameModule);
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;

  if (!args[0]) {
    return api.sendMessage(
      "───────────────\n\n» ⚠️ 𝗨𝘀𝗮𝗴𝗲: 𝗶𝗻𝘀𝘁𝗮𝗹𝗹 𝗳𝗶𝗹𝗲.𝗷𝘀 𝗰𝗼𝗱𝗲/𝗹𝗶𝗻𝗸\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
      threadID,
      messageID
    );
  }

  if (args[0] === "del") {
    const file = args[1];
    if (!file || !file.endsWith(".js")) {
      return api.sendMessage(
        "───────────────\n\n» ❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗳𝗶𝗹𝗲 𝗳𝗼𝗿𝗺𝗮𝘁.\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
        threadID,
        messageID
      );
    }
    const fp = path.join(__dirname, file);
    if (!fs.existsSync(fp)) {
      return api.sendMessage(
        "───────────────\n\n» ⚠️ 𝗙𝗶𝗹𝗲 𝗻𝗼𝘁 𝗳𝗼𝘂𝗻𝗱.\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
        threadID,
        messageID
      );
    }
    unloadModule(file.replace(".js", ""));
    fs.unlinkSync(fp);
    return api.sendMessage(
      `───────────────\n\n» 🗑️ 𝗗𝗲𝗹𝗲𝘁𝗲𝗱 + 𝗨𝗻𝗹𝗼𝗮𝗱𝗲𝗱: ${file}\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
      threadID,
      messageID
    );
  }

  const fileName = args[0];
  const content = args.slice(1).join(" ");
  if (!fileName.endsWith(".js")) {
    return api.sendMessage(
      "───────────────\n\n» ⚠️ 𝗢𝗻𝗹𝘆 .𝗷𝘀 𝗳𝗶𝗹𝗲𝘀 𝗮𝗿𝗲 𝗮𝗹𝗹𝗼𝘄𝗲𝗱.\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
      threadID,
      messageID
    );
  }

  const fp = path.join(__dirname, fileName);
  if (fs.existsSync(fp)) {
    return api.sendMessage(
      "───────────────\n\n» ⚠️ 𝗙𝗶𝗹𝗲 𝗮𝗹𝗿𝗲𝗮𝗱𝘆 𝗲𝗫𝗶𝘀𝘁𝘀.\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
      threadID,
      messageID
    );
  }

  let code;
  if (/^(http|https):\/\//.test(content)) {
    try {
      const r = await axios.get(content);
      code = r.data;
    } catch {
      return api.sendMessage(
        "───────────────\n\n» ❌ 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗰𝗼𝗱𝗲!\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
        threadID,
        messageID
      );
    }
  } else {
    code = content;
  }

  try {
    new vm.Script(code);
  } catch (err) {
    return api.sendMessage(
      `───────────────\n\n» ❌ 𝗦𝘆𝗻𝘁𝗮𝗫 𝗘𝗿𝗿𝗼𝗿: ${err.message}\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
      threadID,
      messageID
    );
  }

  fs.writeFileSync(fp, code, "utf8");

  const name = fileName.replace(".js", "");
  const ok = loadModule(name);
  if (!ok) {
    return api.sendMessage(
      "───────────────\n\n» ⚠️ 𝗙𝗶𝗹𝗲 𝗰𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘂𝘁 𝗳𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗹𝗼𝗮𝗱!\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
      threadID,
      messageID
    );
  }

  return api.sendMessage(
    `───────────────\n\n» ✅ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 + 𝗟𝗼𝗮𝗱𝗲𝗱: ${fileName}\n\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
    threadID,
    messageID
  );
};
