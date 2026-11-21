export type ElectionPhase =
  | "UPCOMING"
  | "CAMPAIGN"
  | "LIVE"
  | "CLOSED"
  | "NOT_AVAILABLE";

export type PrimaryElectionStatus = {
  phase: ElectionPhase;
  title: string;
  electionId: string;
  message: string;
  campaignStartsAt?: Date;
  campaignEndsAt?: Date;
  votingStartsAt?: Date;
  votingEndsAt?: Date;
};

/**
 * DEMO MODE — control what the banner shows for testing.
 *
 * Options:
 *   "LIVE"          → Voting is open
 *   "CAMPAIGN"      → Campaign period
 *   "UPCOMING"      → Before campaign starts
 *   "CLOSED"        → After voting ends, results not declared
 *   "NOT_AVAILABLE" → No active election
 *   "AUTO"          → Compute from the timestamps below (recommended)
 */
const DEMO_MODE: ElectionPhase | "AUTO" = "AUTO";

// ─── Timestamps for the primary election ───
// Change these to simulate different phases.
const primaryElection = {
  electionId: "soateco-2026",
  title: "SOATECO General Election 2026",
  campaignStartsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
  campaignEndsAt:   new Date(Date.now() - 1000 * 60 * 60 * 2),      // 2h ago
  votingStartsAt:   new Date(Date.now() - 1000 * 60 * 60 * 1),      // 1h ago  → so LIVE now
  votingEndsAt:     new Date(Date.now() + 1000 * 60 * 60 * 35),     // 35h from now
};

export function getPrimaryElectionStatus(): PrimaryElectionStatus {
  const e = primaryElection;

  // Explicit demo override
  if (DEMO_MODE !== "AUTO") {
    switch (DEMO_MODE) {
      case "LIVE":
        return { phase: "LIVE", electionId: e.electionId, title: e.title,
          message: "Election is ON", votingStartsAt: e.votingStartsAt, votingEndsAt: e.votingEndsAt };
      case "CAMPAIGN":
        return { phase: "CAMPAIGN", electionId: e.electionId, title: e.title,
          message: "Campaign season is active", campaignStartsAt: e.campaignStartsAt, campaignEndsAt: e.campaignEndsAt };
      case "UPCOMING":
        return { phase: "UPCOMING", electionId: e.electionId, title: e.title,
          message: "Election is coming soon", campaignStartsAt: e.campaignStartsAt };
      case "CLOSED":
        return { phase: "CLOSED", electionId: e.electionId, title: e.title,
          message: "Voting has ended · Results pending", votingEndsAt: e.votingEndsAt };
      case "NOT_AVAILABLE":
        return { phase: "NOT_AVAILABLE", electionId: "", title: "No active election",
          message: "Election is now unavailable" };
    }
  }

  // AUTO — compute from timestamps
  const now = new Date();

  if (now >= e.votingStartsAt && now < e.votingEndsAt) {
    return { phase: "LIVE", electionId: e.electionId, title: e.title,
      message: "Election is ON", votingStartsAt: e.votingStartsAt, votingEndsAt: e.votingEndsAt };
  }
  if (now >= e.campaignStartsAt && now < e.campaignEndsAt) {
    return { phase: "CAMPAIGN", electionId: e.electionId, title: e.title,
      message: "Campaign season is active", campaignStartsAt: e.campaignStartsAt, campaignEndsAt: e.campaignEndsAt };
  }
  if (now < e.campaignStartsAt) {
    return { phase: "UPCOMING", electionId: e.electionId, title: e.title,
      message: "Election is coming soon", campaignStartsAt: e.campaignStartsAt };
  }
  if (now >= e.votingEndsAt) {
    return { phase: "CLOSED", electionId: e.electionId, title: e.title,
      message: "Voting has ended · Results pending", votingEndsAt: e.votingEndsAt };
  }
  return { phase: "NOT_AVAILABLE", electionId: "", title: "No active election",
    message: "Election is now unavailable" };
}
/** True when campaigns or voting is currently active. */
export function isElectionActive(): boolean {
  const phase = getPrimaryElectionStatus().phase;
  return phase === "LIVE" || phase === "CAMPAIGN";
}