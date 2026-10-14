import React from "react";
import { Check, Clock, Calendar, Trash2, Edit3, AlertCircle } from "lucide-react";
import { Badge } from "../common/Badge";

export const TaskItem = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit
}) => {
  const getSubjectColor = (subj) => {
    const s = subj?.toLowerCase() || "";
    if (s.includes("polity") || s.includes("law")) return "primary";
    if (s.includes("quant") || s.includes("math")) return "warning";
    if (s.includes("current") || s.includes("news")) return "success";
    if (s.includes("reasoning")) return "purple";
    if (s.includes("english")) return "indigo";
    return "default";
  };

  const getPriorityBadge = (pri) => {
    if (pri === "High") return { variant: "danger", label: "High Priority" };
    if (pri === "Medium") return { variant: "warning", label: "Medium Priority" };
    return { variant: "default", label: "Low Priority" };
  };

  const priorityMeta = getPriorityBadge(task.priority);

  return (
    <div
      className={`group flex items-start justify-between p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? "bg-slate-50/80 border-slate-200/80 opacity-75"
          : "bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0 mr-3">
        {/* Toggle Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition shrink-0 ${
            task.completed
              ? "bg-emerald-600 border-emerald-600 text-white"
              : "border-slate-300 hover:border-blue-500 bg-white"
          }`}
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant={getSubjectColor(task.subject)} size="sm">
              {task.subject}
            </Badge>
            <Badge variant={priorityMeta.variant} size="sm">
              {priorityMeta.label}
            </Badge>
          </div>

          <h4
            className={`text-sm font-semibold leading-snug break-words ${
              task.completed ? "line-through text-slate-400" : "text-slate-800"
            }`}
          >
            {task.title}
          </h4>

          {/* Time & Deadline Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{task.duration} mins</span>
            </span>
            {task.deadline && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Due: {task.deadline}</span>
              </span>
            )}
            {task.completed && task.completedAt && (
              <span className="text-emerald-600 font-medium text-[11px]">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
          title="Edit task"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
