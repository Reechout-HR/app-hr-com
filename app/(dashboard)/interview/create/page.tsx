"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { 
  ArrowLeft, X, Smartphone, Monitor, CalendarIcon, 
  Clock, Zap, Info, Plus, Trash2, Edit2, Upload, FileUp, 
  Search, FileText
} from "lucide-react";

import { interviewsApi, CreateInterviewRequest, AddCandidateRequest } from "@/lib/api/interviews";
import { questionnairesApi, Questionnaire } from "@/lib/api/questionnaires";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// --- Schema definitions ---
const candidateSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  notes: z.string().optional(),
});
type CandidateFormValues = z.infer<typeof candidateSchema>;

// Extend AddCandidateRequest locally if needed for the UI before sending
interface UICandidate extends Omit<AddCandidateRequest, 'interview_id' | 'schedule_date'> {
  id: string; // Ensure ID exists for UI lists
}

// --- Main Page Component ---
export default function CreateInterviewPage() {
  const router = useRouter();

  // State
  const [candidates, setCandidates] = useState<UICandidate[]>([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  
  // Job Requirements
  const [interviewType, setInterviewType] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  // Schedule
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduledDate, setScheduledDate] = useState<string>("");

  // UI Modals
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);
  const [isSelectQuestionnaireOpen, setIsSelectQuestionnaireOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<UICandidate | null>(null);

  // Queries
  const { data: questionnairesData, isLoading: isLoadingQuestionnaires } = useQuery({
    queryKey: ["questionnaires"],
    queryFn: () => questionnairesApi.getQuestionnaires(1, 50), // Fetch up to 50 for simplicity
  });

  // Mutations
  const createInterviewMutation = useMutation({
    mutationFn: async (data: CreateInterviewRequest) => {
      // Assuming a generic API client or specific function exists. 
      // The API doesn't expose 'createInterview' yet in interviews.ts, I might need to add it,
      // but let's mock the payload structure based on Angular.
      // We will add `createInterview` to `interviews.ts` next.
      return await interviewsApi.createInterview(data);
    },
    onSuccess: () => {
      toast.success(
        scheduleType === "now"
          ? "Interview started successfully"
          : "Interview scheduled successfully"
      );
      router.push("/interviews");
    },
    onError: (error) => {
      toast.error("Failed to create interview. Please try again.");
      console.error(error);
    }
  });

  // Actions
  const handleSaveCandidate = (data: CandidateFormValues) => {
    if (editingCandidate) {
      setCandidates(cands => cands.map(c => c.id === editingCandidate.id ? { ...data, id: editingCandidate.id } : c));
    } else {
      setCandidates(cands => [...cands, { ...data, id: crypto.randomUUID() }]);
    }
    setIsAddCandidateOpen(false);
    setEditingCandidate(null);
  };

  const handleRemoveCandidate = (id: string) => {
    setCandidates(cands => cands.filter(c => c.id !== id));
  };

  const handleCreateInterview = () => {
    if (!selectedQuestionnaire) {
      toast.warning("Please select a questionnaire");
      return;
    }
    if (scheduleType === "later" && !scheduledDate) {
      toast.warning("Please select a date and time for the interview");
      return;
    }
    if (!deadline) {
      toast.warning("Please select an interview deadline");
      return;
    }
    if (candidates.length === 0) {
      toast.warning("Please add at least one candidate");
      return;
    }

    const payloadScheduledDate = scheduleType === "later" ? new Date(scheduledDate).toISOString() : new Date().toISOString();
    const payloadDeadline = new Date(deadline).toISOString();

    const payload: CreateInterviewRequest = {
      questionnaire_id: selectedQuestionnaire.id,
      scheduled_date: payloadScheduledDate,
      candidates: candidates.map(c => ({
        first_name: c.first_name,
        last_name: c.last_name,
        email: c.email,
        phone: c.phone,
        notes: c.notes,
        // Angular sends minimal candidate details in the array, adjusting to API expectations
      })),
      type: interviewType || undefined,
      deadline: payloadDeadline,
    };

    createInterviewMutation.mutate(payload);
  };

  // Forms
  const candidateForm = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      notes: "",
    }
  });

  const openCandidateModal = (candidate?: UICandidate) => {
    if (candidate) {
      setEditingCandidate(candidate);
      candidateForm.reset(candidate);
    } else {
      setEditingCandidate(null);
      candidateForm.reset({ first_name: "", last_name: "", email: "", phone: "", notes: "" });
    }
    setIsAddCandidateOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-muted/20">
      <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" onClick={() => router.push("/interviews")} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Interview</h1>
            <p className="text-muted-foreground">Add candidates and select a questionnaire to create an interview.</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => router.push("/interviews")}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Job Requirements */}
        <section className="bg-card rounded-xl border shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Job Requirements</h2>
            <p className="text-muted-foreground text-sm">Define job requirements and evaluation criteria for the interview</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> Interview Type
              </Label>
              <Select value={interviewType} onValueChange={setInterviewType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile"><div className="flex items-center gap-2"><Smartphone className="w-4 h-4"/> Mobile</div></SelectItem>
                  <SelectItem value="web"><div className="flex items-center gap-2"><Monitor className="w-4 h-4"/> Web</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> Interview Deadline <span className="text-destructive">*</span>
              </Label>
              <Input 
                type="datetime-local" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Info className="w-3 h-3" /> Deadline for candidates to complete the interview
              </p>
            </div>
          </div>
        </section>

        {/* Candidates & Questionnaire */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Candidates */}
          <section className="bg-card rounded-xl border shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  Candidates <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{candidates.length}</span>
                </h2>
                <p className="text-muted-foreground text-sm">Add candidates for this interview</p>
              </div>
            </div>
            
            {candidates.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                <div className="bg-muted p-3 rounded-full mb-3">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No Candidates Added</h3>
                <p className="text-sm mb-4">Add candidates manually or via bulk upload</p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => openCandidateModal()}>
                    <Plus className="w-4 h-4 mr-2" /> Add Single
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2">
                  {candidates.map(candidate => (
                    <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg bg-background">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{candidate.first_name} {candidate.last_name}</p>
                        <p className="text-sm text-muted-foreground truncate">{candidate.email}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <Button variant="ghost" size="icon" onClick={() => openCandidateModal(candidate)}>
                          <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveCandidate(candidate.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t flex justify-end">
                  <Button variant="outline" onClick={() => openCandidateModal()} className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Another Candidate
                  </Button>
                </div>
              </div>
            )}
          </section>

          {/* Questionnaire Selection */}
          <section className="bg-card rounded-xl border shadow-sm p-6 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Questionnaire <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full dark:bg-red-900/30 dark:text-red-400">Required</span>
              </h2>
              <p className="text-muted-foreground text-sm">Select the questionnaire to evaluate candidates</p>
            </div>

            {selectedQuestionnaire ? (
              <div className="flex-1 flex flex-col items-center justify-center border rounded-lg p-6 text-center bg-muted/30">
                <div className="bg-primary/10 text-primary p-3 rounded-full mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1 truncate max-w-full px-4">{selectedQuestionnaire.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedQuestionnaire.status === "completed" ? "Published" : "Draft"} • {new Date(selectedQuestionnaire.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsSelectQuestionnaireOpen(true)}>Change</Button>
                  <Button variant="ghost" className="text-destructive" onClick={() => setSelectedQuestionnaire(null)}>Remove</Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                <div className="bg-muted p-3 rounded-full mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No Questionnaire Selected</h3>
                <p className="text-sm mb-4">You must select a questionnaire to proceed</p>
                <Button variant="outline" onClick={() => setIsSelectQuestionnaireOpen(true)}>
                  <Search className="w-4 h-4 mr-2" /> Browse Questionnaires
                </Button>
              </div>
            )}
          </section>

        </div>

        {/* Schedule */}
        <section className="bg-card rounded-xl border shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Interview Schedule <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full dark:bg-red-900/30 dark:text-red-400">Required</span>
            </h2>
            <p className="text-muted-foreground text-sm">Choose when candidates should receive and start the interview</p>
          </div>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className={cn(
                "flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors hover:bg-muted/50",
                scheduleType === "now" ? "border-primary bg-primary/5" : "border-border"
              )}>
                <input 
                  type="radio" 
                  name="scheduleType" 
                  value="now" 
                  checked={scheduleType === "now"} 
                  onChange={() => setScheduleType("now")}
                  className="mt-1"
                />
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> Start Immediately
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Candidates will receive the interview link right away and can start immediately.</p>
                </div>
              </label>

              <label className={cn(
                "flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors hover:bg-muted/50",
                scheduleType === "later" ? "border-primary bg-primary/5" : "border-border"
              )}>
                <input 
                  type="radio" 
                  name="scheduleType" 
                  value="later" 
                  checked={scheduleType === "later"} 
                  onChange={() => setScheduleType("later")}
                  className="mt-1"
                />
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Schedule for Later
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Candidates will receive the interview link at the specified date and time.</p>
                </div>
              </label>
            </div>

            {scheduleType === "later" && (
              <div className="p-4 border rounded-xl bg-muted/30 flex flex-col sm:flex-row sm:items-center gap-4 animate-in fade-in slide-in-from-top-4">
                <div className="flex-1 space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Select when to send the interview
                  </Label>
                  <Input 
                    type="datetime-local" 
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Info className="w-4 h-4" /> Candidates will receive an email notification at this time
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-4 pt-4 border-t pb-8">
          <Button variant="ghost" onClick={() => router.push("/interviews")} disabled={createInterviewMutation.isPending}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateInterview} 
            disabled={createInterviewMutation.isPending}
            className="min-w-[150px]"
          >
            {createInterviewMutation.isPending ? "Creating..." : "Create Interview"}
          </Button>
        </div>

      </div>

      {/* --- Modals --- */}
      
      {/* Add Candidate Modal */}
      <Dialog open={isAddCandidateOpen} onOpenChange={setIsAddCandidateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingCandidate ? "Edit Candidate" : "Add Candidate"}</DialogTitle>
            <DialogDescription>Enter candidate details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={candidateForm.handleSubmit(handleSaveCandidate)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" {...candidateForm.register("first_name")} />
                {candidateForm.formState.errors.first_name && <p className="text-xs text-destructive">{candidateForm.formState.errors.first_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" {...candidateForm.register("last_name")} />
                {candidateForm.formState.errors.last_name && <p className="text-xs text-destructive">{candidateForm.formState.errors.last_name.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...candidateForm.register("email")} />
              {candidateForm.formState.errors.email && <p className="text-xs text-destructive">{candidateForm.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" {...candidateForm.register("phone")} />
              {candidateForm.formState.errors.phone && <p className="text-xs text-destructive">{candidateForm.formState.errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input id="notes" {...candidateForm.register("notes")} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddCandidateOpen(false)}>Cancel</Button>
              <Button type="submit">{editingCandidate ? "Save Changes" : "Add Candidate"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Select Questionnaire Modal */}
      <Dialog open={isSelectQuestionnaireOpen} onOpenChange={setIsSelectQuestionnaireOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Select Questionnaire</DialogTitle>
            <DialogDescription>Choose a questionnaire for this interview.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {isLoadingQuestionnaires ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : questionnairesData?.results.length ? (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {questionnairesData.results.map(q => (
                  <div 
                    key={q.id} 
                    className={cn(
                      "flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors hover:border-primary",
                      selectedQuestionnaire?.id === q.id ? "border-primary bg-primary/5" : ""
                    )}
                    onClick={() => {
                      setSelectedQuestionnaire(q);
                      setIsSelectQuestionnaireOpen(false);
                    }}
                  >
                    <div>
                      <p className="font-medium">{q.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(q.created_at).toLocaleDateString()} • {q.status}</p>
                    </div>
                    {selectedQuestionnaire?.id === q.id && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg">
                No questionnaires found. Create one first.
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsSelectQuestionnaireOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
