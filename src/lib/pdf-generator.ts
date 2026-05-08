import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatToEcuador, ECUADOR_TIMEZONE } from './date-utils';

// Global constants for branding parity
const ALL_BLUE: [number, number, number] = [43, 78, 255]; // #2B4EFF
const ALL_LOGO_B64 = ''; // Base64 for ALL logo would go here

// Adds the professional ALL header to any jsPDF instance
export function addAllHeader(doc: jsPDF, title: string, subtitle: string) {
  // 1. Branding Logo (Vector-style)
  doc.setFillColor(ALL_BLUE[0], ALL_BLUE[1], ALL_BLUE[2]);
  doc.roundedRect(15, 12, 18, 18, 4, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('ALL', 24, 23, { align: 'center' });

  // Branding Text
  doc.setTextColor(ALL_BLUE[0], ALL_BLUE[1], ALL_BLUE[2]);
  doc.setFontSize(18);
  doc.text('ALL CRM', 38, 22);
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text('MANAGEMENT SYSTEM', 38, 27);

  // 2. Fiscal Info (Top Right Rounded Box)
  doc.setDrawColor(0);
  doc.setLineWidth(0.1);
  doc.roundedRect(100, 10, 95, 36, 3, 3); // box for 6 lines
  
  // -- Line 1: RUC --
  doc.setTextColor(0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('RUC:', 102, 16);
  doc.text('S/RUC', 132, 16);
  
  // -- Line 2: COTIZACION Nº --
  doc.text('COTIZACION Nº:', 102, 21);
  doc.setTextColor(ALL_BLUE[0], ALL_BLUE[1], ALL_BLUE[2]);
  doc.text(title.split(/[:№Nº]/).pop()?.trim() || '', 140, 21);
  
  // -- Line 3: Owner Name (Centered/Bold Large) --
  doc.setTextColor(0);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('ALL CRM & MANAGEMENT', 147.5, 26, { align: 'center' });
  
  // -- Line 4: Address (Centered/Normal) --
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('CIUDAD DE LOJA - ECUADOR', 147.5, 30.5, { align: 'center' });

  // -- Line 5: Teléfono --
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Teléfono:', 102, 36);
  doc.text('+593 96 341 0409', 125, 36);

  // -- Line 6: correo --
  doc.text('correo:', 102, 41);
  doc.text('contacto@allcrm.com', 125, 41);

  // 3. NO Separator (removed by user request - "una linea de mas")
}

// Helper to convert numbers to Spanish words for "SON: ..."
export function numberToSpanishWords(n: number): string {
  if (isNaN(n) || n === undefined || n === null) return 'CERO, 00/100 DOLARES';
  const units = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
  const tens = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
  const teens = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
  const cents = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

  if (n === 0) return 'CERO';
  if (n === 100) return 'CIEN';

  let words = '';
  
  const getHundreds = (num: number) => {
    let w = '';
    const h = Math.floor(num / 100);
    const t = Math.floor((num % 100) / 10);
    const u = num % 10;

    if (h > 0) {
        if (h === 1 && t === 0 && u === 0) w += 'CIEN ';
        else w += cents[h] + ' ';
    }
    if (t === 1 && u < 10 && u >= 0) {
      if (u === 0) w += 'DIEZ';
      else w += teens[u];
    } else {
      if (t > 0) {
        w += tens[t];
        if (u > 0) w += ' Y ';
      }
      if (u > 0) w += units[u];
    }
    return w.trim();
  };

  const thousands = Math.floor(n / 1000);
  const remainder = Math.floor(n % 1000);
  const centavos = Math.round((n % 1) * 100);

  if (thousands > 0) {
    if (thousands === 1) words += 'MIL ';
    else words += getHundreds(thousands) + ' MIL ';
  }
  
  words += getHundreds(remainder);
  
  return `${words.trim()}, ${centavos.toString().padStart(2, '0')}/100 DOLARES`.toUpperCase();
}

export interface PDFClientInfo {
  name: string;
  ruc?: string;
  address?: string;
  phone?: string;
  email?: string;
  date?: Date;
}

export interface PDFItem {
  quantity: string | number;
  code?: string;
  description: string;
  unitPrice: number;
  discountPct?: number;
  total: number;
}

export interface PDFTotals {
  subtotal: number;
  subtotal0: number;
  subtotal15: number;
  discountTotal: number;
  ivaAmount: number;
  totalAmount: number;
}

export interface PDFConfig {
  docType: 'COTIZACIÓN' | 'PRESUPUESTO';
  docId: string | number;
  notes?: string;
  action?: 'save' | 'preview' | 'blob' | 'instance';
  sellerName?: string;
  optionalSection?: {
    title: string;
    description: string;
    imageBase64: string;
    image2Base64?: string;
  };
}

export function generateProfessionalPDF(
  client: PDFClientInfo,
  items: any[],
  totals: PDFTotals | number,
  config: PDFConfig
) {
  // Normalize totals
  let finalTotals: PDFTotals;
  if (typeof totals === 'number') {
    const subtotal = totals;
    const ivaRate = 0.15; // Standard IVA in Ecuador
    const ivaAmount = subtotal * ivaRate;
    const totalAmount = subtotal + ivaAmount;

    finalTotals = {
      subtotal: subtotal,
      subtotal0: 0,
      subtotal15: subtotal,
      discountTotal: 0,
      ivaAmount: ivaAmount,
      totalAmount: totalAmount
    };
  } else {
    finalTotals = totals;
  }

  // Normalize items for the table
  const pdfItems = items.map(item => ({
    quantity: item.quantity,
    code: item.code || 'S/C',
    description: item.description || item.name || '',
    unitPrice: item.unitPrice || item.estimatedCost || 0,
    total: item.total || (Number(item.quantity === 'GLOBAL' ? 1 : item.quantity) * (item.unitPrice || item.estimatedCost || 0))
  }));
  const doc = new jsPDF();
  const accentColor = ALL_BLUE;
  
  // --- 1. HEADER & LOGO ---
  addAllHeader(
    doc, 
    `${config.docType} Nº: ${config.docId}`, 
    'ALL CRM & MANAGEMENT'
  );

  // --- 2. CLIENT DATA BLOCK (Rounded Box) ---


  // (Header drawn by addAllHeader called below)

  // --- 2. CLIENT DATA BLOCK (Rounded Box) ---
  doc.setDrawColor(0);
  doc.roundedRect(15, 50, 180, 22, 3, 3); 
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Cliente:', 18, 56);
  doc.text('Dirección:', 18, 62);
  doc.text('Fecha de Emisión:', 18, 68);
  
  doc.setFont('helvetica', 'normal');
  doc.text((client.name || '').toUpperCase(), 35, 56);
  doc.text((client.address || 'SN').toUpperCase(), 35, 62);
  doc.text(formatToEcuador(client.date || new Date(), { day: '2-digit', month: '2-digit', year: 'numeric' }), 45, 68);

  // Right columns of Client Box
  doc.setFont('helvetica', 'bold');
  doc.text('R.U.C:', 140, 56);
  doc.text('TELEF:', 140, 62);
  
  doc.setFont('helvetica', 'normal');
  doc.text(client.ruc || '0000000000001', 155, 56);
  doc.text(client.phone || 'S/N', 155, 62);

  // --- 3. PRODUCTS TABLE ---
  let head, body, columnStyles;

  if (config.docType === 'PRESUPUESTO') {
    head = [['ITEM', 'DESCRIPCION', 'CANTIDAD', 'P/UNITARIO', 'TOTAL']];
    body = pdfItems.map((item, idx) => [
      idx + 1,
      item.description.toUpperCase(),
      item.quantity === 'GLOBAL' ? 'GLOBAL' : Number(item.quantity).toFixed(2),
      Number(item.unitPrice).toFixed(2),
      Number(item.total).toFixed(2)
    ]);
    columnStyles = {
      0: { halign: 'center' as const, cellWidth: 15 },
      1: { halign: 'left' as const },
      2: { halign: 'center' as const, cellWidth: 25 },
      3: { halign: 'right' as const, cellWidth: 25 },
      4: { halign: 'right' as const, cellWidth: 25 },
    };
  } else {
    head = [['Cantidad', 'Nombre Producto', 'P.Unit.', 'Desc%', 'Total.']];
    body = pdfItems.map((item) => [
      item.quantity === 'GLOBAL' ? 'GLOBAL' : Number(item.quantity).toFixed(2),
      item.description.toUpperCase(),
      Number(item.unitPrice).toFixed(4),
      Number(0).toFixed(3),
      Number(item.total).toFixed(4)
    ]);
    columnStyles = {
      0: { halign: 'center' as const, cellWidth: 20 },
      1: { halign: 'left' as const },
      2: { halign: 'right' as const, cellWidth: 25 },
      3: { halign: 'right' as const, cellWidth: 20 },
      4: { halign: 'right' as const, cellWidth: 25 },
    };
  }

  autoTable(doc, {
    startY: 75,
    head: head,
    body: body,
    theme: 'grid',
    styles: { fontSize: 9, textColor: 0, cellPadding: 1, lineColor: [0, 0, 0], lineWidth: 0.1 },
    headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold', halign: 'center', lineWidth: 0.2 },
    columnStyles: columnStyles,
    margin: { left: 15, right: 15, top: 60, bottom: 25 }, // Margen inferior de seguridad
    didDrawPage: (data) => {
      if (data.pageNumber > 1) {
        addAllHeader(
          doc, 
          `${config.docType} Nº: ${config.docId}`, 
          'ALL CRM & MANAGEMENT'
        );
      }
    }
  });
  
  const pageHeight = doc.internal.pageSize.getHeight();
  let finalY = (doc as any).lastAutoTable.finalY + 5;
  const totalsBlockHeight = 65; // Espacio necesario para Observaciones + Cuadro Totales + Letras + Firmas

  // --- Verificación de Espacio para el Bloque de Cierre ---
  if (finalY + totalsBlockHeight > pageHeight - 10) {
    doc.addPage();
    addAllHeader(
      doc, 
      `${config.docType} Nº: ${config.docId}`, 
      'ALL CRM & MANAGEMENT'
    );
    finalY = 65; // Empieza después del logo en la nueva hoja
  }

  // --- 4. WORDS & TOTALS ---
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  
  const notesStr = 'Observaciones: ' + (config.notes || 'NINGUNA');
  const splitNotes = doc.splitTextToSize(notesStr, 110);
  doc.text(splitNotes, 15, finalY);
  
  const wordsText = 'SON: ' + numberToSpanishWords(Number(finalTotals.totalAmount));
  const nextY = finalY + (splitNotes.length * 3.5) + 2;
  const splitWords = doc.splitTextToSize(wordsText, 105);
  
  doc.setFont('helvetica', 'bold');
  doc.text(splitWords, 15, nextY);
  
  const endOfTextY = nextY + (splitWords.length * 3.5);

  // --- Totals Box (Rounded) ---
  const totalsX = 132;
  let currentY = finalY;
  
  doc.setDrawColor(0);
  doc.roundedRect(totalsX, finalY - 3, 63, 35, 3, 3); 
  
  const totalLines = [
    ['Subtotal:', finalTotals.subtotal],
    ['Descuentos:', finalTotals.discountTotal],
    ['Subtotal TARIFA 0%:', finalTotals.subtotal0],
    ['Subtotal TARIFA 15%:', finalTotals.subtotal15],
    ['15% IVA:', finalTotals.ivaAmount],
    ['TOTAL A PAGAR $:', finalTotals.totalAmount]
  ];

  totalLines.forEach(([label, value], idx) => {
    const isTotal = idx === totalLines.length - 1;
    doc.setFont('helvetica', isTotal ? 'bold' : 'normal');
    doc.setFontSize(isTotal ? 10 : 9);
    doc.text(label.toString(), totalsX + 3, currentY + 2);
    
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.roundedRect(173, currentY - 2, 21, 5, 1, 1);
    
    doc.text(Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 193, currentY + 1.5, { align: 'right' });
    currentY += 5.5;
  });

  // Branding below totals
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text('VisualFAC 11 - NSIM CIA LTDA', totalsX + 5, currentY + 1);
  
  // --- 5. FOOTER SIGNATURES ---
  let sigY = Math.max(currentY + 18, endOfTextY + 12);
  
  // Verificación final para firmas (por si notas son excepcionalmente largas)
  if (sigY + 20 > pageHeight - 10) {
    doc.addPage();
    addAllHeader(doc, `${config.docType} Nº: ${config.docId}`, 'ALL CRM & MANAGEMENT');
    sigY = 65;
  }
  
  doc.setFontSize(7);
  doc.setDrawColor(0);
  doc.line(40, sigY, 90, sigY);
  doc.line(125, sigY, 175, sigY);
  doc.text('Firma Cliente', 65, sigY + 4, { align: 'center' });
  doc.text('Firma Autorizada', 150, sigY + 4, { align: 'center' });
  
  doc.setFont('helvetica', 'bold');
  doc.text('**Gracias por preferirnos**', 105, sigY + 14, { align: 'center' });

  // --- 6. OPTIONAL SECTION ---
  if (config.optionalSection && (config.optionalSection.title || config.optionalSection.imageBase64)) {
    let optY = sigY + 25;
    
    if (optY + 60 > pageHeight - 10) {
      doc.addPage();
      addAllHeader(doc, `${config.docType} Nº: ${config.docId}`, 'ALL CRM & MANAGEMENT');
      optY = 65;
    }

    if (config.optionalSection.title) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(ALL_BLUE[0], ALL_BLUE[1], ALL_BLUE[2]);
      doc.text(config.optionalSection.title.toUpperCase(), 105, optY, { align: 'center' });
      doc.setTextColor(0);
      optY += 6;
    }
    
    if (config.optionalSection.description) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const splitDesc = doc.splitTextToSize(config.optionalSection.description, 160);
      doc.text(splitDesc, 105, optY, { align: 'center' });
      optY += (splitDesc.length * 4.5);
    }

    if (config.optionalSection.imageBase64 || config.optionalSection.image2Base64) {
      try {
        const hasBoth = config.optionalSection.imageBase64 && config.optionalSection.image2Base64;
        const imgWidth = hasBoth ? 88 : 120;
        const imgHeight = hasBoth ? 55 : 75;
        
        if (hasBoth) {
           // Render side by side
           doc.addImage(config.optionalSection.imageBase64, 'JPEG', 15, optY + 2, imgWidth, imgHeight);
           doc.addImage(config.optionalSection.image2Base64!, 'JPEG', 107, optY + 2, imgWidth, imgHeight);
        } else {
           // Render single centered large
           const imgX = (210 - imgWidth) / 2;
           const targetImg = config.optionalSection.imageBase64 || config.optionalSection.image2Base64;
           if (targetImg) doc.addImage(targetImg, 'JPEG', imgX, optY + 2, imgWidth, imgHeight);
        }
      } catch (e) {
        console.error("Error adding optional images to PDF", e);
      }
    }
  }

  // --- 6. FILENAME LOGIC ---
  const sanitize = (text: string) => text.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_').replace(/_+/g, '_');
  
  const rawClientName = client.name || '';
  const isCF = !rawClientName || 
               rawClientName.toUpperCase().includes('CONSUMIDOR FINAL') || 
               rawClientName.toUpperCase().includes('CLIENTE PARTICULAR');
               
  const clientPrefix = isCF ? 'CF' : sanitize(rawClientName);
  const sellerSuffix = sanitize(config.sellerName || 'ALL');
  
  const fileName = `${clientPrefix}_${sellerSuffix}.pdf`;

  if (config.action === 'preview') {
    const blobUrl = doc.output('bloburl');
    return blobUrl;
  } else if (config.action === 'blob') {
    return doc.output('blob');
  } else if (config.action === 'instance') {
    return doc;
  } else {
    doc.save(fileName);
  }
}

