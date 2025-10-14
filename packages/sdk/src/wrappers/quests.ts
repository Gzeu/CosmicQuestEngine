import { sendTransaction } from '../provider';
import { scCall } from '../utils';

const CFG_QUEST = (process.env.NEXT_PUBLIC_QUEST_SC || '').trim();

export async function completeQuest(sender: string, heroId: number, questId: number) {
  if (!CFG_QUEST) throw new Error('NEXT_PUBLIC_QUEST_SC is not set');
  const data = scCall('completeQuest', heroId, questId).valueOf();
  const tx = await sendTransaction(sender, {
    receiver: CFG_QUEST,
    data: data.toString(),
    gasLimit: 20_000_000,
  });
  return tx;
}
