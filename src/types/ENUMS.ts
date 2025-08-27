export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum Provider {
  LOCAL = "local",
  GOOGLE = "google",
  FACEBOOK = "facebook",
  GITHUB = "github",
}

export enum TripStatus {
  SCHEDULED = "scheduled",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum SeatStatus {
  AVAILABLE = "available",
  HELD = "held",
  BOOKED = "booked",
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  EXPIRED = "expired",
}

export enum PaymentStatus {
  INITIATED = "initiated",
  SUCCESS = "success",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum PaymentMethod {
  CARD = "card",
  WALLET = "wallet",
  BANK_TRANSFER = "bank_transfer",
  COD = "cod",
}
