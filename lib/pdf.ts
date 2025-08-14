import { PDFDocument, StandardFonts } from 'pdf-lib'

export interface PdfData {
  hNom: string
  hPrenom: string
  eNom: string
  ePrenom: string
  signature?: string
}

export async function buildPdf(data: PdfData): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const page = doc.addPage()
  const { width, height } = page.getSize()
  const font = await doc.embedFont(StandardFonts.Helvetica)

  page.drawText('ATTESTATION D\u2019H\u00c9BERGEMENT', {
    x: 50,
    y: height - 50,
    size: 18,
    font
  })
  page.drawText(`Hébergeant: ${data.hPrenom} ${data.hNom}`, { x: 50, y: height - 80, size: 12, font })
  page.drawText(`Hébergé: ${data.ePrenom} ${data.eNom}`, { x: 50, y: height - 100, size: 12, font })

  if (data.signature) {
    const pngBytes = Uint8Array.from(atob(data.signature.split(',')[1]), c => c.charCodeAt(0))
    const sigImg = await doc.embedPng(pngBytes)
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
