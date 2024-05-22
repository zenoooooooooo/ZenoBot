import { Api } from "fca-unofficial"
import { validations } from "./modules"

interface Commands {
    [key: string]: (api: Api, body: any, threadID: string | number, messageID: string | number, senderID: string | number) => void
}

const commands: Commands = {

    ">stop": async (api, body, threadID, messageID, senderID) => {

        if (validations.isAdmin(api, body, threadID, messageID, senderID)) {
            try {
                api.sendMessage("ZenoBot shutting down...", threadID, messageID);
                process.exit();
            } catch (err) {
                console.error(err);
            }
        } else {
            api.sendMessage(
                "Only an admin can exit the process...",
                threadID,
                messageID
            );
        }

    },

    ">say": async (api, body, threadID, messageID, senderID) => {
        try {
            const data = body.slice(5);
            api.sendMessage(data, threadID, messageID);
        } catch (err) {
            console.error(err);
        }
    },

    ">spam": async (api, body, threadID, messageID, senderID) => {

        if (validations.isAdmin(api, body, threadID, messageID, senderID)) {
            let i = 1;
            while (i <= 10) {
                try {
                    setTimeout(() => {
                        api.sendMessage(`Spamming messages...`, threadID, messageID);
                    }, 1000)
                } catch (err) {
                    console.error(err)
                }
                i++;
            }
        } else {
            api.sendMessage(
                "Only an admin can perform that command...",
                threadID,
                messageID
            );
        }

    },

}

module.exports = {
    commands,
};
