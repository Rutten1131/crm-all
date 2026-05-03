import { useState, useEffect } from 'react';
import { db } from '@/lib/db';

/**
 * Hook para monitorear el estado del outbox y mostrar indicadores de sincronización en la UI.
 */
export function useOutboxStatus() {
  const [pending, setPending] = useState(0);
  const [failed, setFailed] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const all = await db.outbox.toArray();
        setPending(all.filter(i => i.status === 'pending').length);
        setFailed(all.filter(i => i.status === 'failed').length);
        setSyncing(all.filter(i => i.status === 'syncing').length > 0);
      } catch (err) {
        console.warn('[useOutboxStatus] Error checking outbox:', err);
      }
    };

    check();
    const interval = setInterval(check, 5000);

    // Escuchar eventos personalizados que el SW o la app podrían disparar
    const handleSyncChange = () => check();
    window.addEventListener('aquatech-sync-finished', handleSyncChange);
    window.addEventListener('aquatech-item-synced', handleSyncChange);
    window.addEventListener('online', handleSyncChange);
    
    // Escuchar mensajes del Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'SYNC_COMPLETE' || event.data?.type === 'UPLOAD_PROGRESS' || event.data?.type === 'ITEM_DEAD') {
          check();
        }
      });
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('aquatech-sync-finished', handleSyncChange);
      window.removeEventListener('aquatech-item-synced', handleSyncChange);
      window.removeEventListener('online', handleSyncChange);
    };
  }, []);

  return { pending, failed, syncing, total: pending + failed };
}
