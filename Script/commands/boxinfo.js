const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
	name: "groupinfo",
	version: "1.0.0", 
	hasPermssion: 1,
	credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
	description: "View your box information",
	commandCategory: "Box", 
	usages: "groupinfo", 
	cooldowns: 0,
	dependencies: {
		"fs-extra": "",
		"request": ""
	} 
};

module.exports.run = async function({ api, event, args }) {
	const { threadID, messageID } = event;
	
	try {
		let threadInfo = await api.getThreadInfo(threadID);
		let threadMem = threadInfo.participantIDs.length;
		
		var gendernam = [];
		var gendernu = [];
		var nope = [];
		
		for (let z in threadInfo.userInfo) {
			var gioitinhone = threadInfo.userInfo[z].gender;
			var nName = threadInfo.userInfo[z].name;
			if (gioitinhone == "MALE") { 
				gendernam.push(z + gioitinhone); 
			} else if (gioitinhone == "FEMALE") { 
				gendernu.push(gioitinhone); 
			} else { 
				nope.push(nName); 
			}
		}

		var nam = gendernam.length;
		var nu = gendernu.length;
		let qtv = threadInfo.adminIDs.length;
		let sl = threadInfo.messageCount;
		let icon = threadInfo.emoji || "Not set";
		let threadName = threadInfo.threadName || "Unnamed Group";
		let id = threadID;
		let sex = threadInfo.approvalMode;
		
		var pd = sex == false ? '𝗧𝘂𝗿𝗻𝗲𝗱 𝗼𝗳𝗳' : sex == true ? '𝗧𝘂𝗿𝗻𝗲𝗱 𝗼𝗻' : '𝗞𝗵';

		var callback = () => api.sendMessage(
			{
				body: `───────────────

» ℹ️ 𝗚𝗥𝗢𝗨𝗣 𝗜𝗡𝗙𝗢 block𝗠𝗔𝗧𝗜𝗢𝗡:

» 𝗚𝗖 𝗡𝗮𝗺𝗲: ${threadName}
» 𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: ${id}
» 𝗔𝗽𝗽𝗿𝗼𝘃𝗲: ${pd}
» 𝗘𝗺𝗼𝗷𝗶: ${icon}
» 𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝗺𝗯𝗲𝗿𝘀: ${threadMem}
» 𝗠𝗮𝗹𝗲𝘀: ${nam}
» 𝗙𝗲𝗺𝗮𝗹𝗲𝘀: ${nu}
» 𝗔𝗱𝗺Block𝗻Block𝘀𝘁𝗿𝗮𝘁𝗼𝗿𝘀: ${qtv}
» 𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝘀𝘀𝗮𝗴𝗲𝘀: ${sl}

───────────────

» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
				attachment: fs.createReadStream(__dirname + '/cache/groupinfo_3.png')
			},
			threadID,
			() => {
				if (fs.existsSync(__dirname + '/cache/groupinfo_3.png')) {
					fs.unlinkSync(__dirname + '/cache/groupinfo_3.png');
				}
			},
			messageID
		);

		if (threadInfo.imageSrc) {
			return request(encodeURI(`${threadInfo.imageSrc}`))
				.pipe(fs.createWriteStream(__dirname + '/cache/groupinfo_3.png'))
				.on('close', () => callback());
		} else {
			return api.sendMessage(
`───────────────

» ℹ️ 𝗚𝗥𝗢𝗨𝗣 𝗜𝗡𝗙𝗢 block𝗠𝗔𝗧𝗜𝗢𝗡:

» 𝗚𝗖 𝗡𝗮𝗺𝗲: ${threadName}
» 𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: ${id}
» 𝗔𝗽𝗽𝗿𝗼𝘃𝗲: ${pd}
» 𝗘𝗺𝗼𝗷𝗶: ${icon}
» 𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝗺𝗯𝗲𝗿𝘀: ${threadMem}
» 𝗠𝗮𝗹𝗲𝘀: ${nam}
» 𝗙𝗲𝗺𝗮𝗹𝗲𝘀: ${nu}
» 𝗔𝗱𝗺Block𝗻Block𝘀𝘁𝗿𝗮𝘁𝗼𝗿𝘀: ${qtv}
» 𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝘀𝘀𝗮𝗴𝗲𝘀: ${sl}

───────────────

» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
		}
	} catch (error) {
		return api.sendMessage(`───────────────\n» ⚠️ 𝗘𝗿𝗿𝗼𝗿: ${error.message}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
	}
};
