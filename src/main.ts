import login from "fca-unofficial"
import fs from "fs"
import http from "https"

interface Message {
    [key: string]: any
}

const msgs: Message = {};

import { commands, validations } from "./modules"
login(
    { appState: JSON.parse(fs.readFileSync("fbstate.json", "utf8")) },
    (err, api) => {
        if (err) return console.error(err);
        api.setOptions({ listenEvents: true, selfListen: false });
        api.listen(async (err, event) => {
            const body = event.body;
            const threadID = event.threadID;
            const messageID = event.messageID;
            const senderID = event.senderID;
            const attachments = event.attachments

            switch (event.type) {
                case "message":
                case "message_reply":
                    try {
                        for (const command in commands) {
                            if (body === command || body.startsWith(command)) {
                                commands[command](api, body, threadID, messageID, senderID)
                            }
                        }

                        if (attachments.length != 0) {
                            if (attachments[0].type == "photo") {
                                msgs[messageID] = ["img", attachments[0].url];
                            } else if (attachments[0].type == "animated_image") {
                                msgs[messageID] = ["gif", attachments[0].url];
                            } else if (attachments[0].type == "sticker") {
                                msgs[messageID] = ["sticker", attachments[0].url];
                            } else if (attachments[0].type == "video") {
                                msgs[messageID] = ["vid", attachments[0].url];
                            } else if (attachments[0].type == "audio") {
                                msgs[messageID] = ["vm", attachments[0].url];
                            } else if (attachments[0].type == "share") {
                                msgs[messageID] = ["link", attachments[0].url];
                            }
                        } else {
                            msgs[messageID] = body;
                        }
                    } catch (err) {
                        console.error(err);
                    }
                    break;

                case "message_unsend":
                    try {
                        if (validations.isThread) {

                            api.getThreadInfo(threadID, (err, threadName) => {
                                api.getUserInfo(senderID, (err, username) => {
                                    if (err) return console.error(err);
                                    let message = msgs[event.messageID];

                                    try {

                                        if (typeof (message) == "object") {
                                            if (message[0] == "img") {
                                                let file = fs.createWriteStream(__dirname + "/mediaEntry/photo.jpg")
                                                let imgRequest = http.get(message[1], (imgResponse) => {
                                                    imgResponse.pipe(file)
                                                    file.on("finish", () => {
                                                        console.log("Finished downloading photo")
                                                        const messageToSend = {
                                                            body: `${username[senderID].name
                                                                }\nFrom: ${threadName.name || "Private Message"}\n${new Date().toLocaleString(
                                                                    "en-US",
                                                                    { timeZone: "Asia/Manila" }
                                                                )}\nUnsent this photo:`,
                                                            attachment: fs.createReadStream(__dirname + "/mediaEntry/photo.jpg")
                                                        }
                                                        api.sendMessage(messageToSend, threadID, messageID)
                                                    })
                                                })
                                            } else if (message[0] == "gif") {
                                                let file = fs.createWriteStream(__dirname + "/mediaEntry/animatedImage.gif")
                                                let gifRequest = http.get(message[1], (gifResponse) => {
                                                    gifResponse.pipe(file)
                                                    file.on("finish", () => {
                                                        console.log("Finished downloading GIF")
                                                        const messageToSend = {
                                                            body: `${username[senderID].name
                                                                }\nFrom: ${threadName.name || "Private Message"}\n${new Date().toLocaleString(
                                                                    "en-US",
                                                                    { timeZone: "Asia/Manila" }
                                                                )}\nUnsent this GIF:`,
                                                            attachment: fs.createReadStream(__dirname + "/mediaEntry/animatedImage.gif")
                                                        }
                                                        api.sendMessage(messageToSend, threadID, messageID)
                                                    })
                                                })
                                            } else if (message[0] == "sticker") {
                                                let file = fs.createWriteStream(__dirname + "/mediaEntry/sticker.png")
                                                let stickerRequest = http.get(message[1], (stickerResponse) => {
                                                    stickerResponse.pipe(file)
                                                    file.on("finish", () => {
                                                        console.log("Finished downloading sticker")
                                                        const messageToSend = {
                                                            body: `${username[senderID].name
                                                                }\nFrom: ${threadName.name || "Private Message"}\n${new Date().toLocaleString(
                                                                    "en-US",
                                                                    { timeZone: "Asia/Manila" }
                                                                )}\nUnsent this sticker:`,
                                                            attachment: fs.createReadStream(__dirname + "/mediaEntry/sticker.png")
                                                        }
                                                        api.sendMessage(messageToSend, threadID, messageID)
                                                    })
                                                })
                                            } else if (message[0] == "vid") {
                                                let file = fs.createWriteStream(__dirname + "/mediaEntry/video.mp4")
                                                let vidRequest = http.get(message[1], (vidResponse) => {
                                                    vidResponse.pipe(file)
                                                    file.on("finish", () => {
                                                        console.log("Finished downloading video")
                                                        const messageToSend = {
                                                            body: `${username[senderID].name
                                                                }\nFrom: ${threadName.name || "Private Message"}\n${new Date().toLocaleString(
                                                                    "en-US",
                                                                    { timeZone: "Asia/Manila" }
                                                                )}\nUnsent this video:`,
                                                            attachment: fs.createReadStream(__dirname + "/mediaEntry/video.mp4")
                                                        }
                                                        api.sendMessage(messageToSend, threadID, messageID)
                                                    })
                                                })
                                            } else if (message[0] == "vm") {
                                                let file = fs.createWriteStream(__dirname + "/mediaEntry/vm.mp3")
                                                let vmRequest = http.get(message[1], (vmResponse) => {
                                                    vmResponse.pipe(file)
                                                    file.on("finish", () => {
                                                        console.log("Finished downloading vm")
                                                        const messageToSend = {
                                                            body: `${username[senderID].name
                                                                }\nFrom: ${threadName.name || "Private Message"}\n${new Date().toLocaleString(
                                                                    "en-US",
                                                                    { timeZone: "Asia/Manila" }
                                                                )}\nUnsent this vm:`,
                                                            attachment: fs.createReadStream(__dirname + "/mediaEntry/vm.mp3")
                                                        }
                                                        api.sendMessage(messageToSend, threadID, messageID)
                                                    })
                                                })
                                            } else if (message[0] == "link") {
                                                let url = decodeURIComponent(message[1]);

                                                if (url.includes("l.facebook.com/l.php")) {
                                                    url = decodeURIComponent(url.split("u=")[1].split("&")[0]);
                                                }

                                                console.log(url)

                                                let messageToSend = {
                                                    body: `${username[senderID].name}\n${new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })}\nFrom: "${threadName.name || 'Private Message'}"\nUnsent this link:\n\n${url.toString()}`
                                                }

                                                api.sendMessage(messageToSend, threadID, messageID);

                                            }
                                        } else {

                                            const messageToSend = {
                                                body: `${username[senderID].name
                                                    }\nFrom: ${threadName.name || "Private Message"}\n${new Date().toLocaleString(
                                                        "en-US",
                                                        { timeZone: "Asia/Manila" }
                                                    )}\nUnsent this message:\n\n${message}`
                                            }
                                            api.sendMessage(
                                                messageToSend,
                                                threadID,
                                                messageID
                                            );
                                        }


                                    } catch (err) {
                                        console.error(err);
                                    }
                                });
                            })


                        }


                    } catch (err) {
                        console.error(err);
                    }
                    break;
            }
        });
    }
);
