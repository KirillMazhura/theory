const Telegraf = require("telegraf").Telegraf,
BOT_TOKEN = "";

const bot = new Telegraf(BOT_TOKEN);

const api = 'https://russianwarship.rip/api/v2/statistics/latest'

let kindOfStatistic = 'increase';

bot.start(ctx => {
ctx.replyWithHTML("Welcome", {
    reply_markup: {
        inline_keyboard: [
            [
                {text: 'Resourse', url: 'https://russianwarship.rip/ '}
            ],
            [
                {text: 'Статистика за день', callback_data: 'getDataByDay'},
            ],
            [
                {text: 'Вся Статистика', callback_data: 'getAllData'}
            ]
        ]
    }
});
})

bot.action('getDataByDay', ctx => {
    kindOfStatistic = 'increase'
    ctx.reply('Статистика за день')
})
bot.action('getAllData', ctx => {
    kindOfStatistic = 'stats'
    ctx.reply('Вся статистика')
})


bot.hears(/tanks/i, ctx => {
    fetch(api)
    .then(response => response.json())
    .then(data => {
        const { tanks } = data.data[kindOfStatistic]
        return ctx.reply(`${tanks}`)
    })
})
bot.launch()
