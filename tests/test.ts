import { test } from 'uvu'
import assert from 'uvu/assert'
import execa from 'execa'

test('register', async () => {
  const { stdout } = await execa('node', [
    '-r',
    `${process.cwd()}/register.js`,
    `${process.cwd()}/tests/fixture.ts`,
  ])
  assert.is(stdout, 'text')
})

test('register2', async () => {
  const { stdout } = await execa('node', [
    '-r',
    `${process.cwd()}/register.js`,
    `${process.cwd()}/tests/fixture.arrowFunction.ts`,
  ])
  assert.is(stdout, 'hello from ts')
})

test('register cjs', async () => {
  const { stdout } = await execa('node', [
    '-r',
    `${process.cwd()}/register.js`,
    `${process.cwd()}/tests/fixture.cjs.ts`,
  ])
  assert.is(stdout, 'fs imported')
})

// test('package type module', async () => {
//   const { stdout } = await execa('node', [
//     '-r',
//     `${process.cwd()}/register.js`,
//     `${process.cwd()}/tests/fixture-type-module/index.js`,
//   ])
//   assert.is(stdout, 'foo')
// })

// test('import type module', async () => {
//   const { stdout } = await execa('node', [
//     '-r',
//     `${process.cwd()}/register.js`,
//     `${process.cwd()}/tests/import-type-module/index.js`,
//   ])
//   assert.is(stdout, 'foo')
// })

test('typescript in node_modules (adapter-like package)', async () => {
  const { stdout } = await execa('node', [
    '-r',
    `${process.cwd()}/register.js`,
    `${process.cwd()}/tests/fixture-node-modules-ts/node_modules/iobroker.demo/main.ts`,
  ])
  assert.is(stdout, 'demo:42|Green|hi|dep')
})

test.run()
