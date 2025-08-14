import { promises as fs } from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const root = path.resolve(new URL('..', import.meta.url).pathname)

const IGNORE = ['node_modules', '.git', '.next', 'rapport_verification.txt']

const results = []

async function check(name, fn) {
  try {
    await fn()
    results.push({ name, ok: true })
  } catch (e) {
    results.push({ name, ok: false, msg: e.message })
  }
}

function walk(dir, ignore = []) {
  const entries = fs.readdir(dir, { withFileTypes: true })
  return entries.then(list => Promise.all(list.map(d => {
    if (ignore.includes(d.name)) return []
    const res = path.join(dir, d.name)
    if (d.isDirectory()) return walk(res, ignore)
    return [res]
  }))).then(a => a.flat())
}

await check('Pas de fichiers binaires', async () => {
  const files = await walk(root, IGNORE)
  const regex = /\.(png|jpe?g|gif|webp|avif|ico|svg|pdf|mp3|mp4|webm|zip|7z|ttf|otf|woff2?|psd|ai)$/i
  const bad = files.filter(f => regex.test(f))
  if (bad.length) throw new Error('Fichiers interdits: ' + bad.join(', '))
})

await check('Manifest correct', async () => {
  const manifestPath = path.join(root, 'public/manifest.webmanifest')
  const data = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
  if (data.icons) throw new Error('Propriété icons détectée')
  if (data.name !== 'Attestation' || data.short_name !== 'Attestation') throw new Error('Nom incorrect')
  const dark = c => parseInt(c.slice(1), 16) <= 0x777777
  if (!dark(data.theme_color) || !dark(data.background_color)) throw new Error('Couleurs non sombres')
})

await check('Pas de balises d\'icônes', async () => {
  const files = await walk(root, IGNORE)
  const text = await Promise.all(files.map(f => fs.readFile(f, 'utf8').catch(() => '')))
  const regex = /rel=["'](?:icon|apple-touch-icon|mask-icon)["']|favicon/i
  const bad = files.filter((f, i) => f !== path.join(root, 'scripts/verify.mjs') && regex.test(text[i]))
  if (bad.length) throw new Error('Balises icônes trouvées dans ' + bad.join(', '))
})

await check('Pas de data URI', async () => {
  const files = await walk(root, IGNORE)
  const text = await Promise.all(files.map(f => fs.readFile(f, 'utf8').catch(() => '')))
  const regex = /data:(?:image|application\/pdf|font)/i
  const bad = files.filter((f, i) => regex.test(text[i]))
  if (bad.length) throw new Error('Data URI trouvées dans ' + bad.join(', '))
})

await check('Pas de @font-face', async () => {
  const files = await walk(root, IGNORE)
  const text = await Promise.all(files.map(f => fs.readFile(f, 'utf8').catch(() => '')))
  const regex = /@font-face|url\([^)]*\.(?:woff2?|ttf|otf)/i
  const bad = files.filter((f, i) => f !== path.join(root, 'scripts/verify.mjs') && regex.test(text[i]))
  if (bad.length) throw new Error('Fontes externes trouvées dans ' + bad.join(', '))
})

await check('IndexedDB texte uniquement', async () => {
  const dbFile = path.join(root, 'lib/db.ts')
  const txt = await fs.readFile(dbFile, 'utf8')
  if (/Blob|ArrayBuffer|File/.test(txt)) throw new Error('Types binaires détectés')
})

await check('Script dark mode présent', async () => {
  const layout = await fs.readFile(path.join(root, 'app/layout.tsx'), 'utf8')
  if (!/localStorage\.getItem\(['"]theme['"]\)/.test(layout)) throw new Error('Lecture du thème absente')
  if (!/classList\.add\(['"]dark['"]\)/.test(layout)) throw new Error('Ajout de la classe dark manquant')
})

await check('Build Next.js', async () => {
  execSync('pnpm build', { stdio: 'inherit' })
})

const report = results.map(r => r.ok ? `OK - ${r.name}` : `ERREUR - ${r.name}: ${r.msg}`).join('\n')
await fs.writeFile(path.join(root, 'rapport_verification.txt'), report)

console.log(report)

if (results.some(r => !r.ok)) process.exit(1)
