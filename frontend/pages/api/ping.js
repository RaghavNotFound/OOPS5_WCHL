export default function handler(req, res) {
  const canister = process.env.CANISTER_ID_VERICHAIN_BACKEND || process.env.NEXT_PUBLIC_CANISTER_ID_VERICHAIN_BACKEND || null;
  res.status(200).json({
    message: "ICP backend (placeholder proxy) alive",
    canisterId: canister,
  });
}
