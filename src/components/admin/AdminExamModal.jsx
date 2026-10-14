import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { Save, AlertCircle } from "lucide-react";

export const AdminExamModal = ({
  isOpen,
  onClose,
  onSave,
  examToEdit
}) => {
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    category: "Civil Services",
    conductingBody: "",
    shortDesc: "",
    difficultyLevel: "High",
    averagePrepTime: "12 Months",
    education: "",
    ageLimit: "",
    attempts: "",
    prelimsDate: "",
    mainsDate: "",
    isTentative: true,
    officialWebsite: "",
    fee: "₹100",
  });

  useEffect(() => {
    if (examToEdit) {
      setFormData({
        name: examToEdit.name || "",
        fullName: examToEdit.fullName || "",
        category: examToEdit.category || "Civil Services",
        conductingBody: examToEdit.conductingBody || "",
        shortDesc: examToEdit.shortDesc || "",
        difficultyLevel: examToEdit.difficultyLevel || "High",
        averagePrepTime: examToEdit.averagePrepTime || "12 Months",
        education: examToEdit.eligibility?.education || "",
        ageLimit: examToEdit.eligibility?.ageLimit || "",
        attempts: examToEdit.eligibility?.attempts || "",
        prelimsDate: examToEdit.importantDates?.prelimsDate || "",
        mainsDate: examToEdit.importantDates?.mainsDate || "",
        isTentative: examToEdit.importantDates?.isTentative ?? true,
        officialWebsite: examToEdit.applicationInfo?.officialWebsite || "",
        fee: examToEdit.applicationInfo?.fee || "₹100",
      });
    } else {
      setFormData({
        name: "",
        fullName: "",
        category: "Civil Services",
        conductingBody: "",
        shortDesc: "",
        difficultyLevel: "High",
        averagePrepTime: "12 Months",
        education: "",
        ageLimit: "",
        attempts: "",
        prelimsDate: "",
        mainsDate: "",
        isTentative: true,
        officialWebsite: "",
        fee: "₹100",
      });
    }
  }, [examToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const examPayload = {
      id: examToEdit ? examToEdit.id : formData.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: formData.name,
      fullName: formData.fullName || formData.name,
      category: formData.category,
      conductingBody: formData.conductingBody,
      shortDesc: formData.shortDesc,
      difficultyLevel: formData.difficultyLevel,
      averagePrepTime: formData.averagePrepTime,
      eligibility: {
        education: formData.education,
        ageLimit: formData.ageLimit,
        nationality: "Indian Citizen",
        attempts: formData.attempts,
      },
      importantDates: {
        prelimsDate: formData.prelimsDate,
        mainsDate: formData.mainsDate,
        isTentative: Boolean(formData.isTentative),
        officialNoticeNote: formData.isTentative
          ? "Tentative schedule. Confirm with official gazette notification."
          : "Verified official notification schedule.",
      },
      applicationInfo: {
        fee: formData.fee,
        portal: formData.officialWebsite,
        officialWebsite: formData.officialWebsite,
      },
      selectionProcess: examToEdit?.selectionProcess || [
        { stage: "Preliminary Exam", details: "Objective screening test." },
        { stage: "Main Exam / Interview", details: "Descriptive examination and personality assessment." }
      ],
      syllabus: examToEdit?.syllabus || {
        prelims: ["General Studies", "Aptitude & Reasoning"],
        mains: ["Core Subject Knowledge", "Essay & Descriptive Paper"]
      },
      tags: [formData.category, formData.name]
    };

    onSave(examPayload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={examToEdit ? "Edit Competitive Exam" : "Add New Competitive Exam"}
      subtitle="Publish exam syllabus, eligibility criteria & verified dates"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Short Exam Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. UPSC CSE, SSC CGL"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
            >
              <option value="Civil Services">Civil Services</option>
              <option value="SSC">Staff Selection Commission (SSC)</option>
              <option value="Banking">Banking (IBPS / SBI)</option>
              <option value="Railways">Indian Railways (RRB)</option>
              <option value="Defence">Defence (CDS / NDA / AFCAT)</option>
              <option value="State PSC">State Public Service Commission</option>
              <option value="Engineering & GATE">Engineering & GATE</option>
              <option value="Undergraduate Professional">Undergraduate (NEET / JEE)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Full Exam Title
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Union Public Service Commission - Civil Services Examination"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Conducting Body
            </label>
            <input
              type="text"
              value={formData.conductingBody}
              onChange={(e) => setFormData({ ...formData, conductingBody: e.target.value })}
              placeholder="e.g. UPSC, SSC, IBPS"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Official Portal URL
            </label>
            <input
              type="url"
              value={formData.officialWebsite}
              onChange={(e) => setFormData({ ...formData, officialWebsite: e.target.value })}
              placeholder="https://upsc.gov.in"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Short Description & Scope
          </label>
          <textarea
            rows={2}
            value={formData.shortDesc}
            onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
            placeholder="Brief overview of roles, departments and posts recruited through this exam..."
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="border-t border-slate-200 pt-3 space-y-3">
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Eligibility & Dates
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Education Required</label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="e.g. Graduation in any discipline"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Age Limits</label>
              <input
                type="text"
                value={formData.ageLimit}
                onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value })}
                placeholder="e.g. 21 to 32 Years"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Attempt Limits</label>
              <input
                type="text"
                value={formData.attempts}
                onChange={(e) => setFormData({ ...formData, attempts: e.target.value })}
                placeholder="e.g. General: 6, OBC: 9"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Next Prelims / Exam Date</label>
              <input
                type="text"
                value={formData.prelimsDate}
                onChange={(e) => setFormData({ ...formData, prelimsDate: e.target.value })}
                placeholder="e.g. May 24, 2026"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="tentativeCheck"
                checked={formData.isTentative}
                onChange={(e) => setFormData({ ...formData, isTentative: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <label htmlFor="tentativeCheck" className="text-xs font-semibold text-slate-700">
                Mark as Tentative (Follows Official Notice Policy)
              </label>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            {examToEdit ? "Update Exam" : "Create Exam"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
