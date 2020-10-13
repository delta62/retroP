import chalk from 'chalk'

import { File } from './interfaces'

export let logHeader = () => {
  console.log(`
              / |_              |_   __ \\
 _ .--. .---.\`| |-'_ .--.  .--.   | |__) |
[ \`/'\`\\] /__\\\\| | [ \`/'\`\\] .'\`\\ \\ |  ___/
 | |   | \\__.,| |, | |   | \\__. |_| |_
[___]   '.__.'\\__/[___]   '.__.'|_____|
`)
}

export let logFile = ({ path }: File): void => {
  console.log(`${chalk.green('✓')} Fixed ${chalk.blue(path)}`)
}
