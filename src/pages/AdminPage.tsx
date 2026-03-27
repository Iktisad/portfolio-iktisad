import { useState, useEffect } from "react";
import portfolioData from "../data/data.json";
import AdminSidebar from "../components/admin/AdminSidebar";
import SectionView from "../components/admin/SectionView";
import EditModal from "../components/admin/EditModal";
import type { ProfileData, SectionKey, SectionItem } from "../components/admin/types";

const API_BASE = import.meta.env.VITE_API_URL;

const defaultData: ProfileData = portfolioData as ProfileData;

export default function AdminPage() {
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (!isLocalhost) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-500 text-sm">
        Access restricted to localhost.
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [data, setData] = useState<ProfileData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("experiences");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<SectionKey | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/data`)
      .then((r) => r.json())
      .then((json) => setData({ ...defaultData, ...json }))
      .catch(() => {});
  }, []);

  function openEdit(section: SectionKey, index: number) {
    setEditingSection(section);
    setEditingIndex(index);
    setModalOpen(true);
  }

  function openAdd(section: SectionKey) {
    setEditingSection(section);
    setEditingIndex(null);
    setModalOpen(true);
  }

  function handleModalSave(section: SectionKey, item: SectionItem) {
    setData((prev) => {
      const list = [...(prev[section] as SectionItem[])];
      if (editingIndex !== null) {
        list[editingIndex] = item;
      } else {
        list.push(item);
      }
      return { ...prev, [section]: list };
    });
    setModalOpen(false);
  }

  function handleInlineSave(section: SectionKey, item: SectionItem, index: number) {
    setData((prev) => {
      const list = [...(prev[section] as SectionItem[])];
      list[index] = item;
      return { ...prev, [section]: list };
    });
  }

  function handleDelete(section: SectionKey, index: number) {
    setData((prev) => ({
      ...prev,
      [section]: (prev[section] as SectionItem[]).filter((_, i) => i !== index),
    }));
  }

  async function handleSave() {
    setLoading(true);
    setSaveStatus("idle");
    setStatusMessage(null);
    try {
      const res = await fetch(`${API_BASE}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSaveStatus("success");
      setStatusMessage("Saved successfully!");
    } catch {
      setSaveStatus("error");
      setStatusMessage("Save failed. Is the API server running?");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaveStatus("idle");
        setStatusMessage(null);
      }, 4000);
    }
  }

  const editingItem =
    editingSection !== null && editingIndex !== null
      ? (data[editingSection] as SectionItem[])[editingIndex]
      : null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-slate-50 to-white">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSave={handleSave}
        loading={loading}
        saveStatus={saveStatus}
        statusMessage={statusMessage}
      />

      <main className="ml-56 flex-1 p-8 min-h-screen overflow-y-auto">
        <SectionView
          sectionKey={activeSection}
          items={data[activeSection] as SectionItem[]}
          onEdit={(idx) => openEdit(activeSection, idx)}
          onAdd={() => openAdd(activeSection)}
          onDelete={(idx) => handleDelete(activeSection, idx)}
          onInlineSave={handleInlineSave}
        />
      </main>

      <EditModal
        isOpen={modalOpen}
        sectionKey={editingSection}
        item={editingItem}
        onSave={handleModalSave}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
