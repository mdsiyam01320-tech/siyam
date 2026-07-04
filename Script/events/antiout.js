module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "0.0.1",
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
  let data = (await Threads.getData(event.threadID)).data || {};
  if (data.antiout == false) return;
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "kick";
  
  if (type == "self-separation") {
    api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
      if (error) {
        
        const errorMsg = `───────────────\n\n» ⚠️ সরি বস, ${name} কে আবার এড করতে পারলাম না। সম্ভবত উনি বটকে 🫣 করেছে অথবা তার প্রাইভেসি সেটিংসের কারণে এড করা যায় না।\n\n───────────────\n» ─꯭─⃝‌‌🧚𝗦𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁─⃝‌‌🧚`;
        api.sendMessage(errorMsg, event.threadID);
      } else {
        
        const successMsg = `───────────────\n\n» 🤫 শোন ${name}, এই গ্রুপ হইলো গ্যাং! এখান থেকে যাইতে হলে এডমিনের পারমিশন লাগে! তুই পারমিশন ছাড়া লিভ নিছোস – তোকে আবার মাফিয়া স্টাইলে এড দিলাম।\n\n───────────────\n» ─꯭─⃝‌‌🧚𝗦𝗶𝘆𝗮𝗺 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁─⃝‌‌🧚`;
        api.sendMessage(successMsg, event.threadID);
      }
    });
  }
};
