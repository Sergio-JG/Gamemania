export interface Game {
    gameId?: string;
    title: string;
    price: number;
    discountedPrice?: number;
    description: string;
    releaseDate: string;
    numberOfSales: number;
    totalScore?: number;
    image?: string;
    stock: number;
    discount?: number;
    genres: Genre[];
    platforms: Platform[];
    reviews?: Review[];
}

export interface CartItem {
    gameId: string;
    title: string;
    discountedPrice: number;
    price: number;
    quantity: number;
    platform: Platform;
    image?: string;
    stock: number;
    discount: number;
}

export interface Account {

    accountId: string;
    providerId: string;
    provider: Provider;
    accountHolderName: string;
    accountName: string;
    bankName: string;
    bankAddress: string;
    bankRoutingNumber: string;
    accountBalance: string;
}

export interface Provider {

    providerId?: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    account?: Account | null;
}

export interface Genre {
    genreId: string;
    name: string;
}

export interface Platform {
    platformId: string;
    name: string;
}

export interface Review {
    reviewId: string;
    userId: string;
    username: string;
    profilePic: string;
    gameId: string;
    score: number;
    comment: string;
}

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
    profilePic: string;
    password: string;
    social: Social;
    role: Role;
    address: Address;
    creditCard: CreditCard;
}

export interface Social {
    socialId: string;
    steamUrl: string;
    twitchUrl: string;
    youtubeUrl: string;
    discordTag: string;
}

export interface Role {
    roleId: string;
    name: string;
}

export interface Address {
    addressId: string;
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
}

export interface CreditCard {
    creditCardId: string;
    userId: string;
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
    billingAddress: string;
}

export interface SaleDetail {
    unitPrice: string;
    gameName: string;
    sale_detail_id?: string;
    sale_id?: string;
    game: Game;
    quantity: number | null;
    subtotal: number | null;
}

export interface Sale {
    saleId: string;
    firstName: string;
    secondName: string;
    saleDate: string;
    totalAmount: number;
    saleDetail: SaleDetail[];
}

export interface PurchaseDetail {
    unitPrice: string;
    gameName: string;
    purchaseDetailId?: string;
    saleId?: string;
    game: Game;
    quantity: number | null;
    subtotal: number | null;
}

export interface Purchase {
    purchaseId: string;
    firstName: string;
    secondName: string;
    purchaseDate: string | null;
    totalAmount: number | null;
    purchaseDetail: PurchaseDetail[];
}

export default CartItem