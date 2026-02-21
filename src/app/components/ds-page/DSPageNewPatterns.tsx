/**
 * Section 20 — New M3 Patterns (feat-018)
 *
 * Interactive showcase of the 5 new DS components:
 *   DSDialog, DSProgressBar, DSSkeleton, DSTabs, DSBadge
 *
 * feat-126: FigmaExportPanel moved to DevTools — removed from here.
 */

import { useState, type ReactNode } from "react";
import {
  Check, AlertTriangle, Info,
  BarChart3, Edit3, Table2,
} from "lucide-react";
import { DS } from "../design-system";
import { DSDialog } from "../ds/DSDialog";
import { DSProgressBar } from "../ds/DSProgressBar";
import { DSSkeleton } from "../ds/DSSkeleton";
import { DSTabs, type DSTabItem } from "../ds/DSTabs";
import { DSBadge } from "../ds/DSBadge";
import { ForceDarkProvider, ForceLightProvider } from "../ds/ThemeContext";
import {
  SectionHeader, SubLabel, Panel,
} from "./helpers";

/* ================================================================== */
/* Helpers                                                              */
/* ================================================================== */

function DemoCard({ title, children, dark }: { title: string; children: ReactNode; dark: boolean }) {
  return (
    <div
      className="p-4"
      style={{
        backgroundColor: dark ? DS.BG_ELEVATED : DS.ON_LIGHT_BG,
        border: dark ? `${DS.BORDER_WIDTH_THIN} solid ${DS.BORDER_DEFAULT}` : DS.BRUTALIST_BORDER_THIN,
      }}
    >
      <SubLabel dark={dark}>{title}</SubLabel>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
  );
}

/* ================================================================== */
/* C20a — Dialog Demo                                                   */
/* ================================================================== */

