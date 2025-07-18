import { NextRequest, NextResponse } from "next/server";
import { strapiAPI } from "@/lib/strapi";
import { ApiResponse } from "@/lib/types";

/**
 * GET /api/products/[id]
 * Retrieve a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      const errorResponse: ApiResponse<null> = {
        data: null,
        errors: [
          {
            code: "INVALID_PRODUCT_ID",
            message: "معرف المنتج غير صحيح",
          },
        ],
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0",
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Fetch product from Strapi
    const product = await strapiAPI.getProduct(parseInt(id), [
      "images",
      "category",
      "reviews.customer",
    ]);

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

    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error("Product Fetch Error:", error);

    // Check if it's a not found error
    if (error.message.includes("not found") || error.status === 404) {
      const notFoundResponse: ApiResponse<null> = {
        data: null,
        errors: [
          {
            code: "PRODUCT_NOT_FOUND",
            message: "المنتج غير موجود",
          },
        ],
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0",
        },
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    const errorResponse: ApiResponse<null> = {
      data: null,
      errors: [
        {
          code: "PRODUCT_FETCH_ERROR",
          message: "فشل في جلب المنتج",
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
 * PUT /api/products/[id]
 * Update a product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      const errorResponse: ApiResponse<null> = {
        data: null,
        errors: [
          {
            code: "INVALID_PRODUCT_ID",
            message: "معرف المنتج غير صحيح",
          },
        ],
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0",
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Prepare update data
    const updateData: any = {};

    if (body.name) updateData.name = body.name;
    if (body.arabicName) updateData.arabicName = body.arabicName;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.arabicDescription !== undefined)
      updateData.arabicDescription = body.arabicDescription;
    if (body.price !== undefined) updateData.price = parseFloat(body.price);
    if (body.originalPrice !== undefined)
      updateData.originalPrice = parseFloat(body.originalPrice);
    if (body.inventory !== undefined)
      updateData.inventory = parseInt(body.inventory);
    if (body.sku) updateData.sku = body.sku;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.isOnSale !== undefined) updateData.isOnSale = body.isOnSale;
    if (body.salePercentage !== undefined)
      updateData.salePercentage = parseInt(body.salePercentage);
    if (body.categoryId) updateData.category = body.categoryId;

    // Update product in Strapi
    const product = await strapiAPI.updateProduct(parseInt(id), updateData);

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

    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error("Product Update Error:", error);

    // Check if it's a not found error
    if (error.message.includes("not found") || error.status === 404) {
      const notFoundResponse: ApiResponse<null> = {
        data: null,
        errors: [
          {
            code: "PRODUCT_NOT_FOUND",
            message: "المنتج غير موجود",
          },
        ],
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0",
        },
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    const errorResponse: ApiResponse<null> = {
      data: null,
      errors: [
        {
          code: "PRODUCT_UPDATE_ERROR",
          message: "فشل في تحديث المنتج",
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
 * DELETE /api/products/[id]
 * Delete a product
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      const errorResponse: ApiResponse<null> = {
        data: null,
        errors: [
          {
            code: "INVALID_PRODUCT_ID",
            message: "معرف المنتج غير صحيح",
          },
        ],
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0",
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Delete product from Strapi
    await strapiAPI.deleteProduct(parseInt(id));

    const apiResponse: ApiResponse<{ deleted: boolean }> = {
      data: { deleted: true },
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    };

    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error("Product Delete Error:", error);

    // Check if it's a not found error
    if (error.message.includes("not found") || error.status === 404) {
      const notFoundResponse: ApiResponse<null> = {
        data: null,
        errors: [
          {
            code: "PRODUCT_NOT_FOUND",
            message: "المنتج غير موجود",
          },
        ],
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0",
        },
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    const errorResponse: ApiResponse<null> = {
      data: null,
      errors: [
        {
          code: "PRODUCT_DELETE_ERROR",
          message: "فشل في حذف المنتج",
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
