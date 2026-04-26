"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/ui/cn";

interface SharePageProps {
  params: Promise<{ id: string, candidateId: string }>;
}

export default function CandidateSharePage({ params }: SharePageProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const { candidateId } = use(params);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDateTime: "",
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Since we don't have the exact API endpoint implemented in lib/api/interviews.ts yet,
  // we will mock the exact fetching logic angular expects using fetch directly if needed,
  // or we can extend interviewsApi if we want. For now, we simulate the `getCandidate` call:
  const { data: candidateData, isLoading, isError, error } = useQuery({
    queryKey: ["candidate-share", candidateId, token],
    queryFn: async () => {
      if (!candidateId || !token) throw new Error("Invalid link");
      const res = await fetch(`/api/interviews/candidates/${candidateId}/?token=${token}`);
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("Invalid or expired token. Please use the link provided in your email.");
        if (res.status === 404) throw new Error("Candidate not found. Please use the link provided in your email.");
        throw new Error("Failed to load candidate information. Please try again.");
      }
      return res.json();
    },
    enabled: !!candidateId && !!token,
    retry: false
  });

  // Pre-fill form when data loads
  useEffect(() => {
    if (candidateData) {
      setTimeout(() => {
        const preferredDate = candidateData.schedule_date 
          ? new Date(candidateData.schedule_date).toISOString().slice(0, 16) 
          : "";
        setFormData({
          firstName: candidateData.first_name || "",
          lastName: candidateData.last_name || "",
          email: candidateData.email || "",
          phone: candidateData.phone || "",
          preferredDateTime: preferredDate,
          consent: false
        });
      }, 0);
    }
  }, [candidateData]);

  const submitMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch(`/api/interviews/candidates/${candidateId}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // or however the backend expects the token
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to register");
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => {
      toast.error("Registration Failed", { description: "There was an error submitting your registration. Please try again." });
    }
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim() || formData.firstName.length < 2) newErrors.firstName = "Please input your first name!";
    if (!formData.lastName.trim() || formData.lastName.length < 2) newErrors.lastName = "Please input your last name!";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email address!";
    if (!formData.phone.trim() || !/^[+]?[\d\s\-()]+$/.test(formData.phone)) newErrors.phone = "Please input your phone number!";
    if (!formData.preferredDateTime) newErrors.preferredDateTime = "Please select your preferred interview date and time!";
    if (!formData.consent) newErrors.consent = "You must provide consent to schedule the interview";

    // Deadline validation
    if (candidateData?.interview?.deadline && formData.preferredDateTime) {
      const selectedDate = new Date(formData.preferredDateTime);
      const deadlineDate = new Date(candidateData.interview.deadline);
      if (selectedDate > deadlineDate) {
        newErrors.preferredDateTime = "Selected date and time cannot be after the interview deadline!";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    submitMutation.mutate({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      schedule_date: new Date(formData.preferredDateTime).toISOString(),
      consent: formData.consent
    });
  };

  if (!candidateId || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background-color)]">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[var(--surface-1)] border border-[var(--error-color)]/30 text-center flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-[var(--error-color)]" />
          <h2 className="text-xl font-bold text-foreground">Invalid Link</h2>
          <p className="text-muted-foreground">Please use the exact link provided in your email invitation.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-color)]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--primary-color)] border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background-color)]">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[var(--surface-1)] border border-[var(--error-color)]/30 text-center flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-[var(--error-color)]" />
          <h2 className="text-xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  const interviewDeadline = candidateData?.interview?.deadline;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background-color)] relative selection:bg-[var(--primary-color)]/30">
      {/* Decorative background matching milli-derived auth pages */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-color-rgb),0.08),transparent_50%)]" />

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        
        {submitted ? (
          <div className="w-full max-w-lg flex flex-col items-center text-center p-10 rounded-[32px] bg-[var(--surface-1)] border border-[var(--border-color-light)] dark:border-white/5 shadow-xl animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-[var(--success-color)]/10 text-[var(--success-color)] rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 tracking-tight">Registration Successful!</h1>
            <p className="text-[15px] text-muted-foreground mb-6 leading-relaxed">
              Thank you for registering. You will receive a confirmation email shortly with further details about your interview.
            </p>
            <div className="w-full p-4 bg-[var(--surface-2)] rounded-2xl border border-[var(--border-color-light)] dark:border-white/5">
              <p className="text-[14px] font-medium text-foreground">
                Please check your email for interview instructions and preparation materials.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[540px] flex flex-col p-8 sm:p-10 rounded-[32px] bg-[var(--surface-1)] border border-[var(--border-color-light)] dark:border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Top Badge */}
            <div className="inline-flex self-start px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-xs font-bold uppercase tracking-wider mb-6">
              Interview Registration
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">Your Information</h2>
            <p className="text-[15px] text-muted-foreground mb-8">Please provide your details to schedule your interview</p>

            {interviewDeadline && (
              <div className="flex items-center gap-3 p-4 mb-8 rounded-2xl bg-[var(--warning-color)]/10 border border-[var(--warning-color)]/20 text-[var(--warning-color)]">
                <Clock className="w-5 h-5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">Interview Deadline</span>
                  <span className="text-sm font-semibold">{format(new Date(interviewDeadline), "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">First Name</Label>
                  <Input 
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    placeholder="First Name..."
                    className={cn("h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border-color-light)] dark:border-white/5 px-4 text-[15px] focus-visible:ring-[var(--primary-color)]", errors.firstName && "border-[var(--error-color)] focus-visible:ring-[var(--error-color)]")}
                  />
                  {errors.firstName && <span className="text-xs font-medium text-[var(--error-color)]">{errors.firstName}</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Last Name</Label>
                  <Input 
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Last Name..."
                    className={cn("h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border-color-light)] dark:border-white/5 px-4 text-[15px] focus-visible:ring-[var(--primary-color)]", errors.lastName && "border-[var(--error-color)] focus-visible:ring-[var(--error-color)]")}
                  />
                  {errors.lastName && <span className="text-xs font-medium text-[var(--error-color)]">{errors.lastName}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Email</Label>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="Email..."
                  className={cn("h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border-color-light)] dark:border-white/5 px-4 text-[15px] focus-visible:ring-[var(--primary-color)]", errors.email && "border-[var(--error-color)] focus-visible:ring-[var(--error-color)]")}
                />
                {errors.email && <span className="text-xs font-medium text-[var(--error-color)]">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</Label>
                <Input 
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="Phone Number..."
                  className={cn("h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border-color-light)] dark:border-white/5 px-4 text-[15px] focus-visible:ring-[var(--primary-color)]", errors.phone && "border-[var(--error-color)] focus-visible:ring-[var(--error-color)]")}
                />
                {errors.phone && <span className="text-xs font-medium text-[var(--error-color)]">{errors.phone}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Preferred Interview Date & Time</Label>
                <Input 
                  type="datetime-local"
                  value={formData.preferredDateTime}
                  onChange={e => setFormData({...formData, preferredDateTime: e.target.value})}
                  className={cn("h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border-color-light)] dark:border-white/5 px-4 text-[15px] focus-visible:ring-[var(--primary-color)]", errors.preferredDateTime && "border-[var(--error-color)] focus-visible:ring-[var(--error-color)]")}
                />
                {errors.preferredDateTime && <span className="text-xs font-medium text-[var(--error-color)]">{errors.preferredDateTime}</span>}
              </div>

              <div className="flex items-start gap-3 mt-2 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border-color-light)] dark:border-white/5">
                <Checkbox 
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({...formData, consent: !!checked})}
                  className={cn("mt-0.5 h-5 w-5 rounded-[4px] data-[state=checked]:bg-[var(--primary-color)] data-[state=checked]:border-[var(--primary-color)]", errors.consent && "border-[var(--error-color)]")}
                />
                <div className="flex flex-col gap-1">
                  <Label htmlFor="consent" className="text-[14px] leading-relaxed text-foreground cursor-pointer font-medium">
                    I consent to participate in this interview and understand that my information will be used for recruitment purposes only.
                  </Label>
                  {errors.consent && <span className="text-xs font-medium text-[var(--error-color)]">{errors.consent}</span>}
                </div>
              </div>

              <Button 
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full h-14 mt-4 rounded-xl bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-hover)] text-white text-[16px] font-bold shadow-[0_4px_14px_rgba(var(--primary-color-rgb),0.3)] hover:opacity-90 transition-opacity"
              >
                {submitMutation.isPending ? "Registering..." : "Register for Interview"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}