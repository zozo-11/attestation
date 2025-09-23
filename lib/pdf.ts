import { PDFDocument } from 'pdf-lib'

interface Info {
  hebergeant: { nom: string; prenom: string }
  heberge: { nom: string; prenom: string }
  signature?: string
}

export async function buildPdf(info: Info): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const page = doc.addPage()
  const { width, height } = page.getSize()
  const text = `ATTESTATION D’HÉBERGEMENT\n\nJe soussigné(e) ${info.hebergeant.prenom} ${info.hebergeant.nom} héberge ${info.heberge.prenom} ${info.heberge.nom}.`
  page.drawText(text, { x: 50, y: height - 80, size: 12 })
  if (info.signature) {
    const sigImg = await doc.embedPng(info.signature)
    const sigDims = sigImg.scale(0.5)
    page.drawImage(sigImg, {
      x: width - sigDims.width - 50,
      y: 50,
      width: sigDims.width,
      height: sigDims.height
    })
  }
  return await doc.save()
}
