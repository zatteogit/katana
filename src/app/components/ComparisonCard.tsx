import {
  Check,
  X,
  Plus,
  AlertTriangle,
  Crosshair,
  EyeOff,
} from "lucide-react";
import type {
  AnalysisEntry,
  OverlayZone,
  Status,
} from "./analysis-data";

const statusConfig: Record<
  Status,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    icon: React.ReactNode;
  }
> = {
  ok: {
    label: "OK",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: <Check className="w-3.5 h-3.5" />,
  },
  mismatch: {
    label: "Mismatch",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: <X className="w-3.5 h-3.5" />,
  },
  new_component: {
    label: "Nuovo",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    icon: <Plus className="w-3.5 h-3.5" />,
  },
  new_variant: {
    label: "Nuova Variante",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: <Plus className="w-3.5 h-3.5" />,
  },
  focus_add: {
    label: "Focus da aggiungere",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: <Crosshair className="w-3.5 h-3.5" />,
  },
};

function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} ${cfg.border} border`}
      style={{ fontSize: "11px" }}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function DimCell({
  label,
  w,
  h,
  highlight,
}: {
  label: string;
  w: number | null;
  h: number | null;
  highlight?: boolean;
}) {
  if (w === null || h === null) {
    return (
      <div className="text-center">
        <div
          className="text-muted-foreground"
          style={{ fontSize: "10px" }}
        >
          {label}
        </div>
        <div
          className="text-muted-foreground"
          style={{ fontSize: "12px" }}
        >
          —
        </div>
      </div>
    );
  }
  return (
    <div className="text-center">
      <div
        className="text-muted-foreground"
        style={{ fontSize: "10px" }}
      >
        {label}
      </div>
      <div
        className={highlight ? "text-red-600" : ""}
        style={{ fontSize: "13px", fontFamily: "monospace" }}
      >
        {w}×{h}
      </div>
    </div>
  );
}

function FocusCell({
  label,
  focus,
}: {
  label: string;
  focus: { x: number; y: number; w: number; h: number } | null;
}) {
  return (
    <div className="text-center">
      <div
        className="text-muted-foreground"
        style={{ fontSize: "10px" }}
      >
        {label}
      </div>
      {focus ? (
        <div
          style={{ fontSize: "11px", fontFamily: "monospace" }}
        >
          {focus.x},{focus.y} {focus.w}×{focus.h}
        </div>
      ) : (
        <div
          className="text-muted-foreground"
          style={{ fontSize: "12px" }}
        >
          —
        </div>
      )}
    </div>
  );
}

function OverlayZoneTag({ zone }: { zone: OverlayZone }) {
  const isText = zone.t === "text";
  return (
    <div
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${
        isText
          ? "bg-yellow-50 border-yellow-300 text-yellow-800"
          : "bg-pink-50 border-pink-300 text-pink-800"
      }`}
      style={{ fontSize: "10px", fontFamily: "monospace" }}
    >
      <EyeOff className="w-2.5 h-2.5 opacity-60" />
      <span className="opacity-70">{zone.l}</span>
      <span>
        {zone.x},{zone.y} {zone.w}×{zone.h}
      </span>
    </div>
  );
}

