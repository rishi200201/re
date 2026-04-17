/**
 * useAnalyticsData — reads computed analytics from localStorage and
 * auto-refreshes every 5 seconds so the dashboard stays live as the
 * user browses the site in other tabs.
 */

import { useState, useEffect, useCallback } from "react";
import { getAnalyticsData } from "../lib/analytics";

export function useAnalyticsData() {
  const [data, setData] = useState(() => getAnalyticsData());

  const refresh = useCallback(() => setData(getAnalyticsData()), []);

  useEffect(() => {
    const id = setInterval(refresh, 5000);
    return () => clearInterval(id);
  }, [refresh]);

  // Also refresh on window focus — catches views from other tabs immediately
  useEffect(() => {
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  return data;
}
