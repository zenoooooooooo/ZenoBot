interface Admin {
    [key: string]: any
}

interface Thread {
    [key: string]: any
}


const admins: Admin = {}


const threads: Thread = {
    ...admins,
}

module.exports = {
    admins,
    threads,
};
