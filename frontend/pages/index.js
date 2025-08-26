export default function Home({ canisterId }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, textAlign: "center" }}>
      <h1>Verichain Frontend (Fixed)</h1>
      <p>Build-ready Next.js project. This page shows the backend canister id (if provided at build/deploy):</p>
      <pre style={{ background: "#f4f4f4", padding: 12, borderRadius: 8 }}>
        {canisterId ? canisterId : "CANISTER ID not provided"}
      </pre>
    </div>
  );
}

export async function getServerSideProps() {
  // Try to read environment var set by dfx post-build (CANISTER_ID_VERICHAIN_BACKEND)
  return {
    props: {
      canisterId: process.env.CANISTER_ID_VERICHAIN_BACKEND || process.env.NEXT_PUBLIC_CANISTER_ID_VERICHAIN_BACKEND || null,
    },
  };
}
