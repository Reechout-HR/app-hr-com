"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { interviewsApi, type InterviewCandidate } from "@/lib/api/interviews";
import { Button } from "@/components/ui/button";

import { InterviewDetailHeader } from "./components/interview-header";
import { CandidatesTable } from "./components/candidates-table";
import { AddCandidateModal } from "./components/add-candidate-modal";
import { ShareInviteModal } from "./components/share-invite-modal";
import { AiReportModal } from "./components/ai-report-modal";
import { ScreeningReportModal } from "./components/screening-report-modal";
import { TranscriptModal } from "./components/transcript-modal";

interface InterviewDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function InterviewDetailPage({ params }: InterviewDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedCandidateIdsForShare, setSelectedCandidateIdsForShare] = useState<string[]>([]);
  
  const [isAiReportOpen, setIsAiReportOpen] = useState(false);
  const [isScreeningReportOpen, setIsScreeningReportOpen] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<InterviewCandidate | null>(null);

  const { data: interview, isLoading, isError } = useQuery({
    queryKey: ["interviews", id],
    queryFn: () => interviewsApi.getInterviewById(id),
  });

  const handleDownloadResume = async (candidate: InterviewCandidate) => {
    // In a real app, you would have an endpoint that returns the file directly or a signed URL.
    // e.g. window.open(`/api/interviews/candidates/${candidate.id}/resume/download/`, "_blank");
    alert(`Downloading resume for ${candidate.first_name} (implement API logic)`);
  };

  const handleSendInvites = (candidateIds: string[]) => {
    setSelectedCandidateIdsForShare(candidateIds);
    setIsShareModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-color)] border-t-transparent" />
      </div>
    );
  }

  if (isError || !interview) {
    return (
      <div className="mx-auto w-full max-w-[1400px] pt-4 pb-8 sm:pt-6">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-bold text-foreground">Interview Not Found</h2>
          <p className="mt-2 text-muted-foreground">The interview you are looking for does not exist or you don&apos;t have access.</p>
          <Button onClick={() => router.push("/interviews")} className="mt-6 rounded-xl">
            Back to Interviews
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] pt-4 pb-8 sm:pt-6 relative z-20">
      {/* Background Decorative Gradient */}
      <div className="fixed inset-0 -z-10 bg-[var(--background-color)] bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary-color-rgb),0.05),transparent_60%)]" />

      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-4 -ml-4 flex items-center text-muted-foreground hover:text-foreground"
        onClick={() => router.push("/interviews")}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Interviews
      </Button>

      <InterviewDetailHeader
        interview={interview}
        onShareLink={() => {
          setSelectedCandidateIdsForShare([]);
          setIsShareModalOpen(true);
        }}
      />

      <div className="mt-8">
        <CandidatesTable
          candidates={interview.candidates || []}
          onAddCandidate={() => setIsAddModalOpen(true)}
          onViewScreening={(candidate) => {
            setSelectedCandidate(candidate);
            setIsScreeningReportOpen(true);
          }}
          onViewAiReport={(candidate) => {
            setSelectedCandidate(candidate);
            setIsAiReportOpen(true);
          }}
          onViewTranscript={(candidate) => {
            setSelectedCandidate(candidate);
            setIsTranscriptOpen(true);
          }}
          onDownloadResume={handleDownloadResume}
          onSendInvites={handleSendInvites}
        />
      </div>

      {/* Modals */}
      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        interviewId={interview.id}
      />

      <ShareInviteModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSelectedCandidateIdsForShare([]);
        }}
        interviewId={interview.id}
        selectedCandidateIds={selectedCandidateIdsForShare}
      />

      <AiReportModal
        isOpen={isAiReportOpen}
        onClose={() => {
          setIsAiReportOpen(false);
          setTimeout(() => setSelectedCandidate(null), 200); // clear after animation
        }}
        candidate={selectedCandidate}
      />

      <ScreeningReportModal
        isOpen={isScreeningReportOpen}
        onClose={() => {
          setIsScreeningReportOpen(false);
          setTimeout(() => setSelectedCandidate(null), 200);
        }}
        candidate={selectedCandidate}
      />
      
      <TranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => {
          setIsTranscriptOpen(false);
          setTimeout(() => setSelectedCandidate(null), 200);
        }}
        candidate={selectedCandidate}
      />
    </div>
  );
}
