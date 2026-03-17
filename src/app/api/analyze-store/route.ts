import { NextRequest, NextResponse } from "next/server";

interface ShopifyVariant {
  price: string;
}

interface ShopifyProduct {
  title: string;
  product_type: string;
  tags: string;
  variants: ShopifyVariant[];
}

function normalizeUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  return url;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shopifyUrl } = body as { shopifyUrl?: string };

    if (!shopifyUrl || typeof shopifyUrl !== "string") {
      return NextResponse.json(
        { error: "shopifyUrl is required" },
        { status: 400 }
      );
    }

    const baseUrl = normalizeUrl(shopifyUrl);

    let res: Response;
    try {
      res = await fetch(`${baseUrl}/products.json?limit=20`, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      return NextResponse.json(
        { error: "Unable to fetch store data" },
        { status: 502 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: "Unable to fetch store data" },
        { status: 502 }
      );
    }

    let data: { products?: ShopifyProduct[] };
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid response from store" },
        { status: 502 }
      );
    }

    const products = data.products ?? [];

    const titles = products.slice(0, 10).map((p) => p.title);

    const categoriesSet = new Set<string>();
    const tagsSet = new Set<string>();

    for (const p of products) {
      if (p.product_type) categoriesSet.add(p.product_type);
      if (p.tags) {
        for (const tag of p.tags.split(",")) {
          const t = tag.trim();
          if (t) tagsSet.add(t);
        }
      }
    }

    const allPrices = products.flatMap((p) =>
      p.variants.map((v) => parseFloat(v.price)).filter((n) => !isNaN(n) && n > 0)
    );

    const avgPrice =
      allPrices.length > 0
        ? Math.round((allPrices.reduce((a, b) => a + b, 0) / allPrices.length) * 100) / 100
        : 0;

    let priceRange: string;
    if (avgPrice < 30) priceRange = "budget";
    else if (avgPrice <= 80) priceRange = "mid-range";
    else priceRange = "premium";

    return NextResponse.json({
      success: true,
      products: titles,
      categories: [...categoriesSet],
      tags: [...tagsSet].slice(0, 30),
      avgPrice,
      priceRange,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
