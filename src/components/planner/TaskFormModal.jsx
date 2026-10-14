import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { PlusCircle, Clock, Calendar, CheckSquare } from "lucide-react";

export const TaskFormModal = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit
}) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Polity");
  const [duration, setDuration] = useState(60);
  const [deadline, setDeadline] = useState(new Date().toISOString().split("T")[0]);
  const [priority, setPriority] = useState("High");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setSubject(taskToEdit.subject || "Polity");
      setDuration(taskToEdit.duration || 60);
      setDeadline(taskToEdit.deadline || new Date().toISOString().split("T")[0]);
      setPriority(taskToEdit.priority || "High");
    } else {
      setTitle("");
      setSubject("Polity");
      setDuration(60);
      setDeadline(new Date().toISOString().split("T")[0]);
      setPriority("High");
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: taskToEdit?.id,
      title: title.trim(),
      subject,
      duration: Number(duration),
      deadline,
      priority,
      completed: taskToEdit ? taskToEdit.completed : false,
      completedAt: taskToEdit ? taskToEdit.completedAt : null,
    });

    onClose();
  };

  const subjectsList = [
    "Polity & Constitution",
    "History & Culture",
    "Geography & Environment",
    "Economy & Development",
    "Quantitative Aptitude",
    "Reasoning Ability",
    "English Comprehension",
    "General Science & Tech",
    "Current Affairs",
    "Core Engineering / Technical",
    "Mock Test & Analysis"
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? "Edit Study Task" : "Create Study Task"}
      subtitle="Track your daily revision and topic milestones"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Task Title / Topic *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Read NCERT Modern History Chapter 4 & solve 20 MCQs"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
            >
              {subjectsList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
            >
              <option value={15}>15 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={45}>45 Minutes</option>
              <option value={60}>1 Hour</option>
              <option value={90}>1.5 Hours</option>
              <option value={120}>2 Hours</option>
              <option value={180}>3 Hours</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Target Date
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
          >
            <CheckSquare className="w-4 h-4" />
            {taskToEdit ? "Update Task" : "Save Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
