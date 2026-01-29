const STORAGE_KEY = 'scanner_usage';
const MAX_USES = 999; // Temporarily unlimited for testing
const COOLDOWN_MS = 60 * 60 * 1000; // 60 minutes

interface UsageData {
  count: number;
  pausedAt: number | null;
}

function getUsageData(): UsageData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return { count: 0, pausedAt: null };
}

function setUsageData(data: UsageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
}

export function checkScannerLimit(): { allowed: boolean; remainingUses: number; minutesUntilReset: number | null } {
  const data = getUsageData();
  
  // Check if we're in a cooldown period
  if (data.pausedAt) {
    const elapsed = Date.now() - data.pausedAt;
    if (elapsed >= COOLDOWN_MS) {
      // Cooldown expired, reset usage
      setUsageData({ count: 0, pausedAt: null });
      return { allowed: true, remainingUses: MAX_USES, minutesUntilReset: null };
    }
    
    // Still in cooldown
    const remainingMs = COOLDOWN_MS - elapsed;
    const remainingMinutes = Math.ceil(remainingMs / 60000);
    return { allowed: false, remainingUses: 0, minutesUntilReset: remainingMinutes };
  }
  
  // Check remaining uses
  const remainingUses = MAX_USES - data.count;
  return { allowed: remainingUses > 0, remainingUses, minutesUntilReset: null };
}

export function recordScannerUse(): void {
  const data = getUsageData();
  const newCount = data.count + 1;
  
  if (newCount >= MAX_USES) {
    // Start cooldown period
    setUsageData({ count: newCount, pausedAt: Date.now() });
  } else {
    setUsageData({ count: newCount, pausedAt: null });
  }
}
