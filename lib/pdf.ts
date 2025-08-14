import { PDFDocument } from 'pdf-lib'

export async function buildPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const page = doc.addPage()
  page.drawText('ATTESTATION D\u2019H\u00c9BERGEMENT', { x: 50, y: page.getHeight() - 50, size: 18 })
  return await doc.save()
}
