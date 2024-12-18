interface RefundStore {
    fetchAllRefunds: () => void;
    fetchRefundById: (id: number) => void;
}