import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export async function confirm(question: string) {
  const rl = readline.createInterface({ input, output })
  const answer = await rl.question(`${question} (y/n): `)
  rl.close()
  return answer.toLowerCase() === 'y'
}
