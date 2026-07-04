module.exports.config = {
	name: "group",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
	description: "Parent group settings.",
	commandCategory: "box",
	usages: "[name/emoji/admin/image/info]",
	cooldowns: 1,
	dependencies: {
		"request": "",
		"fs-extra": ""
	}
};

module.exports.run = async ({ api, event, args }) => {
	const fs = require("fs-extra");
	const request = require("request");
	const { threadID, messageID, senderID, messageReply, type, mentions } = event;

	if (args.length == 0) {
		return api.sendMessage(
`───────────────
» ⚙️ 𝗠𝗢𝗗𝗘 𝗨𝗦𝗔𝗚𝗘:
» /𝗴𝗿𝗼𝘂𝗽 𝗻𝗮𝗺𝗲 [𝗧𝗲𝘅𝘁]
» /𝗴𝗿𝗼𝘂𝗽 𝗲𝗺𝗼𝗷𝗶 [Ｅ𝗺𝗼𝗷𝗶]
» /𝗴𝗿𝗼𝘂𝗽 𝗶𝗺𝗮𝗴𝗲 [𝗥𝗲𝗽𝗹𝘆]
» /𝗴𝗿𝗼𝘂𝗽 𝗮𝗱𝗺𝗶𝗻 [@𝗧𝗮𝗴/𝗥𝗲𝗽𝗹𝘆]
» /𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗳𝗼
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
	}

	if (args[0] == "name") {
		var content = args.join(" ");
		var c = content.slice(5, 99) || (messageReply ? messageReply.body : "");
		if (!c) return api.sendMessage(`───────────────\n» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝗮 𝗻𝗮𝗺𝗲!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
		api.setTitle(`${c}`, threadID);
	}

	if (args[0] == "emoji") {
		const name = args[1] || (messageReply ? messageReply.body : "");
		if (!name) return api.sendMessage(`───────────────\n» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮𝗻 𝗲𝗺𝗼𝗷𝗶!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
		api.changeThreadEmoji(name, threadID);
	}

	if (args[0] == "me") {
		if (args[1] == "admin") {
			const threadInfo = await api.getThreadInfo(threadID);
			const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
			if (!find) {
				return api.sendMessage(`───────────────\n» ❌ 𝗕𝗢𝗧 𝗻𝗲𝗲𝗱𝘀 𝘁𝗼 𝗯𝗲 𝗮𝗻 𝗮𝗱𝗺𝗶𝗻!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
			} else if (!global.config.ADMINBOT.includes(senderID)) {
				return api.sendMessage(`───────────────\n» ❌ 𝗢𝗻𝗹𝘆 𝗠𝗮𝗶𝗻 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻 𝗰𝗮𝗻 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
			} else {
				api.changeAdminStatus(threadID, senderID, true);
			}
		}
	}

	if (args[0] == "admin") {
		let namee;
		if (args.join().indexOf('@') !== -1) {
			namee = Object.keys(mentions)[0];
		} else {
			namee = args[1];
		}
		if (messageReply) { namee = messageReply.senderID; }
		if (!namee) return api.sendMessage(`───────────────\n» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗮𝗴 𝗼𝗿 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝘀𝗼𝗺𝗲𝗼𝗻𝗲!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

		const threadInfo = await api.getThreadInfo(threadID);
		const findd = threadInfo.adminIDs.find(el => el.id == namee);
		const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
		const finddd = threadInfo.adminIDs.find(el => el.id == senderID);

		if (!finddd) return api.sendMessage(`───────────────\n» ❌ 𝗬𝗼𝘂 𝗮𝗿𝗲 𝗻𝗼𝘁 𝗮 𝗴𝗿𝗼𝘂𝗽 𝗮𝗱𝗺𝗶𝗻!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
		if (!find) return api.sendMessage(`───────────────\n» ❌ 𝗕𝗼𝘁 𝗻𝗲𝗲𝗱𝘀 𝗮𝗱𝗺𝗶𝗻 𝗽𝗼𝘄𝗲𝗿 𝗳𝗶𝗿𝘀𝘁!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
		
		if (!findd) {
			api.changeAdminStatus(threadID, namee, true);
		} else {
			api.changeAdminStatus(threadID, namee, false);
		}
	}

	if (args[0] == "image") {
		if (type !== "message_reply") return api.sendMessage(`───────────────\n» ❌ 𝗬𝗼𝘂 𝗺𝘂𝘀𝘁 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝗮 𝗽𝗵𝗼𝘁𝗼!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
		if (!messageReply.attachments || messageReply.attachments.length == 0) return api.sendMessage(`───────────────\n» ❌ 𝗬𝗼𝘂 𝗺𝘂𝘀𝘁 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝗮 𝗽𝗵𝗼𝘁𝗼!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
		if (messageReply.attachments.length > 1) return api.sendMessage(`───────────────\n» ❌ <b>𝗥𝗲𝗽𝗹𝘆 𝘁𝗼 𝗼𝗻𝗹𝘆 𝗼𝗻𝗲 𝗽𝗵𝗼𝘁𝗼!</b>\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

		var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/group_img.png"), threadID, () => {
			if (fs.existsSync(__dirname + "/cache/group_img.png")) fs.unlinkSync(__dirname + "/cache/group_img.png");
		});
		return request(encodeURI(messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/cache/group_img.png')).on('close', () => callback());
	}

	if (args[0] == "info") {
		var threadInfo = await api.getThreadInfo(threadID);
		let threadMem = threadInfo.participantIDs.length;
		var gendernam = [];
		var gendernu = [];
		var nope = [];
		for (let z in threadInfo.userInfo) {
			var gioitinhone = threadInfo.userInfo[z].gender;
			var nName = threadInfo.userInfo[z].name;
			if (gioitinhone == 'MALE') {
				gendernam.push(z + gioitinhone);
			} else if (gioitinhone == 'FEMALE') {
				gendernu.push(gioitinhone);
			} else {
				nope.push(nName);
			}
		}
		var nam = gendernam.length;
		var nu = gendernu.length;
		let qtv = threadInfo.adminIDs.length;
		let sl = threadInfo.messageCount;
		let icon = threadInfo.emoji;
		let threadName = threadInfo.threadName;
		let id = threadInfo.threadID;
		var listad = '';
		var qtv2 = threadInfo.adminIDs;
		for (let i = 0; i < qtv2.length; i++) {
			try {
				const infu = (await api.getUserInfo(qtv2[i].id));
				const name = infu[qtv2[i].id].name;
				listad += '  • ' + name + '\n';
			} catch (e) {
				listad += '  • 𝗨𝗻𝗸𝗻𝗼𝘄𝗻 𝗨𝘀𝗲𝗿\n';
			}
		}
		let sex = threadInfo.approvalMode;
		var pd = sex == false ? '𝗧𝘂𝗿𝗻 𝗢𝗳𝗳' : sex == true ? '𝗧𝘂𝗿𝗻 𝗢𝗻' : '𝗞𝗵';
		var pdd = sex == false ? '❎' : sex == true ? '✅' : '⭕';
		
		var callback = () => api.sendMessage({
			body: `───────────────\n» ℹ️ 𝗚𝗥𝗢𝗨𝗣 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧block𝗢𝗡:\n\n» 𝗚𝗖 𝗡𝗮𝗺𝗲: ${threadName}\n» 𝗚𝗖 𝗜𝗗: ${id}\n» ${pdd} 𝗔𝗽𝗽𝗿𝗼𝘃𝗲: ${pd}\n» 𝗘𝗺𝗼𝗷𝗶: ${icon}\n» 𝗧𝗼𝘁𝗮𝗹: ${threadMem} 𝗺𝗲𝗺𝗯𝗲𝗿𝘀\n» 𝗠𝗮𝗹𝗲: ${nam}\n» 𝗙𝗲𝗺𝗮𝗹𝗲: ${nu}\n» 𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝘁𝗼𝗿𝘀 (${qtv}):\n${listad}» 𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝘀𝘀𝗮𝗴𝗲𝘀: ${sl}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
			attachment: fs.createReadStream(__dirname + '/cache/group_info.png')
		}, threadID, () => {
			if (fs.existsSync(__dirname + "/cache/group_info.png")) fs.unlinkSync(__dirname + "/cache/group_info.png");
		}, messageID);

		if(threadInfo.imageSrc) {
			return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/group_info.png')).on('close', () => callback());
		} else {
			return api.sendMessage(`───────────────\n» ℹ️ 𝗚𝗥𝗢𝗨𝗣 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡:\n\n» 𝗚𝗖 𝗡𝗮𝗺𝗲: ${threadName}\n» 𝗚𝗖 𝗜𝗗: ${id}\n» ${pdd} 𝗔𝗽𝗽𝗿𝗼𝘃𝗲: ${pd}\n» 𝗘𝗺𝗼𝗷𝗶: ${icon}\n» 𝗧𝗼𝘁𝗮𝗹: ${threadMem} 𝗺𝗲𝗺𝗯𝗲𝗿𝘀\n» 𝗠𝗮𝗹𝗲: ${nam}\n» 𝗙𝗲𝗺𝗮𝗹𝗲: ${nu}\n» 𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝘁𝗼𝗿𝘀 (${qtv}):\n${listad}» 𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝘀𝘀𝗮𝗴𝗲𝘀: ${sl}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
		}
	}
};
