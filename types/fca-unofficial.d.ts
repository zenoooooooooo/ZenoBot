declare module 'fca-unofficial' {

    interface Data {
        [key: string]: any;
    }

    interface Api {
        setOptions(options: { listenEvents: boolean; selfListen: boolean }): void;
        listen(callback: (err: any, event: any) => void): void;
        sendMessage(message: string | object, threadID: string | number, messageID: string | number): void;
        getUserInfo(senderID: string | number, callback: (err: any, username: Data) => void): void;
        getThreadInfo(threadID: string | number, callback: (err: any, threadName: Data) => void): void
    }

    interface LoginOptions {
        appState: any;
    }

    function login(credentials: LoginOptions, callback: (err: any, api: Api) => void): void;

    export = login
    export { Api };
}
