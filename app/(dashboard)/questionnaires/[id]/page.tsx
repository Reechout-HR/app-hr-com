"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  MessageSquare, 
  User, 
  Plus, 
  RefreshCw, 
  GripVertical,
  Edit,
  Trash
} from "lucide-react";
import { cn } from "@/lib/ui/cn";
import { questionnairesApi, Question } from "@/lib/api/questionnaires";
import { questionsApi } from "@/lib/api/questions";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Modals
import { PersonaModal } from "./components/persona-modal";
import { IntroMessageModal } from "./components/intro-message-modal";
import { QuestionModal } from "./components/question-modal";
import { DeleteQuestionModal } from "./components/delete-question-modal";
import { RegenerateQuestionsModal } from "./components/regenerate-questions-modal";

const glassyCardClasses = "border border-[var(--border-color-light)] bg-[var(--background-color)] shadow-[0_4px_24px_rgba(var(--shadow-rgb),0.04)] transition-[border-color,box-shadow,transform] duration-300 hover:border-[rgba(var(--primary-color-rgb),0.28)] hover:shadow-[0_20px_40px_rgba(var(--shadow-rgb),0.08)] dark:border-white/[0.09] dark:hover:border-[rgba(var(--accent-violet-rgb),0.35)]";

const DEFAULT_INTRO_MESSAGE =
  "Hi {{ candidate_name }}, this is Sarah calling from {{ company_name }} for initial screening for the {{ interview_title }} position. How are you doing today?";

