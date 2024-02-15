const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { v2 } = require('osu-api-extended');
const moment = require('moment');

module.exports = {
    /**
     * 
     * @param {Client} client
     * @param {Interaction} interaction
     * 
     */

    callback: async (client, interaction) => {
        await interaction.deferReply();
        const nickname = interaction.options.get('nickname').value;
        const dataOsu = await v2.user.details(`${nickname}`);

        let S = dataOsu.statistics.play_time;
        let CPT = Math.floor(S / 3600);

        //Make play time prettier
        let numberPT = CPT;
        let osuPT = Number(numberPT).toLocaleString();

        //Make highest rank prettier
        let numberHRank = dataOsu.rank_highest.rank;
        let osuHRank = Number(numberHRank).toLocaleString();

        //Make rank number prettier
        let numberScore = dataOsu.statistics.total_score;
        let osuScore = Number(numberScore).toLocaleString();

        //Make hits number prettier
        let numberHit = dataOsu.statistics.total_hits;
        let osuHit = Number(numberHit).toLocaleString();

        //Make global rank prettier
        let numberGRank = dataOsu.statistics.global_rank;
        let osuGRank = Number(numberGRank).toLocaleString();

        //Make local rank prettier
        let numberLRank = dataOsu.statistics.country_rank;
        let osuLRank = Number(numberLRank).toLocaleString();

        //Make pp counter prettier
        let numberPP = dataOsu.statistics.pp;
        let osuPP = Number(numberPP).toLocaleString();

        //Make play count prettier
        let numberPC = dataOsu.statistics.play_count;
        let osuPC = Number(numberPC).toLocaleString();

        //Make replay watch counter prettier
        let numberRW = dataOsu.statistics.replays_watched_by_others;
        let osuRW = Number(numberRW).toLocaleString();

        //Make Ranked score counter prettier
        let numberRS = dataOsu.statistics.ranked_score;
        let osuRS = Number(numberRS).toLocaleString();

        //Make Max combo counter prettier
        let numberMC = dataOsu.statistics.maximum_combo;
        let osuMC = Number(numberMC).toLocaleString();

        //Make Accuracy counter prettier
        let numberAC = dataOsu.statistics.hit_accuracy;
        let osuAC = Math.round(numberAC * 10) / 10;

        // Parse the input string as a UTC date and time
        const input = `${dataOsu.join_date}`;
        const date = moment.utc(input);

        // Format the date and time as desired
        const osuJD = date.format('HH:mm:ss DD MMM YYYY');

        // Get the current date and time
        const now = moment();

        // Calculate the difference in years
        const diff = now.diff(date, 'years');

        // Format the output as desired
        const osuYJD = diff + ' years ago';

        const embed = new EmbedBuilder()
            .setColor(0x18e1ee)
            .setImage(`${osuJD}`)
            .setThumbnail(`https://a.ppy.sh/${dataOsu.id}`)
            .setTimestamp(Date.now())
            .setFooter({
                text: `Joined osu! ${dataOsu.join_date} (${osuYJD})`,
                iconURL: `https://a.ppy.sh/${dataOsu.id}`
            })
            .setAuthor({
                name: `${dataOsu.username}'s Profile`,
                iconURL: `https://osu.ppy.sh/images/flags/${dataOsu.country_code}.png`,
                url: `https://osu.ppy.sh/u/${dataOsu.id}/`
            })
            .addFields([
                {
                    name: 'Peak Rank',
                    value: `#${osuHRank}`,
                    inline: true
                },
                {
                    name: 'Current Rank',
                    value: `#${osuGRank} (${dataOsu.country_code}${osuLRank})`,
                    inline: true
                },
                {
                    name: 'Level',
                    value: `${dataOsu.statistics.level.current}.${dataOsu.statistics.level.progress}`,
                    inline: true
                },
                {
                    name: 'Total PP',
                    value: `${osuPP}pp`,
                    inline: true
                },
                {
                    name: 'Total Score',
                    value: `${osuScore}`,
                    inline: true
                },
                {
                    name: 'Total Hits',
                    value: `${osuHit}`,
                    inline: true
                },
                {
                    name: 'Ranked Score',
                    value: `${osuRS}`,
                    inline: true
                },
                {
                    name: 'Max Combo',
                    value: `${osuMC}`,
                    inline: true
                },
                {
                    name: 'Accuracy',
                    value: `${osuAC}%`,
                    inline: true
                },
                {
                    name: 'Play count',
                    value: `${osuPC} / ${osuPT} hrs`,
                    inline: true
                },
                {
                    name: 'Replays watched',
                    value: `${osuRW}`,
                    inline: true
                }
            ])
        await interaction.editReply({
            embeds: [embed]
        });
    },

    name: 'osu',
    description: 'Detail osu! Profile',
    options: [
        {
            name: 'nickname',
            description: 'You can use your osu IGN or UID.',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
};
