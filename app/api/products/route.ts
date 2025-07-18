import { NextRequest, NextResponse } from "next/server";
import { strapiAPI } from "@/lib/strapi";
import { ApiResponse, PaginationParams } from "@/lib/types";

/**
 * GET /api/products
 * Retrieve products with filtering, sorting, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "12");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const isOnSale = searchParams.get("isOnSale");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");

    // Build Strapi query parameters
    const strapiParams: any = {
      page,
      pageSize,
      populate: ["images", "category", "reviews"],
    };

    // Add search filter
    if (search) {
      strapiParams.search = search;
    }

    // Add category filter
    if (category && category !== "all") {
      strapiParams.category = category;
    }

    // Add sale filter
    if (isOnSale === "true") {
      strapiParams.isOnSale = true;
    }

    // Add stock filter
    if (inStock === "true") {
      // This would need to be implemented in Strapi
      strapiParams.inStock = true;
    }

    // Fetch products from Strapi
    const response = await strapiAPI.getProducts(strapiParams);

    // Transform response to match our API format
    const apiResponse: ApiResponse<any[]> = {
      data: response.data.map((product) => ({
        id: product.id,
        ...product.attributes,
      })),
      meta: {
        pagination: response.meta.pagination,
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error("Products API Error:", error);

    const errorResponse: ApiResponse<null> = {
      data: null,
      errors: [
        {
          code: "PRODUCTS_FETCH_ERROR",
          message: "فشل في جلب المنتجات",
          details: {
            originalError: error.message,
          },
        },
      ],
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * POST /api/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["name", "arabicName", "price", "categoryId"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      const errorResponse: ApiResponse<null> = {
        data: null,
        errors: [
          {
            code: "VALIDATION_ERROR",
            message: "حقول مطلوبة مفقودة",
            details: {
              missingFields,
            },
          },
        ],
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0",
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Create product in Strapi
    const product = await strapiAPI.createProduct({
      name: body.name,
      arabicName: body.arabicName,
      description: body.description,
      arabicDescription: body.arabicDescription,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice
        ? parseFloat(body.originalPrice)
        : undefined,
      inventory: parseInt(body.inventory) || 0,
      sku: body.sku || `PROD-${Date.now()}`,
      isActive: body.isActive !== false,
      isOnSale: body.isOnSale || false,
      salePercentage: body.salePercentage
        ? parseInt(body.salePercentage)
        : undefined,
      category: body.categoryId,
    });

    const apiResponse: ApiResponse<any> = {
      data: {
        id: product.data.id,
        ...product.data.attributes,
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(apiResponse, { status: 201 });
  } catch (error) {
    console.error("Product Creation Error:", error);

    const errorResponse: ApiResponse<null> = {
      data: null,
      errors: [
        {
          code: "PRODUCT_CREATION_ERROR",
          message: "فشل في إنشاء المنتج",
          details: {
            originalError: error.message,
          },
        },
      ],
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
