#!/usr/bin/env node

'use strict'

const readdir = require('fs-readdir-recursive')
const version = require('./package').version
const program = require('commander')
const path = require('path')
const fs = require('fs')

program
  .version(version)
  .option('-d, --dir <s>', 'svg assets directory')
  .option('-o, --out <s>', 'css file out path')
  .option('-p, --prefix <s>', 'css selector prefix')
  .parse(process.argv)

const opts = {
  dir: program.dir || 'asset',
  out: program.out || 'inline-svg.css',
  prefix: program.prefix || '.inline-svg'
}

const files = readdir(opts.dir)
  .filter(p => path.extname(p) === '.svg')

const file = fs.createWriteStream(path.resolve(opts.out))

files.forEach(p => {
  const suffix = p.replace(/\//g, '-').replace('.svg', '')

  const css = `
${opts.prefix}${suffix} {
  background: svg-load('${p}');
}
`

  file.write(css)
})
