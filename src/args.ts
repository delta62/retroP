import yargs from 'yargs'

export interface Args {
  pattern: string
}

export default yargs(process.argv.slice(2))
  .command('$0 <pattern>', 'show files matching a pattern', yargs =>
    yargs.option('pattern', {
      alias: 'p',
      desc: 'A glob pattern to match',
      type: 'string',
      demandOption: true,
    }),
  )
  .help()
  .strict()
  .argv as Args
