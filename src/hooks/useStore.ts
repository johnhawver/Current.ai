"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export interface StoreRecord {
  id: string;
  user_id: string;
  store_name: string;
  shopify_url?: string;
  email?: string;
}

interface UseStoreResult {
  user: ReturnType<typeof useUser>["user"];
  isSignedIn: boolean | undefined;
  store: StoreRecord | null;
  loading: boolean;
  refetch: () => void;
}

async function getUserStore(userId: string): Promise<StoreRecord | null> {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;
  return data as StoreRecord;
}

export function useStore(): UseStoreResult {
  const { user, isSignedIn, isLoaded } = useUser();
  const [store, setStore] = useState<StoreRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStore = useCallback(async () => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setStore(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const record = await getUserStore(user.id);
    setStore(record);

    if (record) {
      localStorage.setItem(
        "store",
        JSON.stringify({
          email: record.email ?? user.primaryEmailAddress?.emailAddress ?? "",
          shopifyUrl: record.shopify_url ?? "",
          storeName: record.store_name,
        })
      );
    }

    setLoading(false);
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  return {
    user: user ?? null,
    isSignedIn,
    store,
    loading,
    refetch: fetchStore,
  };
}
