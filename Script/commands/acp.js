const moment = require("moment-timezone");

module.exports.config = {
  name: "acp",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Accept or delete friend requests",
  commandCategory: "system",
  usages: "acp",
  cooldowns: 0
};

module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author !== event.senderID) return;

  const args = event.body.trim().toLowerCase().split(" ");
  const action = args[0];
  
  if (!["add", "del"].includes(action)) {
    return api.sendMessage(
`───────────────
» ⚠️ 𝗪𝗿𝗼𝗻𝗴 𝗙𝗼𝗿𝗺𝗮𝘁!

   » সঠিক নিয়ম: 𝗮𝗱𝗱 <সিরিয়াল/𝗮𝗹𝗹> অথবা 𝗱𝗲𝗹 <সিরিয়াল/𝗮𝗹𝗹> লিখুন।
───────────────

» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
  }

  const form = {
    av: api.getCurrentUserID(),
    fb_api_caller_class: "RelayModern",
    variables: {
      input: {
        source: "friends_tab",
        actor_id: api.getCurrentUserID(),
        client_mutation_id: Math.round(Math.random() * 19).toString()
      },
      scale: 3,
      refresh_num: 0
    }
  };

  if (action === "add") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";
  } else {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
    form.doc_id = "4108254489275063";
  }

  let targetIDs = args.slice(1);
  if (targetIDs[0] === "all") {
    targetIDs = listRequest.map((_, i) => (i + 1).toString());
  }

  const success = [];
  const failed = [];
  const promises = [];

  for (const stt of targetIDs) {
    const user = listRequest[parseInt(stt) - 1];
    if (!user) {
      failed.push(`𝗨𝗻𝗸𝗻𝗼𝘄𝗻 𝗦𝗧𝗧: ${stt}`);
      continue;
    }

    form.variables.input.friend_requester_id = user.node.id;
    const variablesBackup = JSON.stringify(form.variables);
    form.variables = variablesBackup;

    promises.push(
      api.httpPost("https://www.facebook.com/api/graphql/", form)
        .then(res => ({ user, res }))
        .catch(() => ({ user, error: true }))
    );

    form.variables = JSON.parse(variablesBackup);
  }

  const results = await Promise.all(promises);
  for (const result of results) {
    if (result.error) failed.push(result.user.node.name);
    else {
      try {
        const data = JSON.parse(result.res);
        if (data.errors) failed.push(result.user.node.name);
        else success.push(result.user.node.name);
      } catch {
        failed.push(result.user.node.name);
      }
    }
  }

  const statusText = action === "add" ? "𝗔𝗰𝗰𝗲𝗽𝘁𝗲𝗱" : "𝗗𝗲𝗹𝗲𝘁𝗲𝗱";
  
  return api.sendMessage(
`───────────────

» ✅ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 ${statusText} ${success.length} 𝗥𝗲𝗾𝘂𝗲𝘀𝘁𝘀.

${success.map(name => `   » ${name}`).join("\n")}
${failed.length ? `\n» ❌ 𝗙𝗮𝗶𝗹𝗲𝗱: ${failed.length}\n${failed.map(name => `   » ${name}`).join("\n")}` : ""}

───────────────

» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
    event.threadID,
    event.messageID
  );
};

module.exports.run = async ({ event, api }) => {
  const form = {
    av: api.getCurrentUserID(),
    fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
    fb_api_caller_class: "RelayModern",
    doc_id: "4499164963466303",
    variables: JSON.stringify({ input: { scale: 3 } })
  };

  try {
    const res = await api.httpPost("https://www.facebook.com/api/graphql/", form);
    const data = JSON.parse(res);
    const list = data.data.viewer.friending_possibilities.edges;

    if (list.length === 0) {
      return api.sendMessage(
`───────────────
» 👥 কোনো ফ্রেন্ড রিকোয়েস্ট পাওয়া যায়নি!
───────────────

» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
    }

    let msg = `───────────────\n\n» 👥 𝗙𝗥𝗜𝗘𝗡𝗗 𝗥𝗘𝗤𝗨𝗘𝗦𝗧 𝗟𝗜𝗦𝗧\n`;
    let i = 0;

    for (const u of list) {
      i++;
      const timeStr = moment(u.time * 1000).tz("Asia/Dhaka").format("DD/MM/YYYY HH:mm:ss");
      msg += `\n   » ${i}. 𝗡𝗮𝗺𝗲 : ${u.node.name}\n   » 𝗨𝗜𝗗 : ${u.node.id}\n   » 𝗧𝗶𝗺𝗲 : ${timeStr}\n`;
    }

    msg += `\n───────────────\n\n» 💬 এই মেসেজে রিপ্লাই দিন:\n\n » 𝗮𝗱𝗱 <সিরিয়াল/𝗮𝗹𝗹> => রিকোয়েস্ট অ্যাকসেপ্ট করতে।\n » 𝗱𝗲𝗹 <সিরিয়াল/𝗮𝗹𝗹> => রিকোয়েস্ট ডিলিট করতে।\n\n───────────────\n\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

    api.sendMessage(msg, event.threadID, (e, info) => {
      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        listRequest: list,
        author: event.senderID
      });
    }, event.messageID);

  } catch (err) {
    api.sendMessage(
`───────────────
» ❌ 𝗘𝗿𝗿𝗼𝗿 𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝗳𝗿𝗶𝗲𝗻𝗱 𝗿𝗲𝗾𝘂𝗲𝘀𝘁𝘀!
───────────────

» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
  }
};
