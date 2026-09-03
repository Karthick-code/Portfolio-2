
import React, { useState } from "react";
import { api } from "../../services/api.js";
import {
  Mail,
  MailOpen,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

export const MessagesTab = ({ messages = [], onMessagesUpdated }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [feedback, setFeedback] = useState({ type: null, msg: "" });

  const handleToggleRead = async (message) => {
    try {
      const msgId = message._id || message.id;
      await api.updateMessageReadStatus(msgId, !message.read);
      if ((selectedMessage?._id || selectedMessage?.id) === msgId) {
        setSelectedMessage({ ...message, read: !message.read });
      }
      onMessagesUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: "Failed to update read status." });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry message from MySQL?")) return;

    try {
      await api.deleteMessage(id);
      if ((selectedMessage?._id || selectedMessage?.id) === id) {
        setSelectedMessage(null);
      }
      setFeedback({ type: "success", msg: "Message removed from database." });
      onMessagesUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to delete message." });
    }
  };

  const handleSelect = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      try {
        const msgId = msg._id || msg.id;
        await api.updateMessageReadStatus(msgId, true);
        onMessagesUpdated();
      } catch {
        // silent
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Visitor Inquiries</h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Incoming contact form messages stored directly in MySQL
          </p>
        </div>
      </div>

      {feedback.type && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-xs ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
          <MessageSquare className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-neutral-300">No Inquiries Yet</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
            When visitors submit the contact form on your public portfolio, their messages will arrive here in real-time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Message List */}
          <div className={`lg:col-span-5 space-y-2 ${selectedMessage ? "hidden lg:block" : "block"}`}>
            <div className="flex items-center justify-between pb-1 px-1">
              <span className="text-xs font-mono text-neutral-400">
                {messages.length} total {messages.length === 1 ? "inquiry" : "inquiries"}
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                {messages.filter((m) => !m.read).length} unread
              </span>
            </div>

            {messages.map((m) => {
              const msgId = m._id || m.id;
              const isSelected = (selectedMessage?._id || selectedMessage?.id) === msgId;
              return (
                <div
                  key={msgId}
                  onClick={() => handleSelect(m)}
                  className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-neutral-800/90 border-cyan-500/50 shadow-xs"
                      : m.read
                      ? "bg-neutral-900/60 border-neutral-800/60 hover:bg-neutral-800/40"
                      : "bg-neutral-900 border-cyan-500/30 hover:bg-neutral-850"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      {!m.read ? (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      ) : (
                        <MailOpen className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      )}
                      <span className="font-semibold text-xs text-white truncate max-w-[180px]">
                        {m.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0 ml-2">
                      {new Date(m.createdAt || m.created_at || Date.now()).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 font-medium truncate mb-1">
                    {m.subject || "No subject specified"}
                  </p>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {m.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Message Detail View */}
          <div className={`lg:col-span-7 ${!selectedMessage ? "hidden lg:block" : "block"}`}>
            {selectedMessage ? (
              <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 sm:space-y-6">
                {/* Mobile Back Button */}
                <div className="lg:hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-900/40 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to all inquiries</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-neutral-800">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-white mb-1.5 break-words">
                      {selectedMessage.subject || "No Subject"}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-400 font-mono">
                      <span className="flex items-center gap-1.5 text-white">
                        <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{selectedMessage.name}</span>
                      </span>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="flex items-center gap-1.5 text-cyan-400 hover:underline break-all"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span>{selectedMessage.email}</span>
                      </a>
                      <span className="flex items-center gap-1.5 text-neutral-500">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{new Date(selectedMessage.createdAt || selectedMessage.created_at || Date.now()).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0 pt-2 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => handleToggleRead(selectedMessage)}
                      title={selectedMessage.read ? "Mark unread" : "Mark read"}
                      className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                    >
                      {selectedMessage.read ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <MailOpen className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(selectedMessage._id || selectedMessage.id)}
                      title="Delete Message"
                      className="p-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <p className="text-xs sm:text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed break-words">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Reply Action */}
                <div className="pt-2 flex justify-end">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || "Your message"
                    )}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md text-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply via Email Client</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-center text-neutral-500 text-xs">
                Select a message on the left to read its full contents.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

