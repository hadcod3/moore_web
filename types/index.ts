// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
    created_at: number
    updated_at: number
    isVendor: boolean

}
export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}
export type GetAllUsersAsVendorsParams = {
    query: string
    category: string
    limit: number
    page: number
}
// export type Vendor = {
//     clerkId: string
//     username: string
//     photo: string
// }


// ====== CATEGORY PARAMS
export type CreatePacketCategoryParams = {
    packetCategoryName: string
}
export type CreateProductCategoryParams = {
    productCategoryName: string
}
export type CreateGearCategoryParams = {
    gearCategoryName: string
}
export type CreateVendorCategoryParams = {
    vendorCategoryName: string
}
// ====== ORDER PARAMS
export type CheckoutOrderParams = {
    itemTitle: string
    itemId: string
    price: number
    buyerId: string
    amount: number
}
export type CreateOrderParams = {
    stripeId: string
    itemId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
}
export type GetOrdersByPacketParams = {
    eventId: string
    searchString: string
}
export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
}
  
// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
} 
export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}  
export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// ====== PACKET PARAMS
export type CreatePacketParams = {
    userId: string
    packet: {
      title: string
      description: string
      imageUrl: string
      price: string
      categoryId: string
    }
    path: string
}
export type UpdatePacketParams = {
    userId: string
    packet: {
      _id: string
      title: string
      imageUrl: string
      description: string
      categoryId: string
      price: string
    }
    path: string
}
export type DeletePacketParams = {
    packetId: string
    path: string
}
export type GetAllPacketsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type GetPacketsByUserParams = {
    userId: string
    limit?: number
    page: number
}
export type GetRelatedPacketsByCategoryParams = {
    categoryId: string
    packetId: string
    limit?: number
    page: number | string
}
export type Packet = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    organizer: {
        _id: string
        firstName: string
        lastName: string
    }
    category: {
        _id: string
        name: string
    }
}

// ====== PRODUCT PARAMS
export type CreateProductParams = {
    userId: string
    product: {
        title: string
        description: string
        imageUrl: string
        price: string
        stock: string
        categoryId: string
    }
    path: string
}
export type UpdateProductParams = {
    userId: string
    product: {
        _id: string
        title: string
        imageUrl: string
        description: string
        categoryId: string
        price: string
        stock: string
    }
    path: string
}
export type DeleteProductParams = {
    productId: string
    path: string
}
export type GetAllProductsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type GetProductsByUserParams = {
    userId: string
    limit?: number
    page: number
}
export type GetRelatedProductsByCategoryParams = {
    categoryId: string
    productId: string
    limit?: number
    page: number | string
}
export type Product = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    stock: string
    organizer: {
        _id: string
        firstName: string
        lastName: string
    }
    category: {
        _id: string
        name: string
    }
}

// ====== GEAR PARAMS
export type CreateGearParams = {
    userId: string
    gear: {
        title: string
        description: string
        imageUrl: string
        price: string
        stock: string
        categoryId: string
    }
    path: string
}
export type UpdateGearParams = {
    userId: string
    gear: {
        _id: string
        title: string
        imageUrl: string
        description: string
        categoryId: string
        price: string
        stock: string
    }
    path: string
}
export type DeleteGearParams = {
    gearId: string
    path: string
}
export type GetAllGearsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type GetGearsByUserParams = {
    userId: string
    limit?: number
    page: number
}
export type GetRelatedGearsByCategoryParams = {
    categoryId: string
    gearId: string
    limit?: number
    page: number | string
}
export type Gear = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    stock: string
    organizer: {
        _id: string
        firstName: string
        lastName: string
    }
    category: {
      _id: string
      name: string
    }


}

// ===== VENDOR PARAMS
export type CreateVendorPermitParams = {
    _id: string
    isVendor: boolean

}

// ==========================================================================

export type GetItemsByTypeIdParams = {
    typeId: string;
    query: string;
    category: string;
    limit: number;
    page: number;
}
// export type GetAllPacketsParams = {
//     query: string
//     category: string
//     limit: number
//     page: number
// }

export type GetOrdersByItemParams = {
    eventId: string
    searchString: string
}