function MiniPreview({ entry }: { entry: AnalysisEntry }) {
  const maxBoxW = 140;
  const maxBoxH = 70;
  const scale = Math.min(
    maxBoxW / entry.figmaW,
    maxBoxH / entry.figmaH,
  );
  const w = Math.round(entry.figmaW * scale);
  const h = Math.round(entry.figmaH * scale);

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: maxBoxW, height: maxBoxH }}
    >
      <div
        className="relative border border-slate-300 bg-slate-100 rounded-sm overflow-hidden"
        style={{ width: w, height: h }}
      >
        {/* Overlay zones (drawn UNDER focus) */}
        {entry.figmaOverlays.map((oz, i) => {
          const isText = oz.t === "text";
          return (
            <div
              key={`oz-${i}`}
              className={`absolute ${
                isText
                  ? "bg-amber-400/25 border border-dashed border-amber-500/60"
                  : "bg-red-400/25 border border-dashed border-red-500/60"
              }`}
              style={{
                left: `${(oz.x / entry.figmaW) * 100}%`,
                top: `${(oz.y / entry.figmaH) * 100}%`,
                width: `${(oz.w / entry.figmaW) * 100}%`,
                height: `${(oz.h / entry.figmaH) * 100}%`,
              }}
            />
          );
        })}
        {/* Focus area */}
        {entry.figmaFocus && (
          <div
            className="absolute bg-green-400/25 border-2 border-green-500/70"
            style={{
              left: `${(entry.figmaFocus.x / entry.figmaW) * 100}%`,
              top: `${(entry.figmaFocus.y / entry.figmaH) * 100}%`,
              width: `${(entry.figmaFocus.w / entry.figmaW) * 100}%`,
              height: `${(entry.figmaFocus.h / entry.figmaH) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}

function PreviewLegend({ entry }: { entry: AnalysisEntry }) {
  const hasItems =
    entry.figmaFocus || entry.figmaOverlays.length > 0;
  if (!hasItems) return null;

  return (
    <div
      className="flex items-center gap-3 flex-wrap"
      style={{ fontSize: "10px" }}
    >
      {entry.figmaFocus && (
        <span className="inline-flex items-center gap-1 text-green-700">
          <span className="w-2 h-2 rounded-sm bg-green-500/30 border-2 border-green-500/70" />
          Area Focus (f)
        </span>
      )}
      {entry.figmaOverlays.some((o) => o.t === "text") && (
        <span className="inline-flex items-center gap-1 text-amber-700">
          <span className="w-2 h-2 rounded-sm bg-amber-500/30 border border-dashed border-amber-500/70" />
          Area Testi (oz)
        </span>
      )}
      {entry.figmaOverlays.some((o) => o.t === "badge") && (
        <span className="inline-flex items-center gap-1 text-red-700">
          <span
            className="w-2 h-2 rounded-sm bg-red-500/30 border border-dashed border-red-500/70"
            style={{ borderWidth: "2px" }}
          />
          Area Loghi (oz)
        </span>
      )}
    </div>
  );
}

export function ComparisonCard({
  entry,
}: {
  entry: AnalysisEntry;
}) {
  const hasDimMismatch =
    entry.configW !== null &&
    entry.configH !== null &&
    (entry.configW !== entry.figmaW ||
      entry.configH !== entry.figmaH);

  return (
    <div
      className={`rounded-lg border p-4 ${
        entry.status === "ok"
          ? "border-slate-200 bg-white"
          : entry.status === "mismatch"
            ? "border-red-200 bg-red-50/30"
            : entry.status === "new_component" ||
                entry.status === "new_variant"
              ? "border-violet-200 bg-violet-50/20"
              : "border-blue-200 bg-blue-50/20"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              style={{
                fontSize: "13px",
                fontFamily: "monospace",
              }}
              className="text-slate-800 truncate"
            >
              {entry.figmaFrame}
            </span>
            <StatusBadge status={entry.status} />
            {entry.figmaOverlays.length > 0 && (
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700"
                style={{ fontSize: "10px" }}
              >
                <EyeOff className="w-3 h-3" />
                {entry.figmaOverlays.length} oz
              </span>
            )}
          </div>
          {entry.configComponent && (
            <div
              className="text-muted-foreground"
              style={{ fontSize: "12px" }}
            >
              {entry.configComponent}
              {entry.configVariant && (
                <> &rarr; {entry.configVariant}</>
              )}
              {entry.configAssetLabel && (
                <span className="text-slate-500">
                  {" "}
                  ({entry.configAssetLabel})
                </span>
              )}
            </div>
          )}
        </div>
        <MiniPreview entry={entry} />
      </div>

      {/* Dimensions + Focus comparison */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 p-2.5 bg-slate-50 rounded-md">
        <DimCell
          label="Figma"
          w={entry.figmaW}
          h={entry.figmaH}
        />
        <DimCell
          label="Config attuale"
          w={entry.configW}
          h={entry.configH}
          highlight={hasDimMismatch}
        />
        <FocusCell
          label="Focus Figma"
          focus={entry.figmaFocus}
        />
        <FocusCell
          label="Focus Config"
          focus={entry.configFocus}
        />
      </div>

      {/* Overlay zones */}
      {entry.figmaOverlays.length > 0 && (
        <div className="mb-3 p-2.5 bg-amber-50/50 border border-amber-100 rounded-md">
          <div
            className="text-amber-800 mb-1.5 flex items-center gap-1.5"
            style={{ fontSize: "11px" }}
          >
            <EyeOff className="w-3 h-3" />
            Overlay Zones (oz) rilevate
          </div>
          <div className="flex flex-wrap gap-1.5">
            {entry.figmaOverlays.map((oz, i) => (
              <OverlayZoneTag key={i} zone={oz} />
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <PreviewLegend entry={entry} />

      {/* Changes */}
      {entry.changes.length > 0 && (
        <div className="space-y-1 mt-2">
          {entry.changes.map((change, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-slate-700"
              style={{ fontSize: "12px" }}
            >
              <AlertTriangle
                className={`w-3 h-3 mt-0.5 flex-shrink-0 ${
                  entry.status === "mismatch"
                    ? "text-red-500"
                    : entry.status === "new_component" ||
                        entry.status === "new_variant"
                      ? "text-violet-500"
                      : "text-blue-500"
                }`}
              />
              <span>{change}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}