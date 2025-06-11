"use client";

export default function Error({
  error: _error,
  reset: _reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-white">
      <h2>Something went wrong!</h2>
    </div>
  );
}
