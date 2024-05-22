import { Api } from "fca-unofficial"
import { admins, threads } from "./modules"

interface Validation {
    [key: string]: (api: Api, body: any, threadID: string | number, messageID: string | number, senderID: string | number) => boolean
}


const validations: Validation = {
    isAdmin: (api, body, threadID, messageID, senderID) => {
        for (const admin in admins) {
            if (senderID === admins[admin]) {
                return true
            }
        }
        return false
    },
    isThread: (api, body, threadID, messageID, senderID) => {
        for (const thread in threads) {
            if (threadID === threads[thread]) {
                return true
            }
        }
        return false
    }
}


module.exports = {
    validations
}