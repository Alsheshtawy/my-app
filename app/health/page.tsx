import { Suspense } from "react";

async function HealthData() {
  let status = "down";
  let data: unknown = null;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (res.ok) {
      status = "ok";
      data = await res.json();
    }
  } catch {
    status = "down";
  }

  return (
    <div className="rounded-card border border-line p-4">
      <p>
        Status:{" "}
        <strong className={status === "ok" ? "text-green-600" : "text-red-600"}>
          {status}
        </strong>
      </p>
      <pre className="mt-3 overflow-x-auto text-sm">
        {data ? JSON.stringify(data, null, 2) : "No data returned"}
      </pre>
    </div>
  );
}

export default function HealthPage() {
  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-8">
      <h1 className="mb-4 text-2xl font-semibold text-foreground">Health check</h1>
      <Suspense fallback={<p className="text-muted">Checking...</p>}>
        <HealthData />
      </Suspense>
    </main>
  );
}
