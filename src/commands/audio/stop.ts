import { CommandOptionsRunTypeEnum } from '@sapphire/framework';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { GameEndReason } from '#types/Enums';
import { ArimaCommand } from '#structures/ArimaCommand';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<ArimaCommand.Options>({
	description: 'Stop an ongoing game!',
	runIn: [CommandOptionsRunTypeEnum.GuildText],
	preconditions: [{ name: 'PlayingGame', context: { shouldBePlaying: true } }],
	requiredClientPermissions: PermissionFlagsBits.EmbedLinks,
	chatInputCommand: {
		register: true,
		idHints: ['937411030118694923']
	}
})
export class UserCommand extends ArimaCommand {
	public override async chatInputRun(interaction: ArimaCommand.Interaction<'cached'>) {
		const game = interaction.guild
			? this.container.games.get(interaction.guild.id)!
			: this.container.games.find((game) => game.players.has(interaction.author.id))!;
		await game.end(GameEndReason.Other, interaction.reply.bind(interaction));
	}
}
