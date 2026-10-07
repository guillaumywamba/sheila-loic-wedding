"use client";

import type { RsvpSubmission } from "@/types/site";
import { useMemo } from "react";

type Props = {
  rsvps: RsvpSubmission[];
  loading: boolean;
  onRefresh: () => void;
};

export function RsvpMonitoring({ rsvps, loading, onRefresh }: Props) {
  const stats = useMemo(() => {
    const present = rsvps.filter((r) => r.attendance === "present").length;
    const absent = rsvps.filter((r) => r.attendance === "absent").length;
    const total = rsvps.length;
    return {
      total,
      present,
      absent,
      presentPct: total ? Math.round((present / total) * 100) : 0,
      absentPct: total ? Math.round((absent / total) * 100) : 0,
    };
  }, [rsvps]);

  async function downloadExcel() {
    const res = await fetch("/api/rsvp/export");
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rsvp-invites-sheila-loic.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-primary">Monitoring RSVP</h2>
          <p className="text-sm text-muted">
            Statistiques des réponses et export des invités
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5 disabled:opacity-60"
          >
            {loading ? "Actualisation..." : "Actualiser"}
          </button>
          <button
            type="button"
            onClick={() => void downloadExcel()}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Télécharger Excel
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Total réponses
          </p>
          <p className="mt-2 font-display text-4xl text-foreground">
            {stats.total}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
            Présents
          </p>
          <p className="mt-2 font-display text-4xl text-emerald-900">
            {stats.present}
          </p>
          <p className="mt-1 text-sm text-emerald-800">{stats.presentPct}%</p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
            Absents
          </p>
          <p className="mt-2 font-display text-4xl text-rose-900">
            {stats.absent}
          </p>
          <p className="mt-1 text-sm text-rose-800">{stats.absentPct}%</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-primary/10 text-xs uppercase text-primary">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Présence</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    Aucune réponse pour le moment.
                  </td>
                </tr>
              ) : (
                rsvps.map((r) => (
                  <tr key={r.id} className="border-t border-black/5">
                    <td className="whitespace-nowrap px-4 py-3">
                      {new Date(r.createdAt).toLocaleString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">{r.fullName}</td>
                    <td className="px-4 py-3">{r.phone}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          r.attendance === "present"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {r.attendance === "present"
                          ? "Présent(e)"
                          : "Absent(e)"}
                      </span>
                    </td>
                    <td className="max-w-xs px-4 py-3">{r.message ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
