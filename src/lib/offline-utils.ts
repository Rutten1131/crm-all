/**
 * utilidades para el sistema de sincronización offline de Aquatech
 */

/**
 * Prepara un archivo para guardarse en IndexedDB de la forma más eficiente.
 * Archivos < 3MB se guardan en base64 para simplicidad.
 * Archivos > 3MB se guardan como ArrayBuffer (binario puro) para evitar el overhead del 33% de base64.
 */
export async function prepareFileForOutbox(file: File): Promise<{
  data: string | ArrayBuffer;
  storageType: 'base64' | 'arraybuffer';
  filename: string;
  mimeType: string;
  size: number;
}> {
  const THRESHOLD = 3 * 1024 * 1024; // 3MB
  
  if (file.size <= THRESHOLD) {
    // Archivos pequeños → base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    return { 
      data: base64, 
      storageType: 'base64', 
      filename: file.name, 
      mimeType: file.type, 
      size: file.size 
    };
  } else {
    // Archivos grandes → ArrayBuffer
    const buffer = await file.arrayBuffer();
    return { 
      data: buffer, 
      storageType: 'arraybuffer', 
      filename: file.name, 
      mimeType: file.type, 
      size: file.size 
    };
  }
}

/**
 * Genera un SyncId único para asegurar idempotencia en el servidor.
 */
export function generateSyncId(): string {
  return `sync_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}
