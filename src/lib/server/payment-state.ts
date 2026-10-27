/** Convert Dodo's current payment record into access state, never a stale event snapshot.
 * Full refunds are terminal; partial refunds alone retain lifetime access.
 * https://docs.dodopayments.com/api-reference/payments/get-payments-1
 */
export type PaymentRecord = {
  payment_id: string; status?: string | null; refund_status?: string | null;
  metadata: Record<string, unknown>; product_cart?: { product_id: string }[] | null;
  total_amount: number; currency: string;
  refunds: { status: string; amount?: number | null; currency?: string | null }[];
};
export function paymentState(payment: PaymentRecord, productId: string) {
  const userId = payment.metadata.user_id;
  if (typeof userId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) return null;
  if (!payment.product_cart?.some(item => item.product_id === productId)) return null;
  const refunded = payment.refunds.filter(r => r.status === 'succeeded' && r.currency === payment.currency)
    .reduce((sum, r) => sum + (r.amount ?? 0), 0);
  const revoked = payment.refund_status === 'full' || (payment.total_amount > 0 && refunded >= payment.total_amount);
  return { userId, revoked, eligible: payment.status === 'succeeded' && !revoked };
}
