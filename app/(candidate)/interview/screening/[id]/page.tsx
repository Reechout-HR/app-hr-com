"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Loader2, 
  Upload, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Mail,
  ChevronRight,
  FileText
} from "lucide-react";
import { interviewsApi } from "@/lib/api/interviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const basicInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  countryCode: z.string(),
  phoneNumber: z.string().regex(/^\d{7,14}$/, "Phone number must be 7-14 digits"),
});

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

interface ScreeningQuestion {
  id: string;
  question_text: string;
  order: number;
}

interface InterviewDetails {
  id: string;
  questionnaire_title: string;
  company_name: string;
  type: string;
}

const COUNTRY_CODES = [
  { label: "🇺🇸 USA (+1)", value: "usa", code: "+1" },
  { label: "🇨🇦 Canada (+1)", value: "canada", code: "+1" },
  { label: "🇬🇧 UK (+44)", value: "uk", code: "+44" },
  { label: "🇦🇺 Australia (+61)", value: "australia", code: "+61" },
];

export default function ScreeningPage() {
  const { id: interviewId } = useParams() as { id: string };
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState<
    "loading" | "basic-info" | "questions" | "evaluating" | "submitted" | "rejected" | "redirecting"
  >("loading");
  
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails | null>(null);
  const [screeningQuestions, setScreeningQuestions] = useState<ScreeningQuestion[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  const basicInfoForm = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      countryCode: "usa",
    },
  });

  const screeningForm = useForm<Record<string, string>>();

  useEffect(() => {
    if (interviewId) {
      loadScreeningQuestions();
    }
  }, [interviewId]);

  const loadScreeningQuestions = async () => {
    try {
      const response = await interviewsApi.getScreeningQuestions(interviewId);
      const data = response.data || response;
      setInterviewDetails(data.interview);
      const questions = data.screening_questions || [];
      setScreeningQuestions(questions);

      if (!data.has_screening_questions || questions.length === 0) {
        router.push(`/interview/share/${interviewId}/candidate/new`); // Adjusting as per logic
        return;
      }

      setCurrentStep("basic-info");
    } catch (error: any) {
      console.error("Error loading screening questions:", error);
      if (error.response?.status === 404) {
        toast.error("Interview not found");
        setCurrentStep("rejected");
      } else {
        toast.error("Failed to load application questions.");
        // Fallback or retry
      }
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setResumeFile(file);
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const onBasicInfoSubmit = () => {
    if (!resumeFile) {
      toast.warning("Please upload your resume (PDF) to continue");
      return;
    }
    setCurrentStep("questions");
  };

  const onScreeningSubmit = async (data: Record<string, string>) => {
    setCurrentStep("evaluating");
    
    try {
      const basicInfo = basicInfoForm.getValues();
      const formData = new FormData();
      formData.append("interview_id", interviewId);
      formData.append("first_name", basicInfo.firstName);
      formData.append("last_name", basicInfo.lastName);
      formData.append("email", basicInfo.email);
      
      const countryCode = COUNTRY_CODES.find(c => c.value === basicInfo.countryCode)?.code || "+1";
      formData.append("phone", `${countryCode}${basicInfo.phoneNumber}`);
      
      if (resumeFile) formData.append("resume", resumeFile);
      
      const answers: Record<string, string> = {};
      screeningQuestions.forEach(q => {
        answers[q.id] = data[`question_${q.id}`];
      });
      formData.append("answers", JSON.stringify(answers));

      const response = await interviewsApi.evaluateScreeningAnswersWithFile(formData);
      const result = response.data || response;
      setEvaluationResult(result);

      if (result.status === "processing" || result.message?.includes("processing")) {
        setCurrentStep("submitted");
        toast.success("Application submitted successfully! Check your email for results.");
      } else if (result.passed) {
        setCurrentStep("redirecting");
        toast.success("Congratulations! Your application has been approved.");
        setTimeout(() => {
          router.push(`/interview/share/${interviewId}/candidate/${result.candidate_id}`);
        }, 2000);
      } else {
        setCurrentStep("rejected");
      }
    } catch (error: any) {
      console.error("Error evaluating answers:", error);
      setCurrentStep("questions");
      toast.error(error.response?.data?.message || "Failed to submit application.");
    }
  };

  const progress = currentStep === "basic-info" ? 33 : currentStep === "questions" ? 66 : 100;

  if (currentStep === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading application questions...</p>
      </div>
    );
  }

  if (currentStep === "evaluating") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <h3 className="text-xl font-semibold">Submitting Your Answers</h3>
        <p className="text-muted-foreground">Please wait while we process your submission...</p>
      </div>
    );
  }

  if (currentStep === "submitted") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Card className="text-center p-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Answers Submitted Successfully!</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Your application answers have been submitted and are being evaluated. 
            Please check your email for the results shortly.
          </p>
          <div className="bg-muted p-6 rounded-xl text-left space-y-4">
            <h4 className="font-bold">What happens next?</h4>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>We're reviewing your answers and application</li>
              <li>You'll receive an email with the evaluation results</li>
              <li>If approved, you'll get a link to schedule your interview</li>
            </ul>
            <div className="flex items-center gap-2 pt-4 border-t text-sm text-primary">
              <Mail className="w-4 h-4" />
              Check your email inbox (and spam folder) for updates.
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (currentStep === "rejected") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Card className="text-center p-8 border-destructive/50">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Application Not Approved</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            {evaluationResult?.evaluation_summary || "Unfortunately, you did not meet the minimum requirements for this position."}
          </p>
          {evaluationResult?.disqualifying_factors?.length > 0 && (
            <div className="bg-destructive/5 p-6 rounded-xl text-left space-y-4 border border-destructive/10">
              <h4 className="font-bold text-destructive">Areas of Concern:</h4>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {evaluationResult.disqualifying_factors.map((factor: string, i: number) => (
                  <li key={i}>{factor}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium mb-1">
          <span className={cn(currentStep === "basic-info" ? "text-primary" : "text-muted-foreground")}>Basic Info</span>
          <span className={cn(currentStep === "questions" ? "text-primary" : "text-muted-foreground")}>Questions</span>
          <span className="text-muted-foreground">Review</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {currentStep === "basic-info" && (
        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardHeader className="space-y-1">
            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Step 1 of 2</div>
            <CardTitle className="text-2xl font-bold">Your Information</CardTitle>
            <CardDescription>Please provide your basic information to begin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...basicInfoForm.register("firstName")} placeholder="John" />
                  {basicInfoForm.formState.errors.firstName && (
                    <p className="text-xs text-destructive">{basicInfoForm.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...basicInfoForm.register("lastName")} placeholder="Doe" />
                  {basicInfoForm.formState.errors.lastName && (
                    <p className="text-xs text-destructive">{basicInfoForm.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...basicInfoForm.register("email")} placeholder="john@example.com" />
                {basicInfoForm.formState.errors.email && (
                  <p className="text-xs text-destructive">{basicInfoForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <Controller
                      control={basicInfoForm.control}
                      name="countryCode"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRY_CODES.map((c) => (
                              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <Input 
                    id="phone" 
                    className="flex-1" 
                    {...basicInfoForm.register("phoneNumber")} 
                    placeholder="1234567890" 
                  />
                </div>
                {basicInfoForm.formState.errors.phoneNumber && (
                  <p className="text-xs text-destructive">{basicInfoForm.formState.errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Resume (PDF)</Label>
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-colors",
                    resumeFile ? "bg-primary/5 border-primary/50" : "hover:bg-muted/50 border-muted"
                  )}
                >
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleResumeChange}
                  />
                  {resumeFile ? (
                    <>
                      <FileText className="w-10 h-10 text-primary" />
                      <div className="text-center">
                        <p className="font-medium">{resumeFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => setResumeFile(null)}>Change File</Button>
                    </>
                  ) : (
                    <>
                      <div className="bg-muted p-3 rounded-full">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <Label htmlFor="resume" className="text-primary hover:underline cursor-pointer font-semibold block">Click to upload resume</Label>
                        <p className="text-xs text-muted-foreground mt-1">PDF only, max 10MB</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg" disabled={!resumeFile}>
                Continue to Questions <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {currentStep === "questions" && (
        <Card className="shadow-xl border-t-4 border-t-primary animate-in fade-in slide-in-from-right-4 duration-300">
          <CardHeader>
            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Step 2 of 2</div>
            <CardTitle className="text-2xl font-bold">Application Questions</CardTitle>
            <CardDescription>
              {interviewDetails?.questionnaire_title}
              {interviewDetails?.company_name && ` at ${interviewDetails.company_name}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={screeningForm.handleSubmit(onScreeningSubmit)} className="space-y-8">
              <div className="space-y-6">
                {screeningQuestions.map((q, i) => (
                  <div key={q.id} className="space-y-3 p-4 rounded-xl border bg-muted/30">
                    <Label htmlFor={`question_${q.id}`} className="text-base font-semibold leading-relaxed">
                      <span className="text-primary mr-2 font-mono">Q{i + 1}:</span>
                      {q.question_text}
                    </Label>
                    <Textarea
                      id={`question_${q.id}`}
                      {...screeningForm.register(`question_${q.id}`, { required: true })}
                      placeholder="Your answer..."
                      rows={4}
                      className="bg-background"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-12 flex-1"
                  onClick={() => setCurrentStep("basic-info")}
                >
                  <ArrowLeft className="mr-2 w-5 h-5" /> Back
                </Button>
                <Button 
                  type="submit" 
                  className="h-12 flex-[2] text-lg"
                  disabled={!screeningForm.formState.isValid}
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
