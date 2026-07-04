module.exports.config = {
  name: "newbox",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Create a new chat group with mentioned users",
  commandCategory: "Group",
  usages: "newbox @tag | Group Name",
  cooldowns: 0,
  usePrefix: true
};

module.exports.run = async function ({ api, event }) {
  const sender = event.senderID;
  const mentions = Object.keys(event.mentions);
  const body = event.body;

  if (!body.includes("|")) {
    return api.sendMessage(
`───────────────
» 👑 𝗨𝘀𝗮𝗴𝗲: 𝗻𝗲𝘄𝗯𝗼𝘅 @𝘁𝗮𝗴১ @𝘁𝗮𝗴২ | গ্রুপের নাম (মেম্বারদের ট্যাগ দিয়ে একটি পাইপ | চিহ্ন বসিয়ে গ্রুপের নাম লিখুন)
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
  }

  const groupName = body.split("|")[1].trim();

  let members = [sender];

  for (let id of mentions) {
    if (!members.includes(id)) members.push(id);
  }

  api.createNewGroup(members, groupName, () => {
    api.sendMessage(
`───────────────
» 👑 𝗚𝗿𝗼𝘂𝗽 𝗰𝗿𝗲𝗮𝘁𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆: নতুন গ্রুপটি সফলভাবে তৈরি করা হয়েছে: ${groupName}
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID);
  });
};
