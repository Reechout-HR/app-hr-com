/**
 * Maps the CreateQuestionnaireModal nested state to FastAPI `QuestionnaireCreate` / legacy API body.
 * Label conventions match the legacy Angular `getFormValue()` mapping.
 */

import type { QuestionnaireCreateBody } from "@/lib/api/questionnaires";

export const WORK_LEVEL_LABELS = ["Very Low", "Low", "Medium", "High", "Very High"] as const;

export const COMPETENCY_IMPORTANCE_LABELS = [
  "Not Relevant",
  "Nice to Have",
  "Important",
  "Critical",
] as const;

export function workDemandToLabel(value: number): string {
  const idx = Math.max(0, Math.min(4, value - 1));
  return WORK_LEVEL_LABELS[idx] ?? "Medium";
}

export function competencyToLabel(value: number): string {
  const idx = Math.max(0, Math.min(3, value));
  return COMPETENCY_IMPORTANCE_LABELS[idx] ?? "Nice to Have";
}

export function workLabelToValue(label: string | undefined): number {
  const idx = WORK_LEVEL_LABELS.indexOf(label as (typeof WORK_LEVEL_LABELS)[number]);
  return idx >= 0 ? idx + 1 : 3;
}

export function competencyLabelToValue(label: string | undefined): number {
  const idx = COMPETENCY_IMPORTANCE_LABELS.indexOf(
    label as (typeof COMPETENCY_IMPORTANCE_LABELS)[number],
  );
  return idx >= 0 ? idx : 2;
}

function parseOptionalDecimal(raw: string): number | null {
  if (raw === "" || raw === undefined || raw === null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export type CreateQuestionnaireModalState = {
  roleInfo: {
    roleName: string;
    companyName: string;
    department: string;
    seniorityLevel: string;
    location: string;
    yearsOfExperience: string;
    minSalary: string;
    maxSalary: string;
    numberOfQuestions: number;
    jobDescription: string;
  };
  workDemands: {
    stressLevel: number;
    customerContact: number;
    teamworkVsSolo: number;
    ambiguityChange: number;
  };
  competencies: {
    reliabilityOwnership: number;
    learningAdaptability: number;
    communicationClarity: number;
    empathyCollaboration: number;
    resilienceStress: number;
    valuesCultureFit: number;
  };
  culture: {
    innovation: number;
    structure: number;
    teamOrientation: number;
    detailFocus: number;
    outcomeFocus: number;
  };
  performance: {
    topPerformers: string;
    commonFailureModes: string;
  };
};

export const COMPETENCY_ROWS: {
  id: string;
  name: string;
  description: string;
  key: keyof CreateQuestionnaireModalState["competencies"];
}[] = [
  {
    id: "reliability",
    name: "Reliability & Ownership",
    description: "Taking responsibility for outcomes and consistently delivering.",
    key: "reliabilityOwnership",
  },
  {
    id: "learning",
    name: "Learning & Adaptability",
    description: "Quickly acquiring new skills and adjusting to changes.",
    key: "learningAdaptability",
  },
  {
    id: "communication",
    name: "Communication & Clarity",
    description: "Expressing ideas clearly to diverse audiences.",
    key: "communicationClarity",
  },
  {
    id: "empathy",
    name: "Empathy & Collaboration",
    description: "Working well with others and understanding their perspectives.",
    key: "empathyCollaboration",
  },
  {
    id: "resilience",
    name: "Resilience Under Stress",
    description: "Maintaining performance under pressure or after setbacks.",
    key: "resilienceStress",
  },
  {
    id: "values",
    name: "Values & Culture Fit",
    description: "Alignment with the company's mission and behavioral norms.",
    key: "valuesCultureFit",
  },
];

export const CULTURE_ROWS: {
  id: string;
  label: string;
  description: string;
  key: keyof CreateQuestionnaireModalState["culture"];
}[] = [
  {
    id: "innovation",
    label: "Innovation / Experimentation",
    description: "How important is innovation and experimentation in your team culture?",
    key: "innovation",
  },
  {
    id: "structure",
    label: "Structure / Process",
    description: "How important are structured processes and clear procedures?",
    key: "structure",
  },
  {
    id: "teamOrientation",
    label: "Team Orientation",
    description: "How important is team collaboration versus individual contribution?",
    key: "teamOrientation",
  },
  {
    id: "detailFocus",
    label: "Attention to Detail",
    description: "How important is attention to detail versus focusing on the big picture?",
    key: "detailFocus",
  },
  {
    id: "outcomeFocus",
    label: "Outcome Focus",
    description: "How important are results and outcomes versus following processes?",
    key: "outcomeFocus",
  },
];

export function mapCreateFormToApiBody(
  form: CreateQuestionnaireModalState
): QuestionnaireCreateBody {
  const { roleInfo, workDemands, competencies, culture, performance } = form;

  const nQ = roleInfo.numberOfQuestions;
  const number_of_questions = Math.max(1, Math.min(15, Number.isFinite(nQ) ? nQ : 5));

  return {
    details: roleInfo.jobDescription || "",
    number_of_questions,
    job_role_title: roleInfo.roleName || "",
    department: roleInfo.department || "",
    seniority_level: roleInfo.seniorityLevel || "",
    location: roleInfo.location || "",
    work_environment: {
      stress_level: workDemandToLabel(workDemands.stressLevel),
      customer_contact: workDemandToLabel(workDemands.customerContact),
      teamwork_vs_solo: workDemandToLabel(workDemands.teamworkVsSolo),
      ambiguity_change: workDemandToLabel(workDemands.ambiguityChange),
    },
    competency_ratings: COMPETENCY_ROWS.map((row) => ({
      id: row.id,
      name: row.name,
      importance_label: competencyToLabel(competencies[row.key]),
    })),
    team_culture_profile: CULTURE_ROWS.map((row) => ({
      id: row.id,
      label: row.label,
      value_label: competencyToLabel(culture[row.key]),
    })),
    success_patterns: performance.topPerformers || "",
    failure_patterns: performance.commonFailureModes || "",
    company_name: roleInfo.companyName || null,
    min_salary: parseOptionalDecimal(roleInfo.minSalary),
    max_salary: parseOptionalDecimal(roleInfo.maxSalary),
    years_of_experience: parseOptionalDecimal(roleInfo.yearsOfExperience),
    title: roleInfo.roleName ? roleInfo.roleName.slice(0, 200) : undefined,
  };
}
