export const REJECTION_MESSAGE = "We’re sorry — the shelter selected another adopter they felt was a better fit for this cat.";

export const MATCH_STATUS_META = {
  AVAILABLE: {
    label: "Still available",
    message: "Still available — you can send an adoption request when you’re ready.",
    badgeClass: "bg-emerald-100 text-emerald-700",
    messageClass: "bg-emerald-50 text-emerald-800",
  },
  PENDING: {
    label: "Pending request",
    message: "Your adoption request is under review.",
    badgeClass: "bg-amber-100 text-amber-700",
    messageClass: "bg-amber-50 text-amber-800",
  },
  APPROVED: {
    label: "Accepted",
    message: "Great news! Your request was approved.",
    badgeClass: "bg-orange-100 text-orange-700",
    messageClass: "bg-orange-50 text-orange-800",
  },
  REJECTED: {
    label: "Rejected",
    message: REJECTION_MESSAGE,
    badgeClass: "bg-slate-100 text-slate-700",
    messageClass: "bg-slate-50 text-slate-700",
  },
};

export function getMatchStatus(_cat, adoptionRequest) {
  if (adoptionRequest?.status === "PENDING") return "PENDING";
  if (adoptionRequest?.status === "APPROVED") return "APPROVED";
  if (adoptionRequest?.status === "REJECTED") return "REJECTED";
  return "AVAILABLE";
}
