export interface PurchaseOrder {
  id: string
  amount: number
  createdAt: string
}

const mockPOs: PurchaseOrder[] = [
  { id: 'PO123455', amount: 135185, createdAt: '2026-02-16T08:30:00Z' },
  { id: 'PO123456', amount: 243510, createdAt: '2026-02-16T09:15:00Z' },
  { id: 'PO123454', amount: 15200, createdAt: '2026-02-15T11:45:00Z' },
  { id: 'PO123453', amount: 8900, createdAt: '2026-02-14T13:20:00Z' },
  { id: 'PO123452', amount: 8900, createdAt: '2026-02-14T14:00:00Z' }
];

const getLatestPO = () => {
  return [...mockPOs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )[0];
};

export const useMockPO = () => {
  const getPOById = (id: string) =>
    mockPOs.find(po => po.id === id);

  const getAllPO = () => mockPOs;

  return { getPOById, getAllPO, getLatestPO };
};