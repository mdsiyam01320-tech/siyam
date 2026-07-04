module.exports.config = {
  name: "listfriend",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "View friends information/Delete friends by replying",
  commandCategory: "System",
  usages: "",
  cooldowns: 5
};

module.exports.handleReply = async function ({ api, args, Users, handleReply, event, Threads }) {
  const { threadID, messageID, senderID } = event;
  
  const config = global.config || {};
  const botAdmins = config.ADMINBOT || [];
  
  if (!botAdmins.includes(senderID)) {
    return api.sendMessage(
`───────────────
» 👑 𝗢𝗻𝗹𝘆 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻𝘀 𝗰𝗮𝗻 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗿𝗲𝗽𝗹𝘆.
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
  }

  if (parseInt(senderID) !== parseInt(handleReply.author)) return;

  switch (handleReply.type) {
    case "reply":
      {
        var msg = "", name, urlUser, uidUser;
        var arrnum = event.body.split(" ");
        var nums = arrnum.map(n => parseInt(n));
        for (let num of nums) {
          name = handleReply.nameUser[num - 1];
          urlUser = handleReply.urlUser[num - 1];
          uidUser = handleReply.uidUser[num - 1];

          if (name && uidUser) {
            api.unfriend(uidUser);
            msg += `- ${name}\n👑 𝗣𝗿𝗼𝗳𝗶𝗹𝗲𝗨𝗿𝗹: ${urlUser}\n`;
          }
        }

        api.sendMessage(
`───────────────
» 👑 𝗗𝗲𝗹𝗲𝘁𝗲 𝗙𝗿𝗶𝗲𝗻𝗱𝘀 👑

${msg}───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, () => api.unsendMessage(handleReply.messageID));
      }
      break;
  }
};

module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID, senderID } = event;
  
  const config = global.config || {};
  const botAdmins = config.ADMINBOT || [];
  
  if (!botAdmins.includes(senderID)) {
    return api.sendMessage(
`───────────────
» 👑 𝗢𝗻𝗹𝘆 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻𝘀 𝗰𝗮𝗻 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱.
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
  }

  try {
    var listFriend = [];
    var dataFriend = await api.getFriendsList();
    var countFr = dataFriend.length;

    for (var friends of dataFriend) {
      listFriend.push({
        name: friends.fullName || "𝗨𝗻𝗸𝗻𝗼𝘄𝗻",
        uid: friends.userID,
        gender: friends.gender,
        vanity: friends.vanity,
        profileUrl: friends.profileUrl
      });
    }
    
    var nameUser = [], urlUser = [], uidUser = [];
    var page = 1;
    page = parseInt(args[0]) || 1;
    if (page < 1) page = 1;
    var limit = 10;
    var numPage = Math.ceil(listFriend.length / limit);
    
    var msg = `───────────────\n» 👑 𝗙𝗥𝗜𝗘𝗡𝗗𝗦 𝗟𝗜𝗦𝗧 (${countFr}) 👑\n\n`;

    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
      if (i >= listFriend.length) break;
      let infoFriend = listFriend[i];
      msg += `${i + 1}. ${infoFriend.name}\n👑 𝗜𝗗: ${infoFriend.uid}\n👑 𝗚𝗲𝗻𝗱𝗲𝗿: ${infoFriend.gender}\n👑 𝗩𝗮𝗻𝗶𝘁𝘆: ${infoFriend.vanity}\n👑 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗨𝗿𝗹: ${infoFriend.profileUrl}\n\n`;
      nameUser.push(infoFriend.name);
      urlUser.push(infoFriend.profileUrl);
      uidUser.push(infoFriend.uid);
    }
    
    msg += `--> 𝗣𝗮𝗴𝗲 ${page}/${numPage} <--\n\n👑 𝗥𝗲𝗽𝗹𝘆 𝗻𝘂𝗺𝗯𝗲𝗿 (𝟭->𝟭𝟬) 𝘁𝗼 𝘂𝗻𝗳𝗿𝗶𝗲𝗻𝗱!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

    return api.sendMessage(msg, threadID, (e, data) => {
      if (!e) {
        global.client.handleReply.push({
          name: this.config.name,
          author: senderID,
          messageID: data.messageID,
          nameUser,
          urlUser,
          uidUser,
          type: 'reply'
        });
      }
    }, messageID);
  }
  catch (e) {
    return console.log(e);
  }
};
