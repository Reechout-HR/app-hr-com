"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Copy, Mail } from "lucide-react";

import { interviewsApi } from "@/lib/api/interviews";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ShareInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  interviewId: string;
  selectedCandidateIds: string[];
}

export function ShareInviteModal({
  isOpen,
  onClose,
  interviewId,
  selectedCandidateIds,
}: ShareInviteModalProps) {
  const queryClient = useQueryClient();

  const isGeneralLink = selectedCandidateIds.length === 0;
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const inviteLink = isGeneralLink 
    ? `${baseUrl}/interview/screening/${interviewId}`
    : `${baseUrl}/interview/share/${interviewId}/candidate/[candidate_id]`;

  const [emailSubject, setEmailSubject] = useState("Invitation to Interview via ReechOut");
  const [emailTemplate, setEmailTemplate] = useState(
    "Hi there,\n\nYou have been invited to participate in an AI-powered interview. Please click the link below to start your interview.\n\nBest regards,\nThe Hiring Team"
  );

  const sendMutation = useMutation({
    mutationFn: () =>
      interviewsApi.sendInvitesToCandidates(
        interviewId,
        selectedCandidateIds,
        inviteLink,
        emailTemplate,
        emailSubject
      ),
    onSuccess: () => {
      toast.success("Success", {
        description: `Invites sent successfully to ${selectedCandidateIds.length} candidate(s).`,
      });
      queryClient.invalidateQueries({ queryKey: ["interviews", interviewId] });
      onClose();
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to send invites. Please try again.",
      });
    },
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Link Copied", {
      description: "Invite link copied to clipboard.",
    });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCandidateIds.length > 0) {
      sendMutation.mutate();
    } else {
      onClose(); // Just close if it's only meant to copy link
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-[var(--border-color-light)] bg-[var(--background-color)] shadow-[0_24px_48px_rgba(var(--shadow-rgb),0.12)] sm:rounded-[24px] dark:border-white/[0.09]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-[var(--border-color-light)] bg-[var(--surface-2)] px-6 py-4 dark:border-white/[0.09]">
            <DialogHeader className="p-0 text-left">
              <DialogTitle className="text-xl font-bold text-foreground">
                {isGeneralLink ? "Share Application Link" : "Send Interview Invites"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <form onSubmit={handleSend} className="flex flex-col gap-6 p-6 overflow-y-auto" data-lenis-prevent>
            <div className="flex flex-col gap-2">
              <Label className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
                {isGeneralLink ? "Application Link" : "Invite Link"}
              </Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={inviteLink}
                  className="rounded-xl bg-[var(--surface-2)]"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={handleCopyLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedCandidateIds.length > 0 && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="subject" className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Email Subject
                  </Label>
                  <Input
                    id="subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="rounded-xl"
                    placeholder="Enter email subject"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="template" className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Email Template
                  </Label>
                  <Textarea
                    id="template"
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    className="min-h-[120px] rounded-xl resize-none"
                    placeholder="Enter email message"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    The invite link will be automatically appended to the bottom of the email.
                  </p>
                </div>
              </>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="h-10 rounded-xl px-6 font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 rounded-xl bg-[var(--primary-color)] px-6 font-semibold hover:bg-[var(--primary-color-hover)]"
                disabled={sendMutation.isPending}
              >
                {sendMutation.isPending ? (
                  "Sending..."
                ) : selectedCandidateIds.length > 0 ? (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send {selectedCandidateIds.length} Invite{selectedCandidateIds.length !== 1 ? 's' : ''}
                  </>
                ) : (
                  "Done"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