/**
 * Generates a professional Project Report PDF (Chat + Expenses)
 * Used by field operators for offline/online parity.
 */
export function generateProjectReportPDF(data: {
  project: any;
  clientName: string;
  address: string;
  chat: any[];
  expenses: any[];
}) {
  const { project, clientName, address, chat, expenses } = data;
  const doc = new jsPDF();
  
  // 1. Header with custom project title
  addAllHeader(doc, 'REPORTE DE OBRA', `PROYECTO: ${project.title}`);
  
  // 2. Project Summary Box
  doc.setDrawColor(200);
  doc.roundedRect(15, 45, 180, 25, 2, 2);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Información del Proyecto:', 20, 52);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Cliente: ${clientName || 'N/A'}`, 20, 58);
  doc.text(`Dirección: ${address || 'N/A'}`, 20, 64);
  doc.text(`Fecha Reporte: ${formatToEcuador(new Date(), { day: '2-digit', month: '2-digit', year: 'numeric' })}`, 130, 58);
  doc.text(`ID: #${project.id}`, 130, 64);

  // 3. Chat de Campo Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(ALL_BLUE[0], ALL_BLUE[1], ALL_BLUE[2]);
  doc.text('CHAT DE CAMPO', 15, 82);

  const chatBody = chat.map(msg => [
    formatToEcuador(msg.createdAt, { 
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit' 
    }),
    msg.userName || 'Sistema',
    msg.content || (msg.media?.length ? '[MULTIMEDIA]' : '-'),
    msg.isPending ? 'OFFLINE' : 'SINC.'
  ]);

  autoTable(doc, {
    startY: 87,
    head: [['Fecha/Hora', 'Usuario', 'Descripción', 'Estado']],
    body: chatBody,
    theme: 'grid',
    headStyles: { fillColor: ALL_BLUE, textColor: 255 },
    styles: { fontSize: 8 },
    margin: { left: 15, right: 15, top: 60, bottom: 25 },
    didDrawPage: (data) => {
      if (data.pageNumber > 1) {
        addAllHeader(doc, 'REPORTE DE OBRA', `PROYECTO: ${project.title}`);
      }
    }
  });

  // 4. Gastos Table
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('GASTOS Y EGRESOS', 15, finalY);

  let totalExpenses = 0;
  const expensesBody = expenses.map(exp => {
    totalExpenses += Number(exp.amount);
    return [
      formatToEcuador(exp.date, { day: '2-digit', month: '2-digit', year: 'numeric' }),
      exp.description,
      `$ ${Number(exp.amount).toFixed(2)}`,
      exp.isPending ? 'PEND.' : 'SINC.'
    ];
  });

  autoTable(doc, {
    startY: finalY + 5,
    head: [['Fecha', 'Descripción', 'Monto', 'Estado']],
    body: expensesBody,
    theme: 'grid',
    headStyles: { fillColor: [100, 100, 100], textColor: 255 },
    styles: { fontSize: 8 },
    foot: [['', 'TOTAL ACUMULADO:', `$ ${totalExpenses.toFixed(2)}`, '']],
    footStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' },
    margin: { left: 15, right: 15, top: 60, bottom: 25 },
    didDrawPage: (data) => {
      if (data.pageNumber > 1) {
        addAllHeader(doc, 'REPORTE DE OBRA', `PROYECTO: ${project.title}`);
      }
    }
  });

  doc.save(`Reporte_Obra_${project.id}_${new Date().getTime()}.pdf`);
}