function DialogDemo({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <DemoCard title="C20a · DSDialog" dark={dark}>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 font-mono font-bold uppercase"
        style={{
          fontSize: DS.FONT_SMALL,
          backgroundColor: DS.ACCENT,
          color: DS.TEXT_INVERSE,
          border: `${DS.BORDER_WIDTH_MEDIUM} solid ${DS.ACCENT}`,
        }}
      >
        Apri Dialog
      </button>
      <DSDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Conferma Azione"
        description="Questa operazione non può essere annullata. Vuoi procedere con l'export?"
      >
        <p
          className="font-sans mt-2"
          style={{ fontSize: DS.FONT_BASE, color: dark ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_SECONDARY }}
        >
          Il file verrà generato e scaricato automaticamente.
        </p>
        <DSDialog.Actions>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1.5 font-mono font-bold uppercase"
            style={{
              fontSize: DS.FONT_SMALL,
              backgroundColor: "transparent",
              color: dark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
              border: `${DS.BORDER_WIDTH_REGULAR} solid ${dark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
            }}
          >
            Annulla
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1.5 font-mono font-bold uppercase"
            style={{
              fontSize: DS.FONT_SMALL,
              backgroundColor: DS.ACCENT,
              color: DS.TEXT_INVERSE,
              border: `${DS.BORDER_WIDTH_REGULAR} solid ${DS.ACCENT}`,
            }}
          >
            Conferma
          </button>
        </DSDialog.Actions>
      </DSDialog>
      <p className="font-mono" style={{ fontSize: DS.FONT_SMALL, color: dark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}>
        Slot-based: title, description, children, Actions.
        Motion spring entrance. Escape / backdrop close.
      </p>
    </DemoCard>
  );
}

/* ================================================================== */
/* C20b — ProgressBar Demo                                              */
/* ================================================================== */

function ProgressBarDemo({ dark }: { dark: boolean }) {
  const [val, setVal] = useState(65);
  return (
    <DemoCard title="C20b · DSProgressBar" dark={dark}>
      <div className="space-y-4">
        <DSProgressBar value={val} label="Avanzamento" showLabel />
        <DSProgressBar value={val} color="success" showLabel />
        <DSProgressBar value={val} color="warning" showLabel />
        <DSProgressBar value={val} color="info" showLabel />
        <DSProgressBar indeterminate label="Indeterminate" />
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="flex-1"
          />
          <span className="font-mono font-bold" style={{ fontSize: DS.FONT_SMALL, color: dark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG }}>
            {val}%
          </span>
        </div>
      </div>
    </DemoCard>
  );
}

/* ================================================================== */
/* C20c — Skeleton Demo                                                 */
/* ================================================================== */

function SkeletonDemo({ dark }: { dark: boolean }) {
  return (
    <DemoCard title="C20c · DSSkeleton" dark={dark}>
      <div className="space-y-3">
        <DSSkeleton variant="text" width="80%" />
        <DSSkeleton variant="text" width="60%" />
        <DSSkeleton variant="text" width="90%" />
        <div className="flex gap-3 items-start mt-3">
          <DSSkeleton variant="circle" width={40} />
          <div className="flex-1 space-y-2">
            <DSSkeleton variant="text" width="40%" />
            <DSSkeleton variant="text" width="70%" />
          </div>
        </div>
        <DSSkeleton variant="block" height={80} />
        <DSSkeleton variant="card" />
      </div>
    </DemoCard>
  );
}

/* ================================================================== */
/* C20d — Tabs Demo                                                     */
/* ================================================================== */

function TabsDemo({ dark }: { dark: boolean }) {
  const [tab1, setTab1] = useState("overview");
  const [tab2, setTab2] = useState("overview");
  const [tab3, setTab3] = useState("overview");

  const items: DSTabItem[] = [
    { value: "overview", label: "Overview", icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { value: "editor", label: "Editor", icon: <Edit3 className="w-3.5 h-3.5" />, badge: 3 },
    { value: "table", label: "Table", icon: <Table2 className="w-3.5 h-3.5" /> },
    { value: "disabled", label: "Disabled", disabled: true },
  ];

  return (
    <DemoCard title="C20d · DSTabs — 3 varianti" dark={dark}>
      <div className="space-y-4">
        <div>
          <span className="font-mono font-bold uppercase" style={{ fontSize: DS.FONT_NANO, color: dark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}>
            Underline
          </span>
          <DSTabs items={items} value={tab1} onChange={setTab1} variant="underline" />
        </div>
        <div>
          <span className="font-mono font-bold uppercase" style={{ fontSize: DS.FONT_NANO, color: dark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}>
            Filled
          </span>
          <DSTabs items={items} value={tab2} onChange={setTab2} variant="filled" />
        </div>
        <div>
          <span className="font-mono font-bold uppercase" style={{ fontSize: DS.FONT_NANO, color: dark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}>
            Segmented
          </span>
          <DSTabs items={items} value={tab3} onChange={setTab3} variant="segmented" />
        </div>
      </div>
    </DemoCard>
  );
}

/* ================================================================== */
/* C20e — Badge Demo                                                    */
/* ================================================================== */

function BadgeDemo({ dark }: { dark: boolean }) {
  const [tags, setTags] = useState(["Draft", "Review", "Urgente"]);
  return (
    <DemoCard title="C20e · DSBadge — 5 intents × 3 sizes" dark={dark}>
      <div className="space-y-3">
        {/* Intent row — outlined */}
        <div className="flex flex-wrap gap-2">
          <DSBadge intent="default">Default</DSBadge>
          <DSBadge intent="accent">Accent</DSBadge>
          <DSBadge intent="success" icon={<Check className="w-3 h-3" />}>Success</DSBadge>
          <DSBadge intent="warning" icon={<AlertTriangle className="w-3 h-3" />}>Warning</DSBadge>
          <DSBadge intent="info" icon={<Info className="w-3 h-3" />}>Info</DSBadge>
        </div>
        {/* Intent row — filled */}
        <div className="flex flex-wrap gap-2">
          <DSBadge intent="default" filled>Default</DSBadge>
          <DSBadge intent="accent" filled>Accent</DSBadge>
          <DSBadge intent="success" filled icon={<Check className="w-3 h-3" />}>Success</DSBadge>
          <DSBadge intent="warning" filled icon={<AlertTriangle className="w-3 h-3" />}>Warning</DSBadge>
          <DSBadge intent="info" filled icon={<Info className="w-3 h-3" />}>Info</DSBadge>
        </div>
        {/* Size row */}
        <div className="flex flex-wrap items-center gap-2">
          <DSBadge intent="accent" size="sm">SM</DSBadge>
          <DSBadge intent="accent" size="md">MD</DSBadge>
          <DSBadge intent="accent" size="lg">LG</DSBadge>
        </div>
        {/* Dismissible */}
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <DSBadge key={t} intent="info" onDismiss={() => setTags((prev) => prev.filter((x) => x !== t))}>
              {t}
            </DSBadge>
          ))}
          {tags.length === 0 && (
            <button
              onClick={() => setTags(["Draft", "Review", "Urgente"])}
              className="font-mono font-bold uppercase"
              style={{ fontSize: DS.FONT_SMALL, color: DS.ACCENT }}
            >
              Reset tags
            </button>
          )}
        </div>
      </div>
    </DemoCard>
  );
}

/* ================================================================== */
/* Exported Section (Dark + Light)                                      */
/* ================================================================== */

export function DSPageNewPatterns({ dark }: { dark?: boolean }) {
  return (
    <section>
      <div className="px-5 pt-10 pb-4">
        <SectionHeader
          num="07.7"
          category="Components"
          title="New M3 Patterns"
          desc="5 nuovi componenti DS (Dialog, ProgressBar, Skeleton, Tabs, Badge)."
          dark={dark}
        />
      </div>

      {/* Theme-adaptive showcase — Force*Provider ensures DS components read correct isDark */}
      <Panel dark={dark}>
        {dark ? (
          <ForceDarkProvider>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DialogDemo dark />
              <ProgressBarDemo dark />
              <TabsDemo dark />
              <BadgeDemo dark />
              <SkeletonDemo dark />
            </div>
          </ForceDarkProvider>
        ) : (
          <ForceLightProvider>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DialogDemo dark={false} />
              <ProgressBarDemo dark={false} />
              <TabsDemo dark={false} />
              <BadgeDemo dark={false} />
              <SkeletonDemo dark={false} />
            </div>
          </ForceLightProvider>
        )}
      </Panel>
    </section>
  );
}