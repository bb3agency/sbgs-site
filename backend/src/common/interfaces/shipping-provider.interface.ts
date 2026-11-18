import { AppError } from '@common/errors/app-error';
import { ERROR_CODES } from '@common/errors/error-codes';

export type CreateShipmentInput = {
  orderNumber: string;
  amountRupees: number;
  /** Product subtotal before shipping/discount (rupees). Falls back to amountRupees when omitted. */
  subtotalRupees?: number;
  shippingChargeRupees?: number;
  discountRupees?: number;
  destinationPincode: string;
  originPincode: string;
  totalWeightGrams: number;
  paymentMode: 'Prepaid' | 'COD';
  sellerGstTin: string;
  hsnCode: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
  };
  /** Store contact email used when customer email is absent (Shiprocket requires billing_email). */
  storeContactEmail?: string;
  items?: Array<{
    name: string;
    sku: string;
    quantity: number;
    /** Per-unit selling price in rupees (after line-level discounts). */
    unitPriceRupees: number;
    hsnCode?: string;
  }>;
  courierCompanyId?: number;
  dimensions?: {
    lengthCm: number;
    breadthCm: number;
    heightCm: number;
  };
  /**
   * Resume token for providers that book in more than one call.
   *
   * Shiprocket creates the order/shipment in `/orders/create/adhoc` and only then
   * assigns an AWB in `/courier/assign/awb`. When the second call fails (empty wallet,
   * pickup address not activated, route unserviceable) the first has already created a
   * real, billable shipment. Passing that shipment id back on a retry skips order
   * creation and resumes at AWB assignment, instead of creating a duplicate order on
   * every attempt and orphaning the previous one. Ignored by single-call providers.
   */
  existingProviderShipmentId?: string;
};

/**
 * Thrown when a provider created a shipment but could not complete booking (no AWB).
 *
 * It carries the provider-side ids so the caller can persist them and resume the
 * booking later rather than starting over. Extends AppError so existing
 * error-code/status handling is unchanged.
 */
export class ShipmentBookingIncompleteError extends AppError {
  constructor(
    message: string,
    readonly providerIds: {
      shiprocketOrderId?: string | undefined;
      shiprocketShipmentId?: string | undefined;
    }
  ) {
    super(ERROR_CODES.INTERNAL_ERROR, message, 422);
    this.name = 'ShipmentBookingIncompleteError';
  }
}

export type CreateShipmentResult = {
  awbNumber: string;
  trackingUrl?: string;
  estimatedDays?: number;
  providerPayload: Record<string, unknown>;
  shiprocketOrderId?: string;
  shiprocketShipmentId?: string;
  courierName?: string;
  labelUrl?: string;
};

export type TrackShipmentResult = {
  status: string;
  events: Array<{
    status: string;
    location?: string;
    description: string;
    occurredAt?: string;
  }>;
  providerPayload: Record<string, unknown>;
};

export type ServiceabilityResult = {
  pincode: string;
  serviceable: boolean;
  providerPayload: Record<string, unknown>;
};

export type DeliveryRateInput = {
  destinationPincode: string;
  originPincode: string;
  totalWeightGrams: number;
  /** When COD, adapters quote COD freight instead of prepaid. */
  paymentMode?: 'COD' | 'PREPAID';
};

export type CourierOption = {
  courierCompanyId: number;
  courierName: string;
  shippingChargePaise: number;
  estimatedDays: number;
  estimatedDeliveryDate?: string;
};

export type DeliveryRateResult = {
  shippingChargePaise: number;
  estimatedDays: number;
  courierName?: string;
  courierCompanyId?: number;
  estimatedDeliveryDate?: string;
  availableCouriers?: CourierOption[];
  providerPayload: Record<string, unknown>;
};

export type SchedulePickupResult = {
  scheduled: boolean;
  pickupScheduledDate?: string;
  pickupTokenNumber?: string;
  /**
   * True when the provider reports a pickup is already arranged for this
   * warehouse/shipment (e.g. an earlier open pickup request that will collect
   * this AWB too). The action succeeded — the shipment is covered — even though
   * no new pickup slot was created. Pickup is warehouse-level, not per-order.
   */
  alreadyScheduled?: boolean;
  providerPayload: Record<string, unknown>;
};

export type GenerateLabelResult = {
  /** Direct URL to the label PDF (Shiprocket). Mutually exclusive with labelHtml. */
  labelUrl?: string;
  /** Self-contained HTML label page (Delhivery). Mutually exclusive with labelUrl. */
  labelHtml?: string;
  providerPayload: Record<string, unknown>;
};

export interface ShippingProviderAdapter {
  createShipment(input: CreateShipmentInput): Promise<CreateShipmentResult>;
  trackShipment(awbNumber: string): Promise<TrackShipmentResult>;
  cancelShipment(awbNumber: string): Promise<{ cancelled: boolean; providerPayload: Record<string, unknown> }>;
  checkServiceability(pincode: string, originPincode?: string): Promise<ServiceabilityResult>;
  calculateDeliveryRate(input: DeliveryRateInput): Promise<DeliveryRateResult>;
  schedulePickup?(shiprocketShipmentId: string): Promise<SchedulePickupResult>;
  generateLabel?(shiprocketShipmentId: string): Promise<GenerateLabelResult>;
}
