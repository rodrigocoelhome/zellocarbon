export default function FailurePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
      <h1 className="text-2xl font-bold text-red-700">❌ Pagamento recusado!</h1>
      <p className="mt-4 text-gray-600">Houve um problema com seu pagamento. Tente novamente mais tarde.</p>
    </div>
  );
}
