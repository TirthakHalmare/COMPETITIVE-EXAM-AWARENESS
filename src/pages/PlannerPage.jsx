import React, { useState, useMemo } from "react";
import {
  CheckSquare,
  Plus,
  Clock,
  Calendar,
  Filter,
  Flame,
  Award,
  Sparkles,
  TrendingUp,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../common/Toast";
import { TaskItem } from "../components/planner/TaskItem";
import { TaskFormModal } from "../components/planner/TaskFormModal";

export const PlannerPage = ({ navigate }) => {
  const { studyTasks, saveTask, deleteTask, toggleTaskComplete } = useData();
  const { currentUser, isFirebase } = useAuth();
  const { success } = useToast();

  const [activeFilter, setActiveFilter] = useState("all"); // all, pending, completed, today
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const filteredTasks = useMemo(() => {
    return studyTasks.filter((task) => {
      if (activeFilter === "pending") return !task.completed;
      if (activeFilter === "completed") return task.completed;
      if (activeFilter === "today") return task.deadline === todayStr;
      return true;
    });
  }, [studyTasks, activeFilter, todayStr]);

  // Metrics
  const totalTasks = studyTasks.length;
  const completedTasks = studyTasks.filter((t) => t.completed).length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Study hours
  const totalMinutes = studyTasks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const completedMinutes = studyTasks
    .filter((t) => t.completed)
    .reduce((acc, t) => acc + (t.duration || 0), 0);

  const totalHours = (totalMinutes / 60).toFixed(1);
  const completedHours = (completedMinutes / 60).toFixed(1);

  const handleToggle = async (taskId) => {
    await toggleTaskComplete(taskId);
    const task = studyTasks.find((t) => t.id === taskId);
    if (!task?.completed) {
      success("Task completed! Great progress! 🎯");
    }
  };

  const handleSave = async (taskData) => {
    await saveTask(taskData);
    success(taskData.id ? "Task updated successfully!" : "New study task added!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="primary" size="md">Goal Tracker & Consistency</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Interactive Study Planner
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Break big exam syllabi into daily revision blocks and monitor weekly completion.
          </p>
        </div>

        <button
          onClick={() => {
            setTaskToEdit(null);
            setTaskModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:scale-105 transition"
        >
          <Plus className="w-4 h-4" /> Add Study Task
        </button>
      </div>

      {/* METRICS & PROGRESS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Main Progress Ring / Bar */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-blue-200 tracking-wider">
              Preparation Consistency
            </span>
            <span className="text-xs font-bold bg-white/10 px-2.5 py-0.5 rounded-full text-blue-200">
              {isFirebase ? "Synced to Cloud Firestore" : "Persisted Locally"}
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {completionPercent}%
              </span>
              <span className="text-xs text-blue-200">
                {completedTasks} of {totalTasks} Tasks Finished
              </span>
            </div>
            <div className="w-full bg-blue-950/60 rounded-full h-3 overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-blue-100/90 leading-relaxed">
            "Success is the sum of small efforts, repeated day in and day out." — Target: {currentUser?.dailyGoalHours || 4}h daily.
          </p>
        </div>

        {/* Study Hours Metric */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Scheduled Time</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{completedHours}h</span>
            <span className="text-xs text-slate-400 ml-1">/ {totalHours}h planned</span>
            <p className="text-xs text-slate-500 mt-1">Total focus duration across all tasks</p>
          </div>
        </div>

        {/* Active Streak */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Streak</span>
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">5 Days</span>
            <p className="text-xs text-slate-500 mt-1">Consistent daily revisions recorded</p>
          </div>
        </div>

      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFilter === "all"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Tasks ({totalTasks})
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFilter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Pending ({totalTasks - completedTasks})
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFilter === "completed"
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Completed ({completedTasks})
          </button>
          <button
            onClick={() => setActiveFilter("today")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeFilter === "today"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Today's Target
          </button>
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredTasks.length} task{filteredTasks.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* TASK LIST */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggle}
            onDelete={deleteTask}
            onEdit={(t) => {
              setTaskToEdit(t);
              setTaskModalOpen(true);
            }}
          />
        ))}

        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No tasks in this view</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Plan your next subject block, previous-year question practice, or current affairs reading.
            </p>
            <button
              onClick={() => {
                setTaskToEdit(null);
                setTaskModalOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow transition"
            >
              Add First Task
            </button>
          </div>
        )}
      </div>

      {/* MODAL FOR CREATE / EDIT TASK */}
      <TaskFormModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSave={handleSave}
        taskToEdit={taskToEdit}
      />

    </div>
  );
};
