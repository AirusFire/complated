const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "Bir YouTube Birlikte oturumu başlatır.",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["yt"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bir şey çalmak için bir ses kanalında olmalısınız!**"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
      return client.sendTime(
        message.channel,
        "❌ | **Bot'un Davet Oluşturma İzni yok**"
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "880218394199220334"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "YouTube Birlikte",
        "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
      )
      .setColor("#FF0000").setDescription(`
**YouTube Birlikte**'yi kullanarak YouTube'u arkadaşlarınızla bir Ses Kanalında izleyebilirsiniz. Katılmak için **YouTube Birlikte'ye Katılın**'a tıklayın!

__**[YouTube Birlikte'ye Katılın](https://discord.com/invite/${Invite.code})**__

⚠ **Not:** Bu yalnızca Masaüstünde çalışır
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | Bu komutu kullanmak için bir ses kanalında olmalısınız."
        );
      if (
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "❌ | **Bot'un Davet Oluşturma İzni yok**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "755600276941176913"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
        .setAuthor(
          "YouTube Birlikte",
          "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
        )
        .setColor("#FF0000").setDescription(`
**YouTube Birlikte**'yi kullanarak YouTube'u arkadaşlarınızla bir Ses Kanalında izleyebilirsiniz. Katılmak için **YouTube Birlikte'ye Katılın**'a tıklayın!

__**[YouTube Birlikte'ye Katılın](https://discord.com/invite/${Invite.code})**__

⚠ **Note:** Bu yalnızca Masaüstünde çalışır
`);
      interaction.send(embed.toJSON());
    },
  },
};