// Sortable Item Component
function SortableQuestionItem({
  question,
  index,
  onEdit,
  onDelete,
}: {
  question: Question;
  index: number;
  onEdit: (q: Question) => void;
  onDelete: (q: Question) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const getQuestionTypeColor = (type?: string) => {
    switch (type) {
      case "technical":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "behavioral":
        return "bg-cyan-500/10 text-cyan-600 border-cyan-500/20";
      case "cultural_value":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "screening":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getQuestionTypeLabel = (type?: string) => {
    if (!type) return "";
    return type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius-md)] p-5 transition-all group",
        glassyCardClasses,
        isDragging ? "border-[var(--primary-color)] opacity-80 shadow-lg scale-[1.02] z-50" : "hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--primary-color-rgb)]/30"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="flex h-8 w-8 cursor-grab items-center justify-center rounded-lg hover:bg-muted active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="font-semibold text-foreground">Q{index + 1}</span>
          {question.question_type && (
            <Badge variant="outline" className={cn("px-2 py-0.5", getQuestionTypeColor(question.question_type))}>
              {getQuestionTypeLabel(question.question_type)}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--primary-color)] hover:text-[var(--primary-hover)] hover:bg-[var(--primary-color)]/10" onClick={() => onEdit(question)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(question)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="pl-11">
        <p className="text-sm leading-relaxed text-foreground">
          {question.question_text || "Question text not available"}
        </p>
      </div>
    </div>
  );
}

export default function QuestionnaireDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<"screening" | "regular">("screening");

  // Modals state
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Partial<Question> | null>(null);
  
  const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

  // Drag and Drop State
  const [localScreeningQuestions, setLocalScreeningQuestions] = useState<Question[]>([]);
  const [localRegularQuestions, setLocalRegularQuestions] = useState<Question[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["questionnaire", id],
    queryFn: () => questionnairesApi.getQuestionnaireById(id),
    enabled: !!id,
  });

  // Sync local state when API data changes
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        setLocalScreeningQuestions(data.screening_questions || []);
        setLocalRegularQuestions(data.regular_questions || data.questions || []);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [data]);

  // Mutations
  const updateIntroMutation = useMutation({
    mutationFn: (message: string) => questionnairesApi.updateQuestionnaire(id, { first_message: message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", id] });
      setIsIntroModalOpen(false);
    }
  });

  const regenerateMutation = useMutation({
    mutationFn: (variables: { instructions: string, numQuestions: number }) => 
      questionnairesApi.updateQuestionnaire(id, { 
        instructions: variables.instructions, 
        number_of_questions: variables.numQuestions 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", id] });
      setIsRegenerateModalOpen(false);
    }
  });

  const createQuestionMutation = useMutation({
    mutationFn: (payload: import('@/lib/api/questions').CreateQuestionRequest) => questionsApi.createQuestion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", id] });
      setIsQuestionModalOpen(false);
    }
  });

  const updateQuestionMutation = useMutation({
    mutationFn: (payload: { id: number, data: import('@/lib/api/questions').UpdateQuestionRequest }) => questionsApi.updateQuestion(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", id] });
      setIsQuestionModalOpen(false);
    }
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: (qId: number) => questionsApi.deleteQuestion(qId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", id] });
      setIsDeleteQuestionModalOpen(false);
    }
  });

  const reorderQuestionsMutation = useMutation({
    mutationFn: (payload: import('@/lib/api/questions').UpdateQuestionsOrderRequest) => questionsApi.updateQuestionsOrder(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questionnaire", id] })
  });

  // Handlers
  const handleSaveIntro = (message: string) => updateIntroMutation.mutate(message);
  
  const handleRegenerate = (instructions: string, numQuestions: number) => {
    regenerateMutation.mutate({ instructions, numQuestions });
  };

  const handleSaveQuestion = (qData: Partial<Question>) => {
    if (qData.id) {
      updateQuestionMutation.mutate({
        id: qData.id,
        data: {
          question_text: qData.question_text || "",
          order: qData.order || 1,
          questionnaire_id: id,
          question_type: qData.question_type
        }
      });
    } else {
      createQuestionMutation.mutate({
        questionnaire_id: id,
        question_text: qData.question_text || "",
        order: qData.order || 1,
        question_type: qData.question_type || (activeTab === "screening" ? "screening" : "behavioral")
      });
    }
  };

  const handleDeleteQuestion = () => {
    if (questionToDelete?.id) {
      deleteQuestionMutation.mutate(questionToDelete.id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const isScreening = activeTab === "screening";
    const items = isScreening ? localScreeningQuestions : localRegularQuestions;
    const oldIndex = items.findIndex((q) => q.id === active.id);
    const newIndex = items.findIndex((q) => q.id === over.id);

    const reorderedItems = arrayMove(items, oldIndex, newIndex).map((q, idx) => ({
      ...q,
      order: idx + 1
    }));

    if (isScreening) {
      setLocalScreeningQuestions(reorderedItems);
    } else {
      setLocalRegularQuestions(reorderedItems);
    }

    const payload = reorderedItems.filter(q => q.id).map(q => ({ id: q.id!, order: q.order }));
    reorderQuestionsMutation.mutate(payload);
  };

  const generateExampleMessage = (message: string | null) => {
    if (!message) return "";
    return message
      .replace(/\{\{\s*candidate_name\s*\}\}/g, "Emily Johnson")
      .replace(/\{\{\s*company_name\s*\}\}/g, "Google")
      .replace(/\{\{\s*interview_title\s*\}\}/g, "Senior Developer");
  };

  if (isLoading) {
    return <div className="flex h-screen flex-col bg-[var(--background-color)]"></div>;
  }

  if (!data) {
    return (
      <div className="flex h-screen flex-col bg-[var(--background-color)]">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center py-20 text-center">
          <h2 className="mb-4 text-2xl font-bold">Questionnaire not found</h2>
          <Button onClick={() => router.push("/questionnaires")}>Go back to Questionnaires</Button>
        </div>
      </div>
    );
  }

  const introMessage = data.first_message || DEFAULT_INTRO_MESSAGE;
  const exampleMessage = generateExampleMessage(introMessage);
  const candidateAttributes = data.candidate_attributes ? data.candidate_attributes.split(", ") : [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4">
          <div>
            <Button variant="default" onClick={() => router.push("/questionnaires")} className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--primary-color)] bg-[var(--surface-2)] text-[var(--text-primary)] hover:bg-[var(--primary-color)]/10 hover:text-[var(--primary-color)] transition-colors h-9 px-4">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Questionnaires</span>
            </Button>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground truncate max-w-2xl">
            {data.questionnaire_title}
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          
          {/* Persona Section */}
          {data.persona && (
            <section>

              <div 
                className={cn("group cursor-pointer overflow-hidden rounded-[var(--radius-md)] transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--primary-color-rgb)]/30", glassyCardClasses)}
                onClick={() => setIsPersonaModalOpen(true)}
              >
                <div className="flex items-center justify-between border-b border-[var(--border-color-light)] bg-[var(--surface-2)] px-5 py-4 dark:border-white/[0.09] dark:bg-[rgba(12,10,20,0.98)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-foreground">
                      {data.questionnaire_title} (Ideal Candidate Persona)
                    </span>
                  </div>
                  <Button variant="outline" className="hidden sm:flex rounded-xl font-medium bg-[var(--background-color)] border border-[var(--border-color-light)] hover:bg-[var(--surface-2)] transition-colors dark:border-white/[0.09]">
                    View Full Details
                  </Button>
                </div>
                <div className="p-5">
                  {candidateAttributes.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {candidateAttributes.map((attr, idx) => (
                        <Badge key={idx} className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 font-medium">
                          {attr}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {data.persona.persona_summary}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Intro Message Section */}
          <section>

            <div 
              className={cn("group cursor-pointer overflow-hidden rounded-[var(--radius-md)] transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--primary-color-rgb)]/30", glassyCardClasses)}
              onClick={() => setIsIntroModalOpen(true)}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-color-light)] bg-[var(--surface-2)] px-5 py-4 dark:border-white/[0.09] dark:bg-[rgba(12,10,20,0.98)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-foreground">
                    Intro Message Template
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-primary">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-5">
                <p className="text-[15px] font-medium leading-relaxed text-foreground">
                  {introMessage}
                </p>
                {exampleMessage && (
                  <div className="mt-4 rounded-xl border border-[var(--border-color-light)] bg-[var(--surface-2)] p-4 dark:border-white/[0.08]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Example Preview</p>
                    <p className="text-sm italic text-muted-foreground">&quot;{exampleMessage}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <hr className="border-border" />

          {/* Questions Section */}
          <section>
            <div className={cn("mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-[var(--radius-md)]", glassyCardClasses)}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>

                  <p className="text-sm font-medium text-muted-foreground mt-1">
                    {localScreeningQuestions.length + localRegularQuestions.length} total questions
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setIsRegenerateModalOpen(true)} 
                className="rounded-xl sm:w-auto w-full h-10 font-semibold bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-hover)] text-white shadow-md hover:brightness-110 border-0"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
            </div>

            <Tabs 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as "screening" | "regular")} 
              className="w-full"
            >
              <div className="mb-10 flex w-full justify-center">
                <TabsList className="flex w-fit items-center gap-1 rounded-lg border border-[var(--border-color-light)] bg-[var(--surface-2)] p-1 shadow-sm group-data-horizontal/tabs:h-auto dark:border-white/[0.09]">
                  <TabsTrigger 
                    value="screening" 
                    className="rounded-md px-4 py-1.5 text-sm font-medium transition-colors border border-transparent data-[state=active]:bg-background data-[state=active]:text-[var(--text-heading)] data-[state=active]:shadow-[0_1px_2px_rgba(var(--shadow-rgb),0.05)] data-[state=active]:border-[var(--border-color-light)] dark:data-[state=active]:border-white/[0.09]"
                  >
                    Screening ({localScreeningQuestions.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="regular" 
                    className="rounded-md px-4 py-1.5 text-sm font-medium transition-colors border border-transparent data-[state=active]:bg-background data-[state=active]:text-[var(--text-heading)] data-[state=active]:shadow-[0_1px_2px_rgba(var(--shadow-rgb),0.05)] data-[state=active]:border-[var(--border-color-light)] dark:data-[state=active]:border-white/[0.09]"
                  >
                    AI Interview ({localRegularQuestions.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              {(["screening", "regular"] as const).map((tab) => {
                const items = tab === "screening" ? localScreeningQuestions : localRegularQuestions;
                
                return (
                  <TabsContent key={tab} value={tab} className="mt-0 outline-none">
                    <div className="mb-6 flex items-center justify-end">
                      <Button 
                        onClick={() => {
                          setSelectedQuestion({ order: items.length + 1, question_type: tab === "screening" ? "screening" : "behavioral" });
                          setIsQuestionModalOpen(true);
                        }}
                        className="rounded-xl h-10 font-semibold bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-hover)] text-white shadow-md hover:brightness-110 border-0"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Question
                      </Button>
                    </div>

                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--border-color-light)] bg-[var(--surface-2)] py-16 text-center dark:border-white/[0.09]">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <MessageSquare className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mb-1 text-base font-semibold text-foreground">No questions yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">Click &apos;Add Question&apos; to create your first question</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                          <SortableContext items={items.map(q => q.id!)} strategy={verticalListSortingStrategy}>
                            {items.map((q, idx) => (
                              <SortableQuestionItem 
                                key={q.id} 
                                question={q} 
                                index={idx} 
                                onEdit={(question) => {
                                  setSelectedQuestion(question);
                                  setIsQuestionModalOpen(true);
                                }}
                                onDelete={(question) => {
                                  setQuestionToDelete(question);
                                  setIsDeleteQuestionModalOpen(true);
                                }}
                              />
                            ))}
                          </SortableContext>
                        </DndContext>
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </section>

        </div>
      </main>

      {/* Modals */}
      <PersonaModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        title={data.questionnaire_title}
        attributes={candidateAttributes}
        persona={data.persona || null}
      />

      <IntroMessageModal
        isOpen={isIntroModalOpen}
        isUpdating={updateIntroMutation.isPending}
        initialMessage={introMessage}
        onClose={() => setIsIntroModalOpen(false)}
        onConfirm={handleSaveIntro}
      />

      <RegenerateQuestionsModal
        isOpen={isRegenerateModalOpen}
        isRegenerating={regenerateMutation.isPending}
        initialQuestionCount={data.total_questions}
        onClose={() => setIsRegenerateModalOpen(false)}
        onConfirm={handleRegenerate}
      />

      <QuestionModal
        isOpen={isQuestionModalOpen}
        isSaving={createQuestionMutation.isPending || updateQuestionMutation.isPending}
        question={selectedQuestion}
        activeTab={activeTab}
        onClose={() => setIsQuestionModalOpen(false)}
        onSave={handleSaveQuestion}
      />

      <DeleteQuestionModal
        isOpen={isDeleteQuestionModalOpen}
        isDeleting={deleteQuestionMutation.isPending}
        question={questionToDelete}
        onClose={() => setIsDeleteQuestionModalOpen(false)}
        onConfirm={handleDeleteQuestion}
      />

    </div>
  );
}
