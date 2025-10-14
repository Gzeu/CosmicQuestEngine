import { sendTransaction } from '../provider';
import { scCall } from '../utils';

// Adresele contractelor sunt citite din config runtime
const CFG_HERO = (process.env.NEXT_PUBLIC_HERO_SC || '').trim();

export type HeroClass = 'Warrior' | 'Mage' | 'Ranger' | 'Paladin' | 'Rogue';

export async function mintHero(sender: string, heroClass: HeroClass) {
  if (!CFG_HERO) throw new Error('NEXT_PUBLIC_HERO_SC is not set');
  const data = scCall('mintHero', heroClass).valueOf();
  const tx = await sendTransaction(sender, {
    receiver: CFG_HERO,
    data: data.toString(),
    gasLimit: 20_000_000,
  });
  return tx;
}